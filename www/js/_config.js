/*
*
* Setup main variables
*
*/

// XHR config

// Camera Server
    var local_CameraIP_active       = false;
    var local_CameraIP_endPoint     = "http://127.0.0.1:8081/live.jpg";
    var local_CameraIP_width        = window.innerWidth;
    var local_CameraIP_height       = window.innerHeight;
    var local_CameraIp_fps          = 3; // Frame per seconds

    window.local_CameraIP_active    = local_CameraIP_active;
    window.local_CameraIP_endPoint  = local_CameraIP_endPoint;
    window.local_CameraIP_width     = local_CameraIP_width;
    window.local_CameraIP_height    = local_CameraIP_height;
    window.local_CameraIp_fps       = local_CameraIp_fps;

// LTU variables

    var ltu_active                  = false;
    var ltu_protocol                = "http";
    var ltu_endPoint                = "cyclopus.blippar.com"; // Reversed proxied, so no port needed
    var ltu_retrivial_port          = 8080; // Default port
    var ltu_application             = "L8ZjnmVukVmjjH8N2gXC6q3UAj6yLS2V";

    window.ltu_active               = ltu_active;
    window.ltu_protocol             = ltu_protocol;
    window.ltu_endPoint             = ltu_endPoint;
    window.ltu_retrivial_port       = ltu_retrivial_port;
    window.ltu_application          = ltu_application;

// VMX variables

    // This will automatically attach all VMX sessions which have a loaded model. 
    // Very cool for making a demo which automatically runs all of your detectors.
    var vmx_myModelUuid             = '05274552-8019-45e0-bd49-239780eb37c1';
    var vmx_protocol                = "http";
    var vmx_serverIp                = 'cyclopus.blippar.com';
    var vmx_active                  = true; 
    var vmx_autoAttach              = true; 
    var vmx_ipcamDelay              = 200;

    window.vmx_myModelUuid          = vmx_myModelUuid;
    window.vmx_serverIp             = vmx_serverIp;
    window.vmx_active               = vmx_active;
    window.vmx_autoAttach           = vmx_autoAttach;
    window.vmx_ipcamDelay           = vmx_ipcamDelay;

// Find-Object Detection
    var findObject_active           = false;

    window.findObject_active        = findObject_active;
