/**
 * Created by samuel on 3/24/2017.
 */

var global_id, global_username, global_telephone, global_password, global_length;
var imgs = [];

$(function () {
    $("[data-role=header]").toolbar();
    $("[data-role=popup]").popup().enhanceWithin();
});

function send_request(url) {
    "use strict";
    var obj, result;
    obj = $.ajax({
        url: url,
        async: false
    });
    result = $.parseJSON(obj.responseText);
    return result;
}

function change_page(page, transition) {
    $.mobile.pageContainer.pagecontainer("change", page, {transition: transition});
}

function sign_up() {
    var url, username, telephone, password, cpassword, obj, bool;

    username = $("#susername").val();
    telephone = $("#stel").val();
    password = $("#spassword").val();
    cpassword = $("#scpassword").val();

    //if not null
    if (username.length > 0 && telephone.length > 0 && password.length > 0 && cpassword.length > 0) {

        if (telephone.length < 10) {
            $("#sfailpopup3").popup("open", {transition: "slide"});
        }

        if (password.length < 8) {
            $("#sfailpopup4").popup("open", {transition: "slide"});
        }

        bool = password.localeCompare(cpassword);

        if (bool !== 0) {
            $("#sfailpopup").popup("open", {transition: "slide"});
        }

        if (bool === 0 && password.length >= 8 && telephone.length >= 10) {

            //alert("dasdsad");

            url = "./server-side/controller.php?cmd=1&username=" + username + "&telephone=" + telephone + "&password=" + password;
            obj = send_request(url);

            if (obj.result == 1) {
                $("#successpopup").popup("open", {transition: "slide"});

                setTimeout(
                    function () {
                        change_page("#loginpage", "")
                    }, 800);
            }
            //} else {
            //    alert("failed");
            //$("#failpopup").popup("open", {transition: "slide"});
            //}
        }
    } else {
        $("#sfailpopup2").popup("open", {transition: "slide"});
    }
}

function add_app() {

    var url, id, purpose, date, time, obj, bool;

    id = global_id;
    purpose = $("#purpose").val();
    date = $("#apdate").val();
    time = $("#aptime").val();

    if (purpose.length > 0 && date.length > 0) {
        url = "./server-side/controller.php?cmd=9&id=" + id + "&purpose=" + purpose + "&date=" + date + "&time=" + time;
        obj = send_request(url);

        if (obj.result == 1) {
            $("#asuccesspopup").popup("open", {transition: "slide"});

            setTimeout(
                function () {
                    view_appointments();
                }, 800);
            //change_page("#appointmentpage", "slide");
        } else {
            $("#afailpopup").popup("open", {transition: "slide"});
        }
    } else {
        $("#afailpopup2").popup("open", {transition: "slide"});
    }
}

//function get_profile_info() {
//    $("#pusername").val($.cookie("username"));
//    $("#ptel").val("" + $.cookie("telephone") + "");
//    $("#ppassword").val("" + $.cookie("password") + "");
//
//    change_page("#profilepage", "")
//}

function get_edit_info() {

    $("#eusername").val($.cookie("username"));
    $("#etel").val("" + $.cookie("telephone") + "");
    $("#epassword").val("" + $.cookie("password") + "");
    $("#ecpassword").val("" + $.cookie("password") + "");

    change_page("#editpage", "slidedown");
}

function login() {

    var url, username, password, obj, bool, telephone;

    username = $("#username").val();
    password = $("#password").val();

    //not null
    if (username.length > 0 && password.length > 0) {
        url = "./server-side/controller.php?cmd=2&username=" + username + "&password=" + password;
        obj = send_request(url);

        //alert(obj.result);

        if (obj.result == 1) {
            //alert(obj.id);
            global_id = obj.id;
            //alert(global_id);
            global_username = username;
            global_telephone = obj.telephone;
            global_password = password;

            set_cookies(global_id, global_username, global_telephone, global_password);

            setTimeout(
                function () {
                    change_page("#dashboard", "");
                }, 800);

        } else {
            $("#loginfailpopup").popup("open", {transition: "slide"});
        }
    } else {
        $("#loginfailpopup2").popup("open", {transition: "slide"});
    }
}

function set_cookies(i, u, t, p) {

    $.cookie('id', i);

    $.cookie('username', u);

    //global_telephone = obj.telephone;
    $.cookie('telephone', t);

    $.cookie('password', p);
}

