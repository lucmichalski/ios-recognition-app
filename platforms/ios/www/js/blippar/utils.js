/*
*
* LTU Tech - Libraries / Methods
*
*/

    function dataUriToBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type:mimeString});
    }

    function sendtoPipelines(blob) {
        var form = new FormData();
        var xhr = new XMLHttpRequest();
        var url = ltu_protocol+"://"+ltu_endPoint+"/api/ltu/json/#"+Math.random();
        xhr.ontimeout = function () {
           console.error("close for timed out.");
        };
        xhr.onreadystatechange = function() {
           if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var match = jQuery.parseJSON(xhr.responseText);
                    if(match.nb_results_found>0) {
                        var details = jQuery.parseJSON(match.images[0]['result_info']);
                        if($( "#ltutech" ).length==0 ) {
                            $("#blippar-footer").append( '<div id=\'ltutech\'><li class="ltuheader">LTU TECH 7.6 / Last Reco</li><ul id="ltutech76"></span></ul>' );
                        }
                        $("#ltutech76").empty();
                        for (i = 0; i < match.images.length; i++) { 
                            var details = jQuery.parseJSON(match.images[i]['result_info']);
                            //if(match.images[i].score<0.50) {
                                $("#ltutech76").append('<li class=\'ltutech\' style=\'background: url(http://50.112.102.63:8888/applications/content?application_key='+app_1+'&amp;content_type=thumbnail&amp;image_id='+match.images[i].id+');background-size:100% 100%;\'><span class="ltulabel">'+match.images[i].id.replace('.png','')+'</span><span class="ltuscore">'+String(match.images[i].score).substring(0,4)+'</span></li>' );
                                _placeMatchingBox(details.reference.matchingBox);
                            //}
                        }
                    } else {
                        $('#ltutech').remove();
                    }
                } else {
                    $('#ltutech').empty();
                    console.log('Error submitting image: ' + xhr.status);
                }
            }
        };
        form.append('application_key', ltu_application);
        form.append('image_content', blob);
        xhr.timeout = 2000;
        xhr.open('POST', url, true);
        xhr.send(form);
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
        }, 600);

        }

      };