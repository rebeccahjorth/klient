$(document).ready(function () {

/**
* viser alle annoncer
 */

    //Fires on page-load
    SDK.Ads.getAll(function (err, data) {
        if (err) throw err;

    //oprettelse af knap i tabel ref: http://stackoverflow.com/questions/23434246/easiest-way-to-add-a-button-on-each-row-of-a-table-html
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

                "<td><button class='reserveAdButton' data-adId='" + ads.adId + "'>Reserver</button></td>" +
                "<td><button class='showAdButton' data-adId='" + ads.adId + "'>Vis bog</button></td>" +

                "</tr>");
        });

        /**
         * show this ad
         */
        $(".showAdButton").on("click", function () {
            var $showAdBtn = $(this);
            var adId = {
                id: $showAdBtn.data("adid")
            };
            //Show modal
            $('#showAdModal').modal('show');


            SDK.Ads.getAd(adId, function (err,data) {
                if (err) throw err;


                // this ad table

                $("#thisAdTableBody").append(
                    "<tr>" +
                    "<td>" + data.bookTitle + "</td>" +
                    "<td>" + data.bookAuthor + "</td>" +
                    "<td>" + data.bookEdition + "</td>" +
                    "<td>" + data.price + "</td>" +
                    "<td>" + data.comment + "</td>" +
                    "<td>" + data.rating + "</td>" +
                    "<td>" + data.userUsername + "</td>" +
                    "<td>" + data.userPhonenumber + "</td>" +
                    "<td>" + data.userAddress + "</td>" +
                    "<td>" + data.userMobilepay + "</td>" +
                    "<td>" + data.userCash + "</td>" +
                    "<td>" + data.userTransfer + "</td>" +
                    "</tr>");
            });


        });
        /**
         * reserve this ad
         */
        $(".reserveAdButton").on("click", function () {
            var $reserveButton = $(this);
            var adId = {
                id: $reserveButton.data("adid")
            };

            SDK.Ads.reserve(adId, function (err) {
                if (err) throw err;
                location.reload();


            });
        });


    });


    /**
     * Gets my ads + unlock reserved Btn
     */

    SDK.MyAds.getAll(function (err, data) {
        if (err) throw err;


        var $MyAdsTableBody = $("#myAdsTableBody");
        data.forEach(function (ads) {

            $MyAdsTableBody.append(
                "<tr>" +
                "<td>" + ads.isbn + "</td>" +
                "<td>" + ads.price + "</td>" +
                "<td>" + ads.comment + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "<td>" + ads.locked + "</td>" +
                "<td><button class='unlockReservedButton' data-adId='" + ads.adId + "'>Slet reservation</button></td>" +
                "<td><button class='deleteAdButton' data-adId='" + ads.adId + "'>Slet annonce</button></td>" +

                "</tr>");
        });

        /**
         * unlock my ad
         */
        $(".unlockReservedButton").on("click", function () {
            var $unlockReservedBtn = $(this);
            var adId = {
                id: $unlockReservedBtn.data("adid")
            };

            SDK.MyAds.unlockAd(adId, function (err) {
                if (err) throw err;
                location.reload();


            });


        });

        /**
         * delete my ads,
         */
        $(".deleteAdButton").on("click", function () {
            var $deleteAdBtn = $(this);
            var adId = {
                id: $deleteAdBtn.data("adid")
            };

            SDK.MyAds.deleteAd(adId, function (err) {
                if (err) throw err;
                location.reload();


            });


        });





    });


    /**
     * Add a new ad
     */
    $("#addNewAdButton").on("click", function () {

        //Show modal
        $('#newAdModal').modal('show');


        $("#createAdButton").on("click", function () {

            //Create JSON object
            var ad = {

                isbn: parseInt($("#adIsbn").val()),
                rating: parseInt($("#adRating").val()),
                comment: $("#adComment").val(),
                price: parseInt($("#adPrice").val()),

            };


            //Create ad
            SDK.Ads.create(ad, function (err, data) {
                if (err) throw err;

                $("#newAdModal").modal("hide");
                window.alert("Annoncen blev oprettet");
                location.reload();
            });

        });

    });

    /**
     * Gets my reservation + delete reserved Btn
     */

    SDK.MyAds.getReservation(function (err, data) {
        if (err) throw err;




        var $MyReservationTableBody = $("#myReservationTableBody");
        data.forEach(function (ads) {

            $MyReservationTableBody.append(
                "<tr>" +
                "<td>" + ads.adId + "</td>" +
                "<td>" + ads.bookIsbn + "</td>" +
                "<td>" + ads.userUsername + "</td>" +
                "<td>" + ads.userPhonenumber + "</td>" +
                "<td>" + ads.timestamp + "</td>" +
                "<td><button class='deleteReservedButton' data-adId='" + ads.adId + "'>Slet reservation</button></td>" +
                "</tr>");
        });

        $(".deleteReservedButton").on("click", function () {
            var $deleteReservedBtn = $(this);
            var adId = {
                id: $deleteReservedBtn.data("adid")
            };

            SDK.Ads.deletereserved(adId, function (err) {
                if (err) throw err;
                window.alert("Annoncen er slettet");
                location.reload();


            });

        });


    });



// logud funktion, når man klikker på knappen

    $("#logOutLink").on("click", function () {
        SDK.logOut();
        window.location.href = "index.html";
    });
});

