<template>
  <canvas id="output_canvas" ref="outputCanvas" :height="200" :width="200"></canvas>
  <div id="gesture_output" ref="gestureOutput"></div>
  <button id="webcamButton" @click="enableCam">{{ webcamButtonText }}</button>
</template>

<script>
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3"

export default {
  data() {
    return {
      gestureRecognizer: null,
      runningMode: "IMAGE",
      webcamRunning: false,
      results: null,
      lastVideoTime: -1,
      webcamButtonText: "ENABLE PREDICTIONS",
    };
  },
  async created() {
    await this.createGestureRecognizer();
  },
  mounted() {
    if (this.hasGetUserMedia()) {
      this.enableWebcamButton = this.$refs.webcamButton;
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  },
  methods: {
    async createGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU"
        },
        runningMode: this.runningMode
      });
    },
    async handleClick(event, index) {
      if (!this.gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }

      if (this.runningMode === "VIDEO") {
        this.runningMode = "IMAGE";
        await this.gestureRecognizer.setOptions({runningMode: "IMAGE"});
      }

      const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
      for (let i = allCanvas.length - 1; i >= 0; i--) {
        allCanvas[i].parentNode.removeChild(allCanvas[i]);
      }

      const results = this.gestureRecognizer.recognize(event.target);

      console.log(results);
      if (results.gestures.length > 0) {
        const p = event.target.parentNode.childNodes[3];
        p.setAttribute("class", "info");

        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
        const handedness = results.handednesses[0][0].displayName;

        p.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
        p.style = `left: 0px; top: ${event.target.height}px; width: ${event.target.width - 10}px;`;

        const canvas = document.createElement("canvas");
        canvas.setAttribute("class", "canvas");
        canvas.setAttribute("width", event.target.naturalWidth + "px");
        canvas.setAttribute("height", event.target.naturalHeight + "px");
        canvas.style = `left: 0px; top: 0px; width: ${event.target.width}px; height: ${event.target.height}px;`;

        event.target.parentNode.appendChild(canvas);
        const canvasCtx = canvas.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "#FF0000",
            lineWidth: 1
          });
        }
      }
    },
    hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    },
    async enableCam() {
      if (!this.gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }

      this.webcamRunning = !this.webcamRunning;
      this.webcamButtonText = this.webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS";

      if (this.webcamRunning) {
        const constraints = {video: true};
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          const video = document.getElementById("my_video");
          video.srcObject = stream;
          video.addEventListener("loadeddata", this.predictWebcam);
        });
      }
    },
    async predictWebcam() {
      const video = document.getElementById("my_video");
      if (this.runningMode === "IMAGE") {
        this.runningMode = "VIDEO";
        await this.gestureRecognizer.setOptions({runningMode: "VIDEO"});
      }
      const nowInMs = Date.now();
      if (video.currentTime !== this.lastVideoTime) {
        this.lastVideoTime = video.currentTime;
        this.results = this.gestureRecognizer.recognizeForVideo(video, nowInMs);
      }

      const canvas = this.$refs.outputCanvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      const drawingUtils = new DrawingUtils(canvasCtx);

      canvas.style.height = this.videoHeight;
      video.style.height = this.videoHeight;
      canvas.style.width = this.videoWidth;
      video.style.width = this.videoWidth;

      if (this.results.landmarks) {
        for (const landmarks of this.results.landmarks) {
          drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "#FF0000",
            lineWidth: 2
          });
        }
      }
      canvasCtx.restore();

      const gestureOutput = this.$refs.gestureOutput;
      if (this.results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        gestureOutput.style.width = this.videoWidth;
        const categoryName = this.results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(this.results.gestures[0][0].score * 100).toFixed(2);
        const handedness = this.results.handednesses[0][0].displayName;
        gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
      } else {
        gestureOutput.style.display = "none";
      }
      if (this.webcamRunning) {
        window.requestAnimationFrame(this.predictWebcam);
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}

#demos.invisible {
  display: none;
}

.canvas {
  position: absolute;
}

.info {
  position: absolute;
  background-color: white;
  padding: 5px;
  border: 1px solid black;
}
</style>
