<template>
  <div class="pa-1">
    <p class="pb-6">Action Instruction: <span id="instruction">{{ actionInstruction }}</span></p>
    <v-row>
      <v-col cols="5">
        <video id="my_video" ref="video" width="300" height="300" autoplay></video>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="5">
        <canvas id="my_canvas" ref="canvas" width="300" height="300"></canvas>
      </v-col>
    </v-row>
    <div class="pa-6">

      // todo change to progress bar and generate local certificate
      // replace alert with sound
      <p>Completed Action Count: <span id="actionCount">{{ completedActionCount }}</span></p>
    </div>
  </div>
</template>

<script>
import {markRaw} from 'vue'

export default {
  data() {
    return {
      completedActionCount: 0,
      actionInstruction: "",
      currentActionType: -1,
      actionType: {
        0: "Please blink your eyes",
        1: "Please open your mouth",
        2: "Please shake your head left to right",
        3: "Please nod up and down"
      },
      faceMesh: null,
      inference: null,
      videoElement: null,
      canvasElement: null,
      canvasCtx: null
    };
  },
  methods: {
    initFaceMesh() {
      this.faceMesh = markRaw(new FaceMesh({
        locateFile: (file) => {
          return `./pol/${file}`;
        }
      }));

      this.faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        useCpuInference: true
      });

      this.faceMesh.onResults(this.faceMeshResults);
    },
    async faceMeshResults(results) {
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      let realLandmarks = [];
      if (results.multiFaceLandmarks) {
        const landmarks = results.multiFaceLandmarks[0];
        if (!landmarks) {
          return;
        }
        for (const point of landmarks) {
          realLandmarks.push([point.x * 100, point.y * 100 * (this.canvasElement.height / this.canvasElement.width)]);
        }

        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_RIGHT_EYE, {color: '#FF3030'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_LEFT_EYE, {color: '#30FF30'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
        drawConnectors(this.canvasCtx, landmarks, window.FACEMESH_LIPS, {color: '#E0E0E0'});
      }

      if (this.currentActionType == -1) {
        this.currentActionType = Math.floor(Math.random() * 4);
        this.actionInstruction = this.actionType[this.currentActionType];
      }

      let flag = false;
      if (this.currentActionType == 0) {
        if (this.eyeAspectRatio(realLandmarks) < 0.2) {
          flag = true;
        }
      } else if (this.currentActionType == 1) {
        if (this.mouthAspectRatio(realLandmarks) > 0.6) {
          flag = true;
        }
      } else if (this.currentActionType == 2) {
        const points = this.getPoint5(realLandmarks);
        const angle = this.getPoint5Angle(points);
        if ((angle[2] < -90 || angle[2] > 90) && (angle[1] > -30 && angle[1] < 30)) {
          flag = true;
        }
      } else if (this.currentActionType == 3) {
        const points = this.getPoint5(realLandmarks);
        const angle = this.getPoint5Angle(points);
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
      let sum = 0;
      for (let index = 0; index < p1.length; index++) {
        sum += Math.pow(p1[index] - p2[index], 2);
      }
      return Math.sqrt(sum);
    },
    get4PointsAspectRatio(points) {
      const v1 = this.get2PointsNorm(points[0], points[4]);
      const h1 = this.get2PointsNorm(points[1], points[5]);
      const h2 = this.get2PointsNorm(points[2], points[6]);
      const h3 = this.get2PointsNorm(points[3], points[7]);
      return (h1 + h2 + h3) / (3 * v1);
    },
    eyeAspectRatio(landmarks) {
      const leftEyePoints = [landmarks[263], landmarks[385], landmarks[386], landmarks[387], landmarks[362], landmarks[380], landmarks[374], landmarks[373]];
      const leftEyeAspectRatio = this.get4PointsAspectRatio(leftEyePoints);
      const rightEyePoints = [landmarks[33], landmarks[160], landmarks[159], landmarks[158], landmarks[133], landmarks[144], landmarks[145], landmarks[153]];
      const rightEyeAspectRatio = this.get4PointsAspectRatio(rightEyePoints);
      return (leftEyeAspectRatio + rightEyeAspectRatio) / 2;
    },
    mouthAspectRatio(landmarks) {
      const mouthPoints = [landmarks[61], landmarks[81], landmarks[13], landmarks[311], landmarks[291], landmarks[178], landmarks[14], landmarks[402]];
      return this.get4PointsAspectRatio(mouthPoints);
    },
    getPoint5(landmarks) {
      const point5 = [];
      point5.push(landmarks[468]);
      point5.push(landmarks[473]);
      point5.push(landmarks[4]);
      point5.push(landmarks[61]);
      point5.push(landmarks[291]);
      return point5;
    },
    getPoint5Angle(points) {
      const LMx = [];
      const LMy = [];
      for (let index = 0; index < points.length; index++) {
        LMx.push(points[index][0]);
        LMy.push(points[index][1]);
      }

      const dPx_eyes = Math.max((LMx[1] - LMx[0]), 1.0);
      const dPy_eyes = LMy[1] - LMy[0];
      const angle = Math.atan(dPy_eyes / dPx_eyes);

      const alpha = Math.cos(angle);
      const beta = Math.sin(angle);

      const LMRx = [];
      const LMRy = [];
      for (let index = 0; index < points.length; index++) {
        LMRx.push(alpha * LMx[index] + beta * LMy[index] + (1 - alpha) * LMx[2] / 2 - beta * LMy[2] / 2);
        LMRy.push(-beta * LMx[index] + alpha * LMy[index] + beta * LMx[2] / 2 + (1 - alpha) * LMy[2] / 2);
      }

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
    },
    captureStatus() {
      window.requestAnimationFrame(this.forward);
    },
    forward() {
      let faceMeshInfer = null;
      if (!this.videoElement.paused && this.videoElement.currentTime !== this.elapsed_time) {
        this.elapsed_time = this.videoElement.currentTime;
        faceMeshInfer = this.faceMesh.send({image: this.videoElement});
      }
      if (faceMeshInfer) {
        faceMeshInfer.then(this.captureStatus);
      } else {
        this.captureStatus();
      }
    }
  },
  mounted() {
    this.videoElement = this.$refs.video;
    this.canvasElement = this.$refs.canvas;
    this.canvasCtx = this.canvasElement.getContext("2d");

    this.initFaceMesh();
    this.startInference();
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
  zoom: 1.2;
}
</style>
