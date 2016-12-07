/**
 * Created by Rebecca on 16-11-2016.
 */

/**
 * Create a new User
 */


$(document).ready(function () {

    $("#addNewUserButton").on("click", function () {

        /* variabel som sætter mine checkbox til at være 0 hvis de ikke er checked og 1 hvis de er*/
        var mobileIsChosen = 0;
        if ($("input[name=mobilepay]:checked").val()) {
            mobileIsChosen = 1;
        }
        var cashIsChosen = 0;
        if ($("input[name=cash]:checked").val()) {
            cashIsChosen = 1;
        }
        var transferIsChosen = 0;
        if ($("input[name=transfer]:checked").val()) {
            transferIsChosen = 1;
        }


        //opretter JSON objekt
        var user = {
            username: $("#newUserUsername").val(),
            password: $("#newUserPassword").val(),
            password2: $("#confirmNewUserPassword").val(),


            email: $("#newUserEmail").val(),
            phonenumber: parseInt($("#newUserPhonenumber").val()),
            address: $("#newUserAdress").val(),

            mobilepay: mobileIsChosen,
            cash: cashIsChosen,
            transfer: transferIsChosen
        };


        //opretter en bruger fra det oprettede JSON objekt


        SDK.User.create(user, function (err, data) {
            if (err) throw err;

            window.location.href = "login.html";
        });


    });

});