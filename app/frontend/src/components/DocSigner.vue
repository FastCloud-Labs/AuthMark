<template>
  <h1 class="text-center mt-8 mb-4">Document Signer</h1>
  <div v-if="currentPdf">
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="text.firstname"
              label="First name"
              hide-details
              @input="setInitials"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="text.lastname"
              label="Last name"
              hide-details
              @input="setInitials"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="text.initals"
              label="Initials"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-date-input label="Date input" v-model="text.date"></v-date-input>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="text.additional"
              label="Additional Text"
              hide-details
              size="small"
              prepend-icon="mdi-format-text"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-file-input
              v-model="loadSig"
              label="Signature"
              hide-details
              prepend-icon="mdi-draw"
            >
            </v-file-input>
          </v-col>


        </v-row>

        <p class="text-center text-sm pa-2 ma-2" v-if="text.firstname || image || text.initals">
          <v-icon icon="mdi-arrow-down-left"></v-icon>
          Drag & Drop details onto document
          <v-icon icon="mdi-arrow-down-right"></v-icon>
        </p>
        <v-row>
          <v-col cols="2">
          </v-col>
          <v-col cols="5">
            <v-chip-group
              selected-class="text-primary"
              column
            >
              <v-chip
                v-if="text.fullName"
                class="font-mono text-sm my-5 bg-code-bg-color p-2 rounded-md cursor-move"
                :draggable="true"
                @dragstart="dragText"
              >
                {{ text.fullName }}
              </v-chip>
              <v-chip
                v-if="text.initals"
                class="font-mono text-sm my-5 bg-code-bg-color p-2 rounded-md cursor-move"
                :draggable="true"
                @dragstart="dragText"
              >
                {{ text.initals }}
              </v-chip>
              <v-chip
                v-if="text.date && text.firstname"
                class="font-mono text-sm my-5 bg-code-bg-color p-2 rounded-md cursor-move"
                :draggable="true"
                @dragstart="dragText"
              >
                {{ formatedDate }}
              </v-chip>
              <v-chip
                v-if="text.additional"
                class="font-mono text-sm my-5 bg-code-bg-color p-2 rounded-md cursor-move"
                :draggable="true"
                @dragstart="dragText"
              >
                {{ text.additional }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col>
            <div v-if="image" class="border rounded-lg cursor-move pa-2">
              <v-img
                crossorigin="anonymous"
                :src="image"
                alt="Signature image"
                class="rounded-lg cursor-move bg-white"
                @dragstart="dragImage"
                max-height="45"
              />
            </div>
          </v-col>
          <v-col col="2">
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div
      class=" fill-height mx-auto text-center"
      max-width="1000">

      <PdfCanvas
        :file="currentPdf"
        ref="pdfCanvasRef"
        canvas-id="drop"
        :drop-image-options="{ scaleX: 1.8, scaleY: 1.8 }"
        :drop-text-options="{ fontSize: 20 }"
        is-drop
        :fileScale="zoom"
        :page="page"
      />

      <v-pagination v-model="page" :length="currentPdf.pages" class="mt-2"></v-pagination>
      <v-slider
        v-model="zoom"
        :max="10"
        :min="1"
        :step="0.5"
        append-icon="mdi-magnify-plus-outline"
        prepend-icon="mdi-magnify-minus-outline"
        @click:append="zoomIn"
        @click:prepend="zoomOut"
        thumb-label
        width="30%"
        class="text-center mx-auto"
      ></v-slider>
      <v-btn @click="addWaterMark" color="success" size="large">Save</v-btn>

    </div>

  </div>
  <div v-else>

    <v-file-input label="Select a PDF file or image." accept="application/pdf, .jpg, .png"
                  @change="uploadFile">Upload
    </v-file-input>
  </div>
  <img id="imageWB" :src="watermark" crossorigin="anonymous" hidden>
</template>


<script lang="ts">
import PdfCanvas, {type PDF, useFabric} from '@component-hook/pdf-canvas';
import {VDateInput} from 'vuetify/labs/VDateInput'
import {jsPDF} from "jspdf";

const {loadFile} = useFabric();
const currentPdfO = ref<PDF>();


export default {
  components: {
    PdfCanvas,
    VDateInput
  },
  data() {
    return {
      currentPdf: currentPdfO,
      pdfCanvasRef: '',

      text: {
        firstname: '',
        lastname: '',
        fullName: '',
        initals: '',
        additional: '',
        date: new Date()
      },
      loadSig: '',
      page: 1,
      zoom: 3,
      docHeight: 1200,
      docWidth: 1200,
      image: '',
      watermark: 'https://authmark.org/favicon-32x32.png', // todo replace with dynacmic generated watermark
      watermarkSize: 32,
      watermarkBase64: ''
    }
  },
  watch: {
    loadSig(value) {
      console.log("value", value)
      let fr = new FileReader()
      self = this;
      fr.addEventListener("load", function (e) {
        self.image = e.target.result;
      });
      fr.readAsDataURL(value)
    },

  },
  computed: {
    formatedDate() {
      return this.text.date.toDateString();
    }
  },
  mounted() {
    this.getBase64Image(document.getElementById("imageWB"))
  },
  methods: {
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      this.watermarkBase64 = dataURL
    },
    async uploadFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const {files} = target;

      if (!files) return;
      const file = files[0];
      const content = await loadFile(file);


      this.currentPdf = content;
      target.value = '';
    },

    dragImage(event: DragEvent) {
      const target = event.target as HTMLImageElement;

      event.dataTransfer?.setData('image', target.src);
    },

    dragText(event: DragEvent) {
      const target = event.target as HTMLParagraphElement;

      event.dataTransfer?.setData('text', target.innerText);
    },
    setInitials() {
      console.log('set initials')
      if (this.text.firstname && this.text.lastname) {
        this.text.initals = this.text.firstname[0] + "." + this.text.lastname[0];
        this.text.fullName = this.text.firstname + " " + this.text.lastname;
      } else if (this.text.firstname) {
        this.text.fullName = this.text.firstname;
      }
    },
    zoomOut() {
      this.zoom = (this.zoom - 0.5) || 3
    },
    zoomIn() {
      this.zoom = (this.zoom + 0.5) || 3
    },
    async addWaterMark() {
      this.pdfCanvasRef = this.$refs.pdfCanvasRef;
      console.log(this.watermarkBase64)
      this.pdfCanvasRef.addImage(this.watermarkBase64, {
        top: 0,
        left: 0,
        opacity: 0.5,
        hasControls: false,
        hasBorders: false,
        selectable: false,
        crossOrigin: 'Anonymous'
      });
      let verCount = this.watermarkSize / 1.5;
      let horCount = this.watermarkSize / 1.5;
      let count = 0;
      for (var i = 0; i < verCount; i++) {
        for (var j = 0; j < horCount; j++) {
          //iterates through a box around each cell
          for (var k = i - 1; k < verCount && k <= i + 1; k++) {
            for (var l = j - 1; l < horCount && l <= j + 1; l++) {
              count = count++
              this.pdfCanvasRef.addImage(this.watermarkBase64, {
                top: (this.watermarkSize + this.watermarkSize) * k,
                left: (this.watermarkSize + this.watermarkSize) * l,
                opacity: 0.005,
                hasControls: false,
                hasBorders: false,
                selectable: false,
                crossOrigin: 'Anonymous'
              });
            }
          }
        }
      }
      console.log('total watermarks:', count)
      await this.download()
    },

    async download() {
      console.log('start download')
      let lastZoom = this.zoom;
      this.zoom = 1;
      // only jpeg is supported by jsPDF
      var imgData = this.pdfCanvasRef.canvasRef.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF();

      pdf.addImage(imgData, 'JPEG', 0, 0);
      await pdf.save("download.pdf");
      this.zoom = lastZoom;
    }
  }
};
</script>
<style>
.canvas-container {
  position: relative;
  display: block;
  margin: auto;
}
</style>
