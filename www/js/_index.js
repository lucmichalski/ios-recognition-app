(function() {
    var proxied = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
      if (method == "GET" && url.indexOf("://") == -1) {
        arguments[1] = "http://localhost:12344/" + url;
      }
      return proxied.apply(this, arguments);
    };
  })();

window.addEventListener("load", function () {
    console.log("iOSRTCApp >>> DOM loaded");

    document.addEventListener("deviceready", function () {
    console.log("iOSRTCApp >>> deviceready event");

/*
    var tapEnabled = false; //enable tap take picture
    var dragEnabled = false; //enable preview box drag across the screen
    var toBack = true; //send preview box to the back of the webview
    var rect = {x: 0, y: 0, width: window.innerWidth, height:window.innerHeight};
    cordova.plugins.camerapreview.startCamera(rect, "back", tapEnabled, dragEnabled, toBack)
*/

    cordova.plugins.CameraServer.startServer({
        'www_root' : '/',
        'port' : 8081,
        'localhost_only' : false,
        'json_info': []
    }, function( url ){
        // if server is up, it will return the url of http://<server ip>:port/
        // the ip is the active network connection
        // if no wifi or no cell, "127.0.0.1" will be returned.
        console.log('CameraServer Started @ ' + url); 
    }, function( error ){
        console.log('CameraServer Start failed: ' + error);
    });

    cordova.plugins.CameraServer.startCamera(function(){
          console.log('Capture Started');
      },function( error ){
          console.log('CameraServer StartCapture failed: ' + error);
      });

    cordova.plugins.CameraServer.getVideoFormats(function(data){
          console.log('Availbale Video Formats requested');
          console.log(data);
      },function( error ){
          console.log('CameraServer getVideoFormats failed: ' + error);
      });

    var defaults = {
        'videoFormat': 5
    };

    cordova.plugins.CameraServer.setVideoFormat(function(defaults, data){
        // if server is up, it will return the url of http://<server ip>:port/
        // the ip is the active network connection
        // if no wifi or no cell, "127.0.0.1" will be returned.
        console.log('is set? ' + data); 

    }, function( error ){
        console.log('setVideoFormat failed: ' + error);
    });

    ["js/vmx/vmxAppBuilder.min.js"].forEach(function (path) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;
        script.async = false;
        document.getElementsByTagName("head")[0].appendChild(script);
    });

    /*
    var tracker = document.getElementById('tracker-vmx-stooge');
        tracker.width = window.innerWidth;
        tracker.height = window.innerHeight;

    var camera = document.getElementById('dummyCamera');
        camera.width = window.innerWidth;
        camera.height = window.innerHeight;
        */

    var ctx = document.getElementById('dummyCamera').getContext('2d');
    var img = new Image();
    img.onload = function() {
        window.setInterval("refreshCanvas()", 3);
        function refreshCanvas(){
            ctx.drawImage(img, 0, 0);
        };
    };
    var theDate = new Date();
    img.src = "http://127.0.0.1:8081/live.jpg";

/*
    var tapEnabled = true; //enable tap take picture
    var dragEnabled = true; //enable preview box drag across the screen
    var toBack = true; //send preview box to the back of the webview
    var rect = {x: 100, y: 100, width: 200, height:200};
    cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack)
    */

/*
    var tapEnabled = true; //enable tap take picture
    var dragEnabled = true; //enable preview box drag across the screen
    var toBack = true; //send preview box to the back of the webview
    var rect = {x: 100, y: 100, width: 200, height:200};
    cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack)
*/
    //elImage.setAttribute("src", docURL);

    // TODO: Wait a bit since we are adding more stuff into the DOM.
        // Avoid iOS WebSocket crash:
        //   https://github.com/eface2face/cordova-plugin-iosrtc/issues/12
        // Also looad the original AppRTC JS scripts once Cordova is ready (so the iosrtc plugin
        // has polluted the window namespace with WebRTC class/functions).


  });  // End of ondeviceready.

});  // End of onload.
