
$(document).ready(function () {

    //Fires on page-load
    SDK.Ads.getAll(function(err, data){
        if(err) throw err;


        var $adsTableBody = $("#adsTableBody");
        data.forEach(function (ads) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ads.adId + "</td>" +
                "<td>" + ads.isbn + "</td>" +
                "<td>" + ads.bookTitle + "</td>" +
                "<td>" + ads.bookAuthor + "</td>" +
                "<td>" + ads.bookEdition + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "<td>" + ads.price + "</td>" +

                "<td><button class='reserveAdButton' data-adId='" + ads.adId + "'>Reserver</button></td>"+
                "<td><button class='showAdButton' data-adId='" + ads.adId + "'>Vis bog</button></td>"+

                "</tr>");
        });




        /**
         * reserve this ad
         */
        $(".reserveAdButton").on("click", function(){
            var $reserveButton = $(this);
            var adId = {
                id: $reserveButton.data("adid")};

            SDK.Ads.reserve(adId, function(err) {
                if (err) throw err;
                location.reload();



            });
        });


        /**
         * show this ad
          */

        $(".showAdButton").on("click", function(){
            var $showbutton = $(this);
            var adId = {
                id: $showbutton.data("adid")};


            //Show modal
            $('#showAdModal').modal('show');


        });
    });


    /**
     * Gets my ads + show delete reserved Btn
     */

    SDK.MyAds.getAll(function(err, data){
        if(err) throw err;



        var $MyAdsTableBody = $("#myAdsTableBody");
        data.forEach(function (ads ) {

            $MyAdsTableBody.append(
                "<tr>" +
                "<td>" + ads.isbn + "</td>" +
                "<td>" + ads.price + "</td>" +
                "<td>" + ads.comment + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "<td>" + ads.locked + "</td>" +
                "<td><button class='unlockReservedButton' data-adId='" + ads.adId + "'>Slet reservation</button></td>"+
                "<td><button class='updateAdButton' data-adId='" + ads.adId + "'>Vis Mere</button></td>"+
                "</tr>");
        });

        /**
         * unlock my ad this ad
         */
        $(".unlockReservedButton").on("click", function(){
            var $unlockReservedBtn = $(this);
            var adId = {
                id: $unlockReservedBtn.data("adid")};

            SDK.MyAds.unlockAd(adId, function(err) {
                if (err) throw err;
                location.reload();



            });


        });

        /**
         * update this ad
         */
        $(".updateAdButton").on("click", function(){
            var $updatebutton = $(this);
            var adId = {
                id: $updatebutton.data("adid")};


            //Show modal
            $('#updateAdModal').modal('show');



            $("#updateAdButton").on("click", function(){

                //Create JSON object
                var ad = {


                    rating: $("#updateadRating").val(),
                    comment: $("#updateadComment").val(),
                    price: parseInt($("#updateadPrice").val())

                };



                //Create ad
                SDK.Ads.update(ad, function(err,data){
                    if(err) throw err;

                    $("#updateAdModal").modal("hide");
                    location.reload();
                });

            });



        });
    });
});

/**
 * Add a new ad
 */
$("#addNewAdButton").on("click", function () {

    //Show modal
    $('#newAdModal').modal('show');



    $("#createAdButton").on("click", function(){

        //Create JSON object
        var ad = {

            isbn: parseInt($("#adIsbn").val()),
            rating: parseInt($("#adRating").val()),
            comment: $("#adComment").val(),
            price: parseInt($("#adPrice").val()),

        };



        //Create ad
        SDK.Ads.update(ad, function(err,data){
            if(err) throw err;

            $("#newAdModal").modal("hide");
            location.reload();
        });

    });

});

/**
 * Gets my reservation + show delete reserved Btn
 */

SDK.MyAds.getReservation(function(err, data){
    if(err) throw err;



    var $MyReservationTableBody = $("#myReservationTableBody");
    data.forEach(function (ads ) {

        $MyReservationTableBody.append(
            "<tr>" +
            "<td>" + ads.adId + "</td>" +
            "<td>" + ads.bookIsbn + "</td>" +
            "<td>" + ads.userUsername + "</td>" +
            "<td>" + ads.userPhonenumber + "</td>" +
            "<td>" + ads.timestamp + "</td>" +
            "<td><button class='deleteReservedButton' data-adId='" + ads.adId + "'>Slet reservation</button></td>"+
            "</tr>");
    });

    $(".deleteReservedButton").on("click", function(){
        var $deleteReservedBtn = $(this);
        var adId = {
            id: $deleteReservedBtn.data("adid")};

        SDK.Ads.deletereserved(adId, function(err) {
            if (err) throw err;
            location.reload();



        });

    });


});



// logout

$("#logOutLink").on("click", function () {
    SDK.logOut();
    window.location.href = "index.html";
});

