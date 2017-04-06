<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 3/24/2017
 * Time: 9:30 AM
 */

include_once "Model.php";
include_once "Slide.php";

if (isset($_REQUEST['cmd'])) {

    $command = $_REQUEST['cmd'];

    switch ($command) {

        case 1:
            get_profile_data();
            break;

        case 2:
            login();
            break;

        case 3:
            update();
            break;

        case 4:
            view_announcements();
            break;

        case 5:
            view_activities();
            break;

        case 6:
            get_announcement();
            break;

        case 7:
            get_activity();
            break;

        case 8:
            view_messages();
            break;

        case 9:
            add_appointment();
            break;

        case  10:
            view_appointments();
            break;

        case 11:
            get_slides();
            break;

        case 12:
            get_group_data();
            break;

        default:
            break;
    }
}

function login()
{
    $username = $_GET['username'];
    $password = $_GET['password'];

    $model = new Model();

    $data = $model->login($username, $password);

    $row = $data->fetch_assoc();

    $d_id = $row['id'];
    $d_username = $row['username'];
    $d_password = $row['password'];

    $u_compare = strcmp($username, $d_username);
    $p_compare = strcmp($password, $d_password);

    if ($u_compare == 0 && $p_compare == 0) {
        echo '{"result":1, "id":' . $d_id . '}';
    } else {
        echo '{"result":0}';
    }
}

function get_profile_data()
{
    $id = $_GET['id'];

    $model = new Model();

    $data = $model->get_user_details($id);

    $row = $data->fetch_assoc();

    if ($data->num_rows == 0) {
        echo '{"result":0}';
    } else {
        echo '{"result":1,"username":"' . $row['username'] . '","firstname":"' . $row['first_name'] . '","middlename":"' . $row["middle_name"] . '", "lastname":"' . $row['last_name'] . '","email":"' . $row['email'] . '","phonenumber":"' . $row['phone_number'] . '"}';
    }
}

function get_group_data()
{
    $id = $_GET['id'];

    $model = new Model();

    $data = $model->get_user_groups($id);

//    $rows = $data->fetch_assoc();

    if ($data->num_rows == 0) {
        echo '{"result":0}';
    } else {

        $rows = $data->fetch_assoc();

        echo '{
            "result":1, "groups":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $data->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}

function add_appointment()
{
    $id = $_GET['id'];
    $purpose = $_GET['purpose'];
    $date = $_GET['date'];
    $time = $_GET['time'];

    $user = new User();

    $res = $user->add_appointment($id, $purpose, $date, $time);

    if ($res == false) {
        echo '{
            "result":0}';
    } else {
        echo '{
            "result":1}';
    }
}

function update()
{
    $username = $_GET['username'];
    $telephone = $_GET['telephone'];
    $password = $_GET['password'];

    $user = new User();

    $res = $user->update($username, $telephone, $password);

    if ($res == false) {
        echo '{
            "result":0}';
    } else {
        echo '{
            "result":1}';
    }
}

function view_announcements()
{
    $user = new User();

    $results = $user->view_announcements();

    if ($results->num_rows <= 0) {
        echo '{
            "result":0}';
    } else {

        $rows = $results->fetch_assoc();

        echo '{
            "result":1, "announcements":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $results->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}

function view_messages()
{
    $user = new User();

    $results = $user->view_messages();

    if ($results->num_rows <= 0) {
        echo '{
                "result":0}';
    } else {

        $rows = $results->fetch_assoc();

        echo '{
                "result":1, "messages":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $results->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}

function view_appointments()
{
    $user = new User();

    $id = $_GET['id'];

    $results = $user->view_appointments($id);

    if ($results->num_rows <= 0) {
        echo '{
                    "result":0}';
    } else {

        $rows = $results->fetch_assoc();

        echo '{
                    "result":1, "myapps":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $results->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}

function view_activities()
{
    $user = new User();

    $results = $user->view_activities();

    if ($results->num_rows <= 0) {
        echo '{
                        "result":0}';
    } else {

        $rows = $results->fetch_assoc();

        echo '{
                        "result":1, "activities":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $results->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}

function get_announcement()
{
    $user = new User();

    $id = $_GET['id'];

    $results = $user->get_announcement_info($id);

    $rows = $results->fetch_assoc();

    if ($results->num_rows <= 0) {
        echo '{
                            "result":0}';
    } else {
        echo '{
                            "result":1, "message":"' . $rows['message'] . '", "date":"' . $rows['date'] . '", "time":"' . $rows['time'] . '"}';
    }
}

function get_activity()
{
    $user = new User();

    $id = $_GET['id'];

    $results = $user->get_activity_info($id);

    $rows = $results->fetch_assoc();

    if ($results->num_rows <= 0) {
        echo '{
                            "result":0}';
    } else {
        echo '{
                            "result":1, "info":"' . $rows['info'] . '", "date":"' . $rows['date'] . '", "time":"' . $rows['time'] . '"}';
    }
}

function get_slides()
{
    $slide = new Slide();

    $results = $slide->get_slides();

    if ($results->num_rows <= 0) {
        echo '{
                            "result":0}';
    } else {

        $rows = $results->fetch_assoc();

        echo '{
                            "result":1, "slides":[';

        while ($rows) {
            echo json_encode($rows);
            $rows = $results->fetch_assoc();

            if ($rows) {
                echo ",";
            }
        }
        echo "]}";
    }
}