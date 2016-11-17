/**
 * Created by Rebecca on 16-11-2016.
 */

/**
 * Add a new User
 */
$("#addNewUserButton").on("click", function () {

    //Create JSON object
    var user = {
        username: $("#newUserUsername").val(),
        Password: $("#newUserPassword").val(),
        email: $("#newUserEmail").val(),
        phonenumber: parseInt( $("#newUserPhonenumber").val()),
        adress: $("#newUserAdress").val(),

        mobilepay: parseInt( $("input[name=mobilepay]:checked").val()),
        cash: parseInt($("input[name=cash]:checked").val()),
        transfer: parseInt($("input[name=transfer]:checked").val()),
    };

    //Fetch selected authors
    $('#authorsCheckbox').find('input:checked').each(function() {
        user.mobilepay.push($(this).val());
    });

    //Create user
    SDK.user.create(user, function(err, data){
        if(err) throw err;

        $("#newUserModal").modal("hide");
    });

});