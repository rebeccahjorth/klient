/**
 * Created by Rebecca on 16-11-2016.
 */

/**
 * Add a new User
 */
$("#addNewUserButton").on("click", function () {

    var mobileIsChosen = 0;
    if($("input[name=mobilepay]:checked").val()){
        mobileIsChosen = 1;
    }
    var cashIsChosen =0;
    if($("input[name=cash]:checked").val()){
        cashIsChosen=1;
    }
    var transferIsChosen =0;
    if ($("input[name=transfer]:checked").val()){
        transferIsChosen=1;
    }

    //Create JSON object
    var user = {
        username: $("#newUserUsername").val(),
        Password: $("#newUserPassword").val(),
        email: $("#newUserEmail").val(),
        phonenumber: parseInt( $("#newUserPhonenumber").val()),
        adress: $("#newUserAdress").val(),

        mobilepay: mobileIsChosen,
        cash: cashIsChosen,
        transfer: transferIsChosen
    };


    //Create user


        SDK.User.create(user, function(err, data){
        if(err) throw err;
       console.log(user.username);

        window.location.href= "user.html";
    });

});