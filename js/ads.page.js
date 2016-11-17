$(document).ready(function () {

    //Fires on page-load
    SDK.ads.getAll(function(err, data){
        if(err) throw err;


        var $adsTableBody = $("#adsTableBody");
        data.forEach(function (ads, i) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ads.bookTitle + "</td>" +
                "<td>" + ads.price + "</td>" +
                "<td>" + ads.rating + "</td>" +
                "<td>" + ads.comment + "</td>" +
                "</tr>");
        });

    });

});

