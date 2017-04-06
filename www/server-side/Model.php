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
        $s->prepare($query);
        $s->bind_param('i', $id);
        $s->execute();
        return $s->get_result();
    }

}