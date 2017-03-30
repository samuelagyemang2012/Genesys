<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 3/24/2017
 * Time: 8:57 AM
 */
include_once 'Adb.php';

class User extends Adb
{

    function signup($username, $telephone, $password)
    {
        $query = "INSERT INTO users(username,telephone,password) VALUES(?,?,?)";
        $s = $this->prepare($query);
        $s->bind_param('sss', $username, $telephone, $password);
        $bool = $s->execute();
        return $bool;
    }

    function login($username, $password)
    {
        $query = "SELECT * FROM users WHERE username=? AND password=?";
        $s = $this->prepare($query);
        $s->bind_param('ss', $username, $password);
        $s->execute();
        return $s->get_result();
    }

    function update($username, $telephone, $password)
    {
        $query = "UPDATE users SET username = ?, telephone=?, password=?";
        $s = $this->prepare($query);
        $s->bind_param('sss', $username, $telephone, $password);
        $bool = $s->execute();
        return $bool;
    }

    function view_announcements()
    {
        $query = "SELECT * FROM announcements";
        return $this->query($query);
    }

    function view_messages()
    {
        $query = "SELECT * FROM messages";
        return $this->query($query);
    }

    function view_activities()
    {
        $query = "SELECT * FROM activities";
        return $this->query($query);
    }

    function get_activity_info($id)
    {
        $query = "SELECT * FROM activities WHERE id = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        return $s->get_result();
    }

    function get_announcement_info($id)
    {
        $query = "SELECT * FROM announcements WHERE id = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        return $s->get_result();
    }

    function add_appointment($name, $purpose, $date, $time)
    {
        $query = "INSERT INTO appointments(name,purpose,date,time) VALUES(?,?,?,?)";
        $s = $this->prepare($query);
        $s->bind_param('isss', $name, $purpose, $date, $time);
        $bool = $s->execute();
        return $bool;
    }

    function view_appointments($id)
    {
        $query = "SELECT * FROM appointments WHERE name = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $id);
        $bool = $s->execute();
        return $s->get_result();
    }
}

//$u = new User();
//$u->signup('test', 'test', 'test');