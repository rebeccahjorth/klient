$(document).ready(function () {

    /**
     *  Henter alle books
     */
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

      //  delete user btn

      $(".deleteBookBtn").on("click", function(){
          var $deleteBtn = $(this);

          var isbn = {
              isbn: $deleteBtn.data("isbn")};

          SDK.Book.delete(isbn, function(err,data) {
              if (err) throw err;
                location.reload();
          });
      });

  });



    /**
    * get all users in a table with btn
     */
  SDK.User.getAll(function (err, user) {
      if (err) throw err;


    var $usersTableBody = $("#usersTableBody");
    user.forEach(function (user) {


         //nedenstående funktion viser mobile pay om det er ja eller nej

        function mobilepay() {
            if (user.mobilepay==1) {
                return "Ja"
            } else {
                return "Nej"
            }
        }
        function cash(){
            if(user.cash==1){
                return "Ja"

            } else {
                return "Nej"
            }

        }
        function transfer() {
            if (user.transfer == 1) {
                return "Ja"

            } else {
                return "Nej"
            }

        }


      $usersTableBody.append(
          "<tr>" +
          "<td>" + user.username + "</td>" +
          "<td>" + user.password + "</td>" +
          "<td>" + user.email + "</td>" +
          "<td>" + user.phonenumber + "</td>" +
          "<td>" + mobilepay() + "</td>" +
          "<td>" + cash() + "</td>" +
          "<td>" + transfer() + "</td>" +
          "<td><button class='deleteUserButton' data-userId='" + user.userId + "'>Slet</button></td>"+
          "</tr>");

    });

      /**
       * delete user btn, der henter id, så man kan slette specifik user
       */
      $(".deleteUserButton").on("click", function(){
          var $deleteUserBtn = $(this);

          var userId = {
              id: $deleteUserBtn.data("userid")};

          SDK.User.delete(userId, function(err,data) {
              if (err) throw err;
              location.reload();
          });
      });




  });






  /**
   * Add en ny Book.
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


