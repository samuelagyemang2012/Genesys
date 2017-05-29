<?php

/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 3/28/2017
 * Time: 10:48 AM
 */
include_once 'Adb.php';

class Slide extends Adb
{
    function get_slides()
    {
        $query = "SELECT * FROM images";
        return $this->query($query);
    }
}