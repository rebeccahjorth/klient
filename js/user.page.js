
$(document).ready(function () {

    //Fires on page-load
    SDK.Ads.getAll(function(err, data){
        if(err) throw err;


        var $adsTableBody = $("#adsTableBody");
        data.forEach(function (ads) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ads.isbn + "</td>" +
                "<td>" + ads.bookTitle + "</td>" +
                "<td>" + ads.bookAuthor + "</td>" +
                "<td>" + ads.bookEdition + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "</tr>");
        });

    });


    //Fires on page-load
    SDK.MyAds.getAll(function(err, data){
            if(err) throw err;


        var $MyAdsTableBody = $("#myAdsTableBody");
        data.forEach(function (ads ) {

            $MyAdsTableBody.append(
                "<tr>" +
                "<td>" + ads.isbn + "</td>" +
                "<td>" + ads.bookTitle + "</td>" +
                "<td>" + ads.bookAuthor + "</td>" +
                "<td>" + ads.bookEdition + "</td>" +
                "<td>" + ads.comment + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "<td>" + ads.locked + "</td>" +
                "</tr>");
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

    $("#logOutLink").on("click", function () {
        SDK.logOut();
        window.location.href = "index.html";
    });

});