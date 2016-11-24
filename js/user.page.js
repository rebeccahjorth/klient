
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

                "<td><button class='reserveAdButton' data-adId='" + ads.adId + "'>Reserver</button></td>"+

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
                "<td><button class='deleteReservedButton' data-adId='" + ads.adId + "'>Slet reservation</button></td>"+
                "<td><button class='updateAdButton' data-adId='" + ads.adId + "'>Vis Mere</button></td>"+
                "</tr>");
        });

        /**
         * reserve this ad
         */
        $(".deleteReservedButton").on("click", function(){
            var $deleteReservedBtn = $(this);
            var adId = {
                id: $deleteReservedBtn.data("adid")};

            SDK.Ads.deletereserved(adId, function(err) {
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

            SDK.Ads.updatead(adId, function(err) {
                if (err) throw err;
                $("#updateAdModal").modal("show");



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
            SDK.Ads.create(ad, function(err,data){
                if(err) throw err;

                $("#newAdModal").modal("hide");
                location.reload();
            });

        });

    });


    // logout

    $("#logOutLink").on("click", function () {
        SDK.logOut();
        window.location.href = "index.html";
    });

});