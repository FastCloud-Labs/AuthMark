<template>
  <div class="pa-1">
    <p class="pb-1">Action Instruction: <span id="instruction">{{ actionInstruction }}</span></p>
    <v-row>
      <v-col cols="6">
        <video id="my_video" ref="video" width="300" height="300" autoplay></video>
      </v-col>
      <v-col cols="6">
        <canvas id="my_canvas" ref="canvas" width="300" height="300"></canvas>
        <canvas id="output_canvas_hand" ref="outputCanvas" :height="200" :width="200"></canvas>
      </v-col>
      <v-col cols="12">
        <v-btn @click="showDot" color="primary">showDot</v-btn>
        <br>

        // todo change to progress bar and generate local certificate
        // replace alert with sound
        <p>Completed Action Count: <span id="actionCount">{{ completedActionCount }}</span></p>

        <div id="gesture_output" ref="gestureOutput"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3"

import {markRaw} from 'vue'


export default {
  data() {
    return {
      faceMesh: null,
      gestureRecognizer: null,
      videoElement: null,
      canvasElement: null,
      canvasCtx: null,
      canvasElementHand: null,
      canvasHandCtx: null,
      runningMode: "VIDEO",
      currentActionType: -1,
      completedActionCount: 0,
      actionInstruction: "",
      actionType: ["Blink", "Open Mouth", "Turn Left", "Turn Right"],
      elapsed_time: 0,
      lastVideoTime: -1,
      results: null,
      webcamRunning: false,
      webcamButtonText: "ENABLE PREDICTIONS",
      hideDot: true,
      randomnumber1: 0,
      randomnumber2: 0,
    };
  },
  methods: {
    initFaceMesh() {
      this.faceMesh = markRaw(new FaceMesh({
        locateFile: (file) => `./pol/${file}`
      }));

      this.faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        useCpuInference: true
      });

      this.faceMesh.onResults(this.faceMeshResults.bind(this));
    },
    async faceMeshResults(results) {
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      if (!results.multiFaceLandmarks) return;

      const landmarks = results.multiFaceLandmarks[0];
      if (!landmarks) return;

      const realLandmarks = landmarks.map(point => [point.x * 100, point.y * 100 * (this.canvasElement.height / this.canvasElement.width)]);

      const drawParams = [
        {connectors: window.FACEMESH_TESSELATION, color: '#379bec', lineWidth: 0.5},
        {connectors: window.FACEMESH_RIGHT_EYE, color: 'rgba(168,207,246,0.86)'},
        {connectors: window.FACEMESH_RIGHT_EYEBROW, color: '#379bec'},
        {connectors: window.FACEMESH_RIGHT_IRIS, color: '#379bec'},
        {connectors: window.FACEMESH_LEFT_EYE, color: 'rgba(168,207,246,0.86)'},
        {connectors: window.FACEMESH_LEFT_EYEBROW, color: '#379bec'},
        {connectors: window.FACEMESH_LEFT_IRIS, color: '#379bec'},
        {connectors: window.FACEMESH_FACE_OVAL, color: '#379bec', lineWidth: 1},
        {connectors: window.FACEMESH_LIPS, color: '#379bec'}
      ];

      drawParams.forEach(param => drawConnectors(this.canvasCtx, landmarks, param.connectors, {
        color: param.color,
        lineWidth: param.lineWidth || 1
      }));

      if (this.currentActionType === -1) {
        this.currentActionType = Math.floor(Math.random() * 4);
        this.actionInstruction = this.actionType[this.currentActionType];
      }

      let flag = false;
      if (this.currentActionType === 0 && this.eyeAspectRatio(realLandmarks) < 0.2) {
        flag = true;
      } else if (this.currentActionType === 1 && this.mouthAspectRatio(realLandmarks) > 0.6) {
        flag = true;
      } else if (this.currentActionType === 2) {
        const angle = this.getPoint5Angle(this.getPoint5(realLandmarks));
        if ((angle[2] < -90 || angle[2] > 90) && (angle[1] > -30 && angle[1] < 30)) {
          flag = true;
        }
      } else if (this.currentActionType === 3) {
        const angle = this.getPoint5Angle(this.getPoint5(realLandmarks));
        if ((angle[1] < -30 || angle[1] > 30) && (angle[2] > -30 && angle[2] < 30)) {
          flag = true;
        }
      }

      if (flag) {
        alert("Detected");
        this.currentActionType = -1;
        this.completedActionCount += 1;
        this.actionInstruction = "Please wait...";
        setTimeout(() => {
          this.actionInstruction = this.actionType[this.currentActionType];
        }, 2000);
      }
    },
    get2PointsNorm(p1, p2) {
      return Math.sqrt(p1.reduce((sum, val, i) => sum + Math.pow(val - p2[i], 2), 0));
    },
    get4PointsAspectRatio(points) {
      const v1 = this.get2PointsNorm(points[0], points[4]);
      const h1 = this.get2PointsNorm(points[1], points[5]);
      const h2 = this.get2PointsNorm(points[2], points[6]);
      const h3 = this.get2PointsNorm(points[3], points[7]);
      return (h1 + h2 + h3) / (3 * v1);
    },
    eyeAspectRatio(landmarks) {
      const leftEyePoints = [263, 385, 386, 387, 362, 380, 374, 373].map(i => landmarks[i]);
      const rightEyePoints = [33, 160, 159, 158, 133, 144, 145, 153].map(i => landmarks[i]);
      return (this.get4PointsAspectRatio(leftEyePoints) + this.get4PointsAspectRatio(rightEyePoints)) / 2;
    },
    mouthAspectRatio(landmarks) {
      const mouthPoints = [61, 81, 13, 311, 291, 178, 14, 402].map(i => landmarks[i]);
      return this.get4PointsAspectRatio(mouthPoints);
    },
    getPoint5(landmarks) {
      return [468, 473, 4, 61, 291].map(i => landmarks[i]);
    },
    getPoint5Angle(points) {
      const LMx = points.map(p => p[0]);
      const LMy = points.map(p => p[1]);

      const dPx_eyes = Math.max((LMx[1] - LMx[0]), 1.0);
      const dPy_eyes = LMy[1] - LMy[0];
      const angle = Math.atan(dPy_eyes / dPx_eyes);

      const alpha = Math.cos(angle);
      const beta = Math.sin(angle);

      const LMRx = points.map((p, i) => alpha * LMx[i] + beta * LMy[i] + (1 - alpha) * LMx[2] / 2 - beta * LMy[2] / 2);
      const LMRy = points.map((p, i) => -beta * LMx[i] + alpha * LMy[i] + beta * LMx[2] / 2 + (1 - alpha) * LMy[2] / 2);

      const dXtot = (LMRx[1] - LMRx[0] + LMRx[4] - LMRx[3]) / 2;
      const dYtot = (LMRy[3] - LMRy[0] + LMRy[4] - LMRy[1]) / 2;

      const dXnose = (LMRx[1] - LMRx[2] + LMRx[4] - LMRx[2]) / 2;
      const dYnose = (LMRy[3] - LMRy[2] + LMRy[4] - LMRy[2]) / 2;

      const Xfrontal = dXtot !== 0 ? (-90 + 90 / 0.5 * dXnose / dXtot) : 0;
      const Yfrontal = dYtot !== 0 ? (-90 + 90 / 0.5 * dYnose / dYtot) : 0;

      const roll = angle * 180 / Math.PI;
      const pitch = Yfrontal;
      const yaw = Xfrontal;

      return [roll, pitch, yaw];
    },
    async startInference() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("No navigator.mediaDevices.getUserMedia exists.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: 300,
            height: 300
          }
        });
        this.videoElement.srcObject = stream;
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play();
          this.captureStatus();
        };
      } catch (c) {
        console.error("Web cam not enabled: " + c);
        alert("Web cam not enabled: " + c);
        throw c;
      }
      this.enableHand();
    },
    captureStatus() {
      window.requestAnimationFrame(this.forward.bind(this));
    },
    forward() {
      if (!this.videoElement.paused && this.videoElement.currentTime !== this.elapsed_time) {
        this.elapsed_time = this.videoElement.currentTime;
        this.faceMesh.send({image: this.videoElement}).then(this.captureStatus.bind(this));
      } else {
        this.captureStatus();
      }
    },
    async createGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU",
        },
        numHands: 2,
        runningMode: this.runningMode
      });
    },
    async enableHand() {
      if (!this.gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }

      this.webcamRunning = !this.webcamRunning;
      this.webcamButtonText = this.webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS";

      if (this.webcamRunning) {
        this.videoElement.addEventListener("loadeddata", this.predictWebcam.bind(this));
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
        this.results = await this.gestureRecognizer.recognizeForVideo(video, nowInMs);
      }


      const drawingUtils = new DrawingUtils(this.canvasHandCtx);

      this.canvasHandCtx.save();
      this.canvasHandCtx.clearRect(0, 0, this.canvasElementHand.width, this.canvasElementHand.height);

      this.canvasElementHand.style.height = this.videoHeight;
      this.canvasElementHand.style.width = this.videoWidth;


      if (this.results.landmarks) {
        this.results.landmarks.forEach(landmarks => {
          drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
            color: "rgba(168,207,246,0.86)",
            lineWidth: 1
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "#379bec",
            lineWidth: 1,
            radius: 3
          });
        });
      }

      this.canvasHandCtx.restore();


      if (!this.hideDot) {
        this.canvasHandCtx.beginPath();
        this.canvasHandCtx.arc(this.randomnumber1, this.randomnumber2, 10, 0, Math.PI * 2, true);
        this.canvasHandCtx.closePath();
        this.canvasHandCtx.fillStyle = "#2fb42c";
        this.canvasHandCtx.fill();
      }


      const gestureOutput = this.$refs.gestureOutput;
      if (this.results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        gestureOutput.style.width = this.videoWidth;
        const {categoryName, score} = this.results.gestures[0][0];
        const handedness = this.results.handednesses[0][0].displayName;
        gestureOutput.innerText = `GestureRecognizer: ${categoryName}\nConfidence: ${parseFloat(score * 100).toFixed(2)}%\nHandedness: ${handedness}`;
      } else {
        gestureOutput.style.display = "none";
      }

      if (this.webcamRunning) {
        window.requestAnimationFrame(this.predictWebcam.bind(this));
      }
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
    showDot() {
      this.hideDot = false
      this.randomnumber1 = this.randomNumber(50, 180);
      this.randomnumber2 = this.randomNumber(10, 80);
    },
    collision({box1, box2}) {
      return box1.position.x + box1.width >= box2.position.x
    }
  },
  async mounted() {
    this.videoElement = this.$refs.video;
    this.canvasElement = this.$refs.canvas;
    this.canvasCtx = this.canvasElement.getContext("2d");
    this.canvasElementHand = this.$refs.outputCanvas;
    this.canvasHandCtx = this.canvasElementHand.getContext("2d");


    await this.initFaceMesh();
    await this.createGestureRecognizer();
    await this.startInference();

  }
};

</script>

<style>
#my_video, #my_canvas {
  border-radius: 100%;
  border: 2px solid #fff;
  height: 300px;
  width: 300px;
  background: #000;
  background: url(pol-bg.png);
  zoom: 1.2;
  transform: rotateY(180deg);
}

canvas#output_canvas_hand {
  position: relative;
  top: -360px;
  right: 0;
  width: 350px;
  border-radius: 100%;
  transform: rotateY(180deg);
}
.v-col.v-col-6 {
  max-height: 400px;
}
</style>
