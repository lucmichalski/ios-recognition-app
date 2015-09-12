cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.moonware.cameraserver/www/CameraServer.js",
        "id": "com.moonware.cameraserver.CameraServer",
        "clobbers": [
            "cordova.plugins.CameraServer"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.wkwebview/www/wkwebview.js",
        "id": "com.telerik.plugins.wkwebview.wkwebview",
        "clobbers": [
            "wkwebview"
        ]
    },
    {
        "file": "plugins/cordova-plugin-app-preferences/www/apppreferences.js",
        "id": "cordova-plugin-app-preferences.apppreferences",
        "clobbers": [
            "plugins.appPreferences"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-webrtc/dist/webrtc.js",
        "id": "cordova-plugin-webrtc.WebRTC",
        "clobbers": [
            "webrtc"
        ]
    },
    {
        "file": "plugins/jp.wizcorp.phonegap.plugin.wizCanvasPlugin/www/phonegap/plugin/wizCanvas/wizCanvas.js",
        "id": "jp.wizcorp.phonegap.plugin.wizCanvasPlugin.wizCanvasPlugin",
        "clobbers": [
            "window.wizCanvas"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
        "id": "org.apache.cordova.geolocation.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
        "id": "org.apache.cordova.geolocation.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
        "id": "org.apache.cordova.geolocation.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
        "id": "org.apache.cordova.geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/org.transistorsoft.cordova.plugin.background.fetch/www/BackgroundFetch.js",
        "id": "org.transistorsoft.cordova.plugin.background.fetch.BackgroundFetch",
        "clobbers": [
            "window.BackgroundFetch"
        ]
    },
    {
        "file": "plugins/com.mbppower.camerapreview/www/CameraPreview.js",
        "id": "com.mbppower.camerapreview.CameraPreview",
        "clobbers": [
            "cordova.plugins.camerapreview"
        ]
    },
    {
        "file": "plugins/jaeger.Html5Video/www/Html5Video.js",
        "id": "jaeger.Html5Video.Html5Video",
        "clobbers": [
            "plugins.html5Video"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.moonware.cameraserver": "0.2.0",
    "com.telerik.plugins.wkwebview": "0.4.0",
    "cordova-plugin-app-preferences": "0.7.1",
    "cordova-plugin-console": "1.0.1",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-network-information": "1.0.1",
    "cordova-plugin-webrtc": "0.1.3",
    "jp.wizcorp.phonegap.plugin.wizCanvasPlugin": "2.1.0",
    "org.apache.cordova.geolocation": "0.3.12",
    "org.transistorsoft.cordova.plugin.background.fetch": "2.0.4",
    "com.mbppower.camerapreview": "0.0.8",
    "jaeger.Html5Video": "1.2.1",
    "cordova-plugin-splashscreen": "2.1.0",
    "cordova-plugin-webserver": "1.0.3"
}
// BOTTOM OF METADATA
});