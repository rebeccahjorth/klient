
/**
 * update user
 */
$("#updateUserButton").on("click", function () {

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
        password: $("#newUserPassword").val(),
        email: $("#newUserEmail").val(),
        phonenumber: parseInt( $("#newUserPhonenumber").val()),
        address: $("#newUserAdress").val(),

        mobilepay: mobileIsChosen,
        cash: cashIsChosen,
        transfer: transferIsChosen
    };


    //opret bruger


    SDK.User.update(user, function(err, data){
        if(err) throw err;
        console.log(user.username);

        window.location.href= "user.html";
    });


    $("#closeUserButton").on("click", function () {
        window.location.href= "user.html";
    });


});