$(document).ready(function () {

    //Fires on page-load og henter alle annoncer


    SDK.Ads.getAll(function(err, data){
        if(err) throw err;


        var $adsTableBody = $("#adsTableBody");
        data.forEach(function (ads,data ) {

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

});

