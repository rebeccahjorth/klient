$(document).ready(function () {

  //Fires on page-load
  SDK.Book.getAll(function (err, data) {
    if (err) throw err;


    var $booksTableBody = $("#booksTableBody");
    data.forEach(function (book, i) {

      $booksTableBody.append(
          "<tr>" +
          "<td>" + book.title + "</td>" +
          "<td>" + book.author + "</td>" +
          "<td>" + book.edition + "</td>" +
          "<td>" + book.isbn + "</td>" +
          "</tr>");
    });


  });

  //Fires on page-load


  var currentUser = SDK.User.current();
  $("#currentUserName").text(currentUser.username);

  /**
   * Add a new Book
   */
  $("#addNewBookButton").on("click", function () {

    //Show modal
    $('#newBookModal').modal('show');



    $("#createBookButton").on("click", function(){

      //Create JSON object
      var book = {
        ISBN: $("#bookISBN").val(),
        title: $("#bookTitle").val(),
        edition: $("#bookEdition").val(),
        author: $("#bookAuthor").val(),

      };



      //Create book
      SDK.Book.create(book, function(err,data){
        if(err) throw err;

        $("#newBookModal").modal("hide");
      });

    });

  });

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




  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });


});

