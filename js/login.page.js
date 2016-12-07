
$(document).ready(function () {



/**
* metode der logger ind og tjekker at det eksistere, e.preventDefault forhindre at login knap virker hvis der er fejl
 */
  $("#loginButton").on("click", function(e){
    e.preventDefault();

    var username = $("#inputUsername").val();
    var pw = $("#inputPassword").val();


    SDK.login(username, pw, function(err, data){

      //Forkert eller ikke eksisterende brugernavn/kode
      if(err) {

        return $("#loginForm").find(".form-group").addClass("has-error");


      }

      //Login OK!
      $("#loginForm").find(".form-group").addClass("has-success");

      if(data.type==1){
        window.location.href = "admin.html";
      } else{
        window.location.href = "user.html";
      }

    });

  });



});
