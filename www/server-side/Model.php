<?php

/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 4/6/2017
 * Time: 10:22 AM
 */

include_once 'Adb.php';

class Model extends Adb
{
    function login($username, $password)
    {
        $query = "SELECT * FROM users WHERE username=? AND password=?";
        $s = $this->prepare($query);
        $s->bind_param('ss', $username, $password);
        $s->execute();
        return $s->get_result();
    }

    function get_user_details($id)
    {
        $query = "SELECT u.username,
                         u.first_name,
                         u.middle_name,
                         u.last_name,
                         u.email,
                         m.phone_number
                         FROM users u
                         INNER JOIN members m
                         WHERE u.id = m.user_id and u.id = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        return $s->get_result();
    }

    function get_user_groups($id)
    {
        $query = "SELECT group_name FROM groups WHERE user_id = ?";
        $s = $this->prepare($query);
//        $s->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        return $s->get_result();
    }

    function update_users($username, $firstname, $middlename, $lastname, $email, $id)
    {
        $query = "UPDATE users SET username = ?, first_name = ?, middle_name=?, last_name=?, email=? WHERE id = ?";
        $s = $this->prepare($query);
        $s->bind_param('sssssi', $username, $firstname, $middlename, $lastname, $email, $id);
        $res = $s->execute();
        return $res;
    }

    function update_members($telephone, $id)
    {
        $query1 = "UPDATE members SET phone_number = ? WHERE user_id = ?";
        $t = $this->prepare($query1);
        $t->bind_param('si', $telephone, $id);
        $res = $t->execute();
        return $res;
    }

    function update($username, $firstname, $middlename, $lastname, $email, $telephone, $id)
    {
        $bool = $this->update_users($username, $firstname, $middlename, $lastname, $email, $id);
        $bool1 = $this->update_members($telephone, $id);

        if ($bool == true && $bool1 == true) {
            return true;
        } else {
            return false;
        }
    }

    function get_member_id($id)
    {
        $query = "SELECT id FROM members WHERE user_id = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        $data = $s->get_result();
        $row = $data->fetch_assoc();
        $d_id = $row['id'];
        return $d_id;
    }

    function view_appointments($id)
    {
        $mid = $this->get_member_id($id);

        $query = "SELECT * FROM appointments WHERE member_id = ?";
        $s = $this->prepare($query);
        $s->bind_param('i', $mid);
        $s->execute();
        return $s->get_result();
    }

    function add_appointment($name, $who_to_see, $purpose, $duration, $date, $comment, $id)
    {
        $mid = $this->get_member_id($id);

        $query = "INSERT INTO appointments(name, who_to_see, purpose, duration, date, comment, member_id ) VALUES (?,?,?,?,?,?,?)";
        $s = $this->prepare($query);
        $s->bind_param('ssssssi', $name, $who_to_see, $purpose, $duration, $date, $comment, $mid);
        $bool = $s->execute();
        return $bool;
    }

    function view_activities()
    {
        $query = "SELECT id,title, start, end FROM events";
        return $this->query($query);
    }

    function view_sermons()
    {
        $query = "SELECT * FROM sermons";
        return $this->query($query);
    }
}

//$m = new Model();
//$e = $m->get_member_id(6);
//echo $e;