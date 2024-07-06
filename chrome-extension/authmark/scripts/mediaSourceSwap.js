var realUserMediaCall = window.navigator.mediaDevices.getUserMedia;
window._realUserMediaCall = realUserMediaCall;

window.navigator.mediaDevices.getUserMedia = async function (constraints) {
    if (constraints.video.deviceId) {
        var canvas = document.getElementById("sourceCanvas");
        var stream = await realUserMediaCall.call(
            navigator.mediaDevices,
            constraints
        );
        var res = canvas.captureStream(60);
        var videoTrack = res.getVideoTracks()[0];
        var videoTrackStop = videoTrack.stop;
        videoTrack.stop = function () {
            stream.getVideoTracks()[0].stop();
            videoTrackStop.call(videoTrack);
        };

        var videoElement = tryGetVideoElement();
        let height = null;
        try{
            height = constraints.video.advanced[1].height.min;
        }catch{}
        let width = null;
        try{
            width = constraints.video.advanced[2].width.min;
        }catch{}
        videoElement.height = height || 720;
        videoElement.width = width || 1280;
        videoElement.srcObject = stream;
        

        return res;
    } else {
        return await realUserMediaCall.call(navigator.mediaDevices, constraints);
    }
};

function tryGetVideoElement() {
    var existingElement = document.getElementById("realVideo");
    if (existingElement) {
        return existingElement;
    }
    var realVideo = document.createElement("video");
    realVideo.setAttribute("id", "realVideo");
    realVideo.setAttribute("style", "display:none");
    document.documentElement.appendChild(realVideo);
    return realVideo;
}
//console.log("running....")