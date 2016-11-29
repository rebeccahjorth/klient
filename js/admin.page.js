$(document).ready(function () {

  //Fires on page-load
  SDK.Book.getAll(function (err, data) {
    if (err) throw err;




    var $booksTableBody = $("#booksTableBody");
    data.forEach(function (book) {


      $booksTableBody.append(
          "<tr>" +
          "<td>" + book.title + "</td>" +
          "<td>" + book.author + "</td>" +
          "<td>" + book.edition + "</td>" +
          "<td>" + book.isbn + "</td>" +
          "<td><button class='deleteBookBtn' data-isbn='" + book.isbn + "'>Slet</button></td>"+

          "</tr>");
    });
      /**
       * delete user btn
       */
      $(".deleteBookBtn").on("click", function(){
          var $deleteButton = $(this);

          var isbn = {
              isbn: $deleteButton.data("isbn")};

          SDK.Book.delete(isbn, function(err,data) {
              if (err) throw err;
                location.reload();
          });
      });

  });




  var currentUser = SDK.User.current();
  $("#currentUserName").text(currentUser.username);



    /**
    * get all users in a table with btn
     */
  SDK.User.getAll(function (err, users) {
    if (err) throw err;


    var $usersTableBody = $("#usersTableBody");
    users.forEach(function (user) {

      $usersTableBody.append(
          "<tr>" +
          "<td>" + user.username + "</td>" +
          "<td>" + user.password + "</td>" +
          "<td>" + user.email + "</td>" +
          "<td>" + user.phonenumber + "</td>" +
          "<td><button class='deleteUserButton' data-userId='" + user.userId + "'>Slet</button></td>"+
          "</tr>");

    });



      /**
       * delete user btn
       */
      $(".deleteUserButton").on("click", function(){
          var $deleteButton = $(this);

          var userId = {
              id: $deleteButton.data("userid")};

          SDK.User.delete(userId, function(err,data) {
              if (err) throw err;
                location.reload();
          });
          });



  });






  /**
   * Add a new Book
   */
  $("#addNewBookButton").on("click", function () {

    //Show modal
    $('#newBookModal').modal('show');



    $("#createBookButton").on("click", function(){

      //Create JSON object
      var book = {
        isbn: parseInt($("#bookISBN").val()),
        title: $("#bookTitle").val(),
        edition: $("#bookEdition").val(),
        author: $("#bookAuthor").val(),
      };

      //Create book

      SDK.Book.create(book, function(err,data){
        if(err) throw err;



        $("#newBookModal").modal("hide");
          location.reload();
      });

    });

  });









    $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });


});


