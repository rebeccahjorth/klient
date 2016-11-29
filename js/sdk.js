var SDK = {

    serverURL: "https://localhost:8000",

    request: function (options, cb) {



        //Perform XHR
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            dataType: "json",
            data: JSON.stringify(options.data),
            xhrFields: {withCredentials: true},
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    Book: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/getbooks"}, cb);
        },
        create: function (data, cb) {
            SDK.request({method: "POST", url: "/createbook", data: data}, cb);
        },
        delete: function (data, cb) {
            SDK.request({method: "POST", url: "/deletebook", data: data}, cb);
        }
    },

    Ads: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/getads"}, cb);
        },

        create: function (data, cb) {
            SDK.request({method: "POST", url: "/createad", data: data}, cb);

        },
        getAd: function (cb) {
            SDK.request({method: "GET", url: "/getadpublic"}, cb);
        },
        reserve: function (data, cb) {
            SDK.request({method: "POST", url: "/reservead", data:data}, cb);
        },
        deletereserved: function (data, cb) {
            SDK.request({method: "POST", url: "/deletereservation", data:data}, cb);
        },
        update: function (data, cb) {
            SDK.request({method: "POST", url: "/updatead", data:data}, cb);
        },


    },


    MyAds: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/getmyads"}, cb);
        },
        getReservation: function (cb) {
            SDK.request({method: "GET", url: "/getmyreservations"}, cb);
        },
        unlockAd: function (data,cb) {
            SDK.request({method: "POST", url: "/unlockad", data:data}, cb);
        },



    },

  User: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getusers"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createuser", data: data}, cb);
    },
    current:function () {
      return SDK.Storage.load("user");
    },
    delete: function (data,cb) {
      SDK.request({method: "POST", url: "/deleteuseradmin",data:data}, cb);
    },

    update: function (data,cb){
        SDK.request({method:"POST",url:"/updateuser", data:data},cb);
    }
  },



  logOut:function() {

  },

  login: function (username, password, cb) {
    this.request({
      data: {
        username: username,
        password: password
      },
      url: "/login",
      method: "POST"
    }, function (err, data) {

      //On login-error
      if (err) return cb(err);



      cb(null, data);

    });
  }



};