function view_announcements() {
    var url, obj, build;

    url = "./server-side/controller.php?cmd=4";
    obj = send_request(url);

    build = "";

    if (obj.result == 0) {

        build += "<div class='align-center'>";
        build += "<p>No Announcements yet !</p>";
        build += "</div>";
        $("#ann").html(build);

    } else {
        //alert(obj.result);

        build += "<label>Announcements</label>";

        for (var i in obj.announcements) {

            build += "<div class='nd2-card'>";
            build += "<div class='card-title'>";
            build += "<h4 class='card-primary-title' style='color: #4CAF50;'>" + obj.announcements[i].title + "</h4>";
            //build += "<h5>From " + +" to " + +"</h5>";
            build += "<div class='card-action'>";
            build += "<div class='row between-xs'>";
            build += "<div class='col-xs-12 align-right'>";
            build += "<div class='box'>";
            build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick='get_an_info(" + obj.announcements[i].id + ")'><i style='color: #4CAF50' class='zmdi zmdi-mail-reply zmd-flip-horizontal'></i></a>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";

        }

        build += '</ui>';

        $("#ann").html(build);
    }

    change_page("#announcementpage", "");
}

function view_activities() {

    //alert("fggf");

    var url, obj, build;

    url = "./server-side/controller.php?cmd=5";
    obj = send_request(url);

    build = "";

    if (obj.result == 0) {

        build += "<div class='align-center'>";
        build += "<p>No Activities yet !</p>";
        build += "</div>";
        $("#acc").html(build);

    } else {

        build += "<label>Activities</label>";

        for (var i in obj.activities) {

            build += "<div class='nd2-card'>";
            build += "<div class='card-title'>";
            build += "<h4 class='card-primary-title' style='color: #4CAF50;'>" + obj.activities[i].title + "</h4>";
            //build += "<h5>From " + +" to " + +"</h5>";
            build += "<div class='card-action'>";
            build += "<div class='row between-xs'>";
            build += "<div class='col-xs-12 align-right'>";
            build += "<div class='box'>";
            build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick='get_ac_info(" + obj.activities[i].id + ")'><i style='color: #4CAF50' class='zmdi zmdi-mail-reply zmd-flip-horizontal'></i></a>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";

        }

        build += '</ui>';

        $("#acc").html(build);
    }

    change_page("#activitiespage", "");
}

function view_appointments() {

    var url, obj, build;

    url = "./server-side/controller.php?cmd=10&id=" + global_id;
    obj = send_request(url);

    build = "";
    //build += '<a onclick="" data-role="button" class="ui-btn-fab ui-btn ui-btn-inline" id="add" style="background-color: #4CAF50; color: #fff;"data-transition="slidedown"href="#addapppage"><i class="zmdi zmdi-plus zmd-2x"></i> </a>';

    if (obj.result == 0) {

        build += "<div class='align-center'>";
        build += "<p>No Appointments yet !</p>";
        build += "</div>";
        $("#app").html(build);

    } else {

        build += "<label>Appointments</label>";

        for (var i in obj.myapps) {

            build += "<div class='nd2-card'>";
            build += "<div class='card-title'>";
            build += "<h5 class='' style=''>" + obj.myapps[i].purpose + "</h5>";
            //build += "<h5>From " + +" to " + +"</h5>";
            build += "<div class='card-action'>";
            build += "<div class='row between-xs'>";
            build += "<div class='col-xs-12 align-left'>";
            build += "<div class='box'>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-calendar'></i> &nbsp;" + obj.myapps[i].date + "</p>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-time'></i>&nbsp;" + obj.myapps[i].time + "</p>"
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";

            build += "<div class='row'>";
            build += "<div class='col-xs-6'>";
            build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick=''><i style='font-size: 20px' class='zmdi zmdi-arrow-back'></i></a>";
            build += "</div>"
            build += "<div class='col-xs-6 align-right'>"
            build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick=''><i style='font-size: 20px; color: #4CAF50' class='zmdi zmdi-delete'></i></a>";
            build += "</div>";
            //build += "<a href='#' style='background-color: gainsboro' class='ui-btn waves-effect waves-button waves-effect waves-button' onclick='join(" + obj.id + ")'><i style='font-size: 20px' class='zmdi zmdi-account-add'></i></a>";
            build += "</div>";

            build += "</div>";
            build += "</div>";

        }

        build += '</ui>';

        $("#app").html(build);
    }
    change_page("#appointmentpage", "");
}

function get_an_info(id) {
    var url, obj, build;

    url = "./server-side/controller.php?cmd=6&id=" + id;
    obj = send_request(url);

    build = "";

    if (obj.result == 1) {

        build += "<div class='nd2-card'>";
        build += "<div class='card-title'>";
        build += "<h5 class=''>" + obj.message + "</h5>";
        //build += "<h5>From " + +" to " + +"</h5>";
        build += "<div class='card-action'>";
        build += "<div class='row between-xs'>";
        build += "<div class='col-xs-12 align-left'>";
        build += "<div class='box'>";
        build += "<p><i style='color: #4CAF50' class='zmdi zmdi-calendar zmd-2x'></i> &nbsp;" + obj.date + "</a>";
        build += "<p><i style='color: #4CAF50' class='zmdi zmdi-time zmd-2x'></i> &nbsp;" + obj.time + "</a>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";

        $("#aninfo").html(build);

        change_page("#ainfopage", "pop");
    }
}

