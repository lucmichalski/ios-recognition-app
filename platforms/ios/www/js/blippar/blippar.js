var scene = '';
var ltuEngine = false;
var logoEngine = false;
var vmxEngine = false;
var models = {};
var cameraFlow = '';
var cameraCanvas;
// General settings
var fps                 = 3; // Frame per seconds
$.ajaxSetup({
    async: true,
    cache: true,
    timeout: 2000
});

// LTU Pipeline 
var app_1               = 'L8ZjnmVukVmjjH8N2gXC6q3UAj6yLS2V';
var port_ltu            = 8080;
var domain_ltu          = "50.112.102.63";

// VMX Pipeline
var myModelUuid = '05274552-8019-45e0-bd49-239780eb37c1';
var vmx_server_ip = 'http://cyclopus.blippar.com';

// Control camera dimension
var flippedCameraWidth = 320;
var flippedCameraHeight = 240;
$( document ).ready(function() {

   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#vmxHolder').remove();
   }

   $(".cbp-vimenu2").append('<div class="startLTUIcon"><a href="#" class="startLTU"><img src="./_assets/ltutech.jpg"></a></div>')
   $(".cbp-vimenu2").append('<div class="startLogoIcon"><a href="#" class="startLogo"><img src="./_assets/brandsrecognition.jpg"></a></div>')

    var field = 'kbshow';
    var url = window.location.href;

    function drawBoard(context,color,size){
        for (var x = 0; x <= bw; x += colHor) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x <= bh; x += colVer) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }

        context.strokeStyle = color;
        context.lineWidth = size;
        context.stroke();
    }

    //grid width and height
    var bw = $(window).width();
    var bh = $(window).height();
    var colHor = bw/3;
    var colVer = bh/3;
    //padding around grid
    var p = 0;
    //size of canvas
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;

    var canvasTarget = $('<canvas/>').attr({class:'targetGrid',width: cw, height: ch, id: 'largeGrid'}).appendTo('body');
    $('<li/>').attr({id:'resizedCamera'}).appendTo('body');
    var canvasTarget = canvasTarget.get(0).getContext("2d");
    drawBoard(canvasTarget,'green',1);
    var bw = $('#resizedCamera').width();
    var bh = $('#resizedCamera').height();
    var colHor = bw/3;
    var colVer = bh/3;
    var p = 1;
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;
    var canvas2 = $('<canvas/>').attr({class:'smalltargetGrid',width: cw, height: ch, id: 'smallGrid'}).appendTo('#resizedCamera');
    var context2 = canvas2.get(0).getContext("2d");
    var canvas3 = $('<canvas/>').attr({class:'smalltargetGrid',width: cw, height: ch, id: 'smallGridTrans'}).appendTo('#resizedCamera');
    var canvas4 = $('<canvas/>').attr({class:'dummyCanvas',width: 320, height: 240, id: 'dummy'}).appendTo('#resizedCamera');
    drawBoard(context2,'red',2);
    var canvas5 = $('<canvas/>').attr({class:'markerLessTracking',width: $(window).width(), height: $(window).height(), id: 'targetTrack'}).appendTo('#resizedCamera');

    if(url.indexOf('?' + field + '=1') != -1)
        $('.container2').show();
    else if(url.indexOf('&' + field + '=1') != -1)
        $('.container2').show();

    // Knowledge Graph display
    $('.startLTU').click(function(){
        if(ltuEngine==false) {
            ltuEngine = true;
            $(".startLtu .statusEngine").text('[On]');
            $('#ltutech').show();
            $(".startLTUIcon").css("border", "5px solid #0f0");
            if($vmx.globals.url=='') {
                var config = {from:46, to:740, folder:"_camera", baseName:"camera-", ext:"jpg", view:"dummy", playMode: "loop"};
                Sequencer.init(config); 
            }
        } else {
            ltuEngine = false;
            $(".startLtu .statusEngine").text('[Off]');            
            $('#ltutech').hide();
            $(".startLTUIcon").css("border", "5px transparent solid");
        }
        event.preventDefault();
    });

    $('.startLogo').click(function(){
        var injector = angular.element(document).injector();
        $vmx.vmxIpCamProvider = injector.get('vmxIpCamProvider');
        $vmx.vmxImageStreamProvider = injector.get('vmxImageStreamProvider');

        console.log($vmx.vmxIpCamProvider);
        console.log($vmx.vmxImageStreamProvider);
        if(logoEngine==false) {
            logoEngine = true;
            $(".startLogo .statusEngine").text('[On]');
            $(".startLogoIcon").css("border", "5px solid #0f0");
        } else {
            logoEngine = false;
            $(".startLogo .statusEngine").text('[Off]');            
            $('#ltutech').hide();
            $(".startLogoIcon").css("border", "5px transparent solid");
        }
        event.preventDefault();
    });

    $('#startVMX').click(function(){
        if(vmxEngine==false) {
            vmxEngine = true;
            $("#startVMX .statusEngine").text('[On]');
                $(".cbp-vimenu").show();
        } else {
            vmxEngine = false;
            $("#startVMX .statusEngine").text('[Off]');            
            $(".cbp-vimenu").hide(); // need to stop the model of working in the background
        }
        event.preventDefault();
    });

    $('#videoPlay').click(function(){
        clipVideoPlay();
    });

    // Knowledge Graph display
    $('#kb').click(function(){
        if($('.container2').is(":visible")) {
            window.location = window.location.pathname+'?kbshow=1';
        } else {
            $('.container2').show();
        }
    });

    $('#closekb').click(function(){
        $('.container2').hide();
    });

    $( ".icon-logo" ).click(function() {
        $('#container3').toggle();
    });

    function getFlippedCanvas(base64) {
        var img = new Image();
        img.src = base64.src;
        var c = document.getElementById('dummy');
        c.width = flippedCameraWidth;
        c.height = flippedCameraHeight;
        var ctx = c.getContext('2d'); 
        ctx.scale(-1,-1);
        ctx.drawImage(img,0,0,320*-1,240);
        var pixels = ctx.getImageData(0, 0, c.width, c.height);
        ctx.putImageData(pixels, 0, 0);
        return c.toDataURL("image/jpeg",10);
      }

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }

    function _placeMatchingBox(pdMatchingBox) {
        var poCanvas = document.getElementById("smallGridTrans");
        var loContext = poCanvas.getContext("2d");
        var liImgWidth = $('.smalltargetGrid').width();
        var liImgHeight = $('.smalltargetGrid').height()-$(document).scrollTop();
        loContext.strokeStyle = "#F60";
        loContext.lineWidth=3;
        if (typeof pdMatchingBox.points !== 'undefined'){
            loContext.beginPath();
            var liX, liY;
            for(var liIdx in pdMatchingBox.points){
                liX = liImgWidth * pdMatchingBox.points[liIdx][0];
                liY = liImgHeight * pdMatchingBox.points[liIdx][1];
                if(liIdx == 0){
                    loContext.moveTo(liX, liY);
                    var OrigX = liX;
                    var OrigY = liY; 
                } else {
                    loContext.lineTo(liX, liY);
                }
            }
            loContext.closePath();
            loContext.stroke();
            setTimeout(function() {
                loContext.clearRect(0, 0, poCanvas.width, poCanvas.height);
            }, 500);
        }
    };

function clipVideoPlay() {

    var renderer = PIXI.autoDetectRenderer(800, 600, { transparent: true, view: 'videoPlay' });

    $(renderer.view).appendTo('#resizedCamera');

    // create the root of the scene graph
    var stage = new PIXI.Container();

    // create a video texture from a path
    var texture = PIXI.Texture.fromVideo('_assets/testVideo.mp4');

    // create a new Sprite using the video texture (yes it's that easy)
    var videoSprite = new PIXI.Sprite(texture);

    videoSprite.width = renderer.width;
    videoSprite.height = renderer.height; 

    stage.addChild(videoSprite);

    animate();

    function animate(){

        // render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }
 
}


});