function get_ac_info(id) {
    var url, obj, build;

    url = "./server-side/controller.php?cmd=7&id=" + id;
    obj = send_request(url);

    build = "";

    if (obj.result == 1) {

        build += "<div class='nd2-card'>";
        build += "<div class='card-title'>";
        build += "<h5 class=''>" + obj.info + "</h5>";
        //build += "<h5>From " + +" to " + +"</h5>";
        build += "<div class='card-action'>";
        build += "<div class='row between-xs'>";
        build += "<div class='col-xs-12 align-left'>";
        build += "<div class='box'>";
        build += "<p><i style='color: #4CAF50' class='zmdi zmdi-calendar zmd-2x'></i> &nbsp;" + obj.date + "</a>";
        build += "<p><i style='color: #4CAF50' class='zmdi zmdi-time zmd-2x'></i> &nbsp;" + obj.time + "</a>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";
        build += "</div>";

        $("#acinfo").html(build);

        change_page("#acinfopage", "pop");
    }
}

function view_messages() {

    //alert("fggf");

    var url, obj, build;

    url = "./server-side/controller.php?cmd=8";
    obj = send_request(url);

    build = "";

    if (obj.result == 0) {

        build += "<div class='align-center'>";
        build += "<p>No Messages yet !</p>";
        build += "</div>";
        $("#msg").html(build);

    } else {

        build += "<label>Messages</label>";

        for (var i in obj.messages) {

            build += "<div class='nd2-card'>";
            build += "<div class='card-title'>";
            build += "<h4 class='card-primary-title' style='color: #4CAF50;'>" + obj.messages[i].title + "</h4>";
            //build += "<h5>From " + +" to " + +"</h5>";
            build += "<div class='card-action'>";
            build += "<div class='row between-xs'>";
            build += "<div class='col-xs-12 align-left'>";
            build += "<div class='box'>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-book zmd-2x'></i> &nbsp;" + obj.messages[i].verse + "</p>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-link zmd-2x'></i> <a> &nbsp;" + obj.messages[i].link + "</a></p>"
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";

        }

        build += '</ui>';

        $("#msg").html(build);
    }

    change_page("#messagespage", "");
}

function get_slides() {
    var url, obj;

    url = "./server-side/controller.php?cmd=11";
    obj = send_request(url);

    if (obj.result == 1) {

        for (var i in obj.slides) {
            imgs[i] = obj.slides[i].name;
        }

        global_length = imgs.length - 1;

        //alert(global_length);

        document.getElementById("images").src = "img/" + imgs[imgs.length - 1];

        //setTimeout(
        //    function () {
        //        //change_page("#loginpage", "slide")
        //        //next();
        //    }, 800);

    }
}

function prev() {

    if (global_length < 0) {
        global_length = imgs.length - 1;
    }

    $("#images").attr('src', 'img/' + imgs[global_length]);
    console.log(global_length);
    global_length--;

}

function next() {

    if (global_length >= imgs.length) {
        global_length = 0;
    }

    $("#images").attr('src', 'img/' + imgs[global_length]);
    console.log(global_length);
    global_length++;


}

function update() {
    var url, username, telephone, password, cpassword, obj, bool;

    username = $("#eusername").val();
    telephone = $("#etel").val();
    password = $("#epassword").val();
    cpassword = $("#ecpassword").val();

    if (username.length > 0 && telephone.length > 0 && password.length > 0 && cpassword.length > 0) {

        if (telephone.length < 10) {
            $("#efailpopup3").popup("open", {transition: "slide"});
        }

        if (password.length < 8) {
            $("#efailpopup5").popup("open", {transition: "slide"});
        }

        bool = password.localeCompare(cpassword);

        if (bool !== 0) {
            $("#efailpopup4").popup("open", {transition: "slide"});
        }

        if (bool === 0 && password.length > 8 && telephone.length >= 10) {
            //alert('ready');
            url = "./server-side/controller.php?cmd=3&username=" + username + "&telephone=" + telephone + "&password=" + password;
            obj = send_request(url);

            if (obj.result == 1) {

                global_username = username;
                global_telephone = telephone;
                global_password = password;

                set_cookies(global_username, global_telephone, global_password);

                $("#esuccesspopup").popup("open", {transition: "slide"});

                setTimeout(
                    function () {
                        get_profile_data();
                    }, 800);

            } else {
                $("#efailpopup").popup("open", {transition: "slide"});
            }
        }

    } else {
        $("#efailpopup2").popup("open", {transition: "slide"});
    }
}

//test code or UI demo
function toprofile() {
    change_page('#profilepage', '');
}

function toann() {
    change_page('#announcementpage', '');
}

function toapp() {
    change_page('#appointmentpage', '');
}

function toacc() {
    change_page('#activitiespage', '');
}

function toser() {
    change_page('#messagespage', '');
}

function todash() {
    change_page('#dashboard', '');
}

