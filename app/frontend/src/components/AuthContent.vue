<template>
  <div class="pa-1 mt-8">
    <h2 class="ma-6 mb-12">Choose a file or media type</h2>
    <v-row v-if="!showUpload">
      <v-col class="border">
        <v-icon icon="mdi-video" size="x-large"></v-icon>
        <br>
        <v-btn @click="showUpload=true" color="primary" class="ma-3"> Video</v-btn>
      </v-col>
      <v-col class="border">
        <v-icon icon="mdi-music" size="x-large"></v-icon>
        <v-btn @click="showUpload=true" color="primary" class="ma-3"> Video</v-btn>
      </v-col>
      <v-col class="border">
        <v-icon icon="mdi-play-network" size="x-large"></v-icon>
        <br>
        <v-btn href="/chrome-extension" color="primary" class="ma-3"> Video Call/Live Streams</v-btn>

      </v-col>
      <v-col class="border">
        <v-icon icon="mdi-phone" size="x-large"></v-icon>
        <br>
        <v-btn href="/chrome-extension" color="primary" class="ma-3"> Audio Call</v-btn>

      </v-col>
    </v-row>
    <v-row v-if="!showUpload">

      <v-col class="border">
        <v-icon icon="mdi-image" size="x-large"></v-icon>
        <br>
        <v-btn @click="showUpload=true" color="primary" class="ma-3"> Images</v-btn>
      </v-col>
      <v-col class="border">
        <v-icon icon="mdi-file-pdf-box" size="x-large"></v-icon>
        <br>
        <v-btn @click="showUpload=true" color="primary" class="ma-3"> PDF/Documents</v-btn>
      </v-col>
      <v-col class="border">
        <v-icon icon="mdi-file" size="x-large"></v-icon>
        <br>
        <v-btn @click="showUpload=true" color="primary" class="ma-3"> Other</v-btn>

      </v-col>

    </v-row>
    <v-file-input v-if="showUpload" @change="prepFiles" label="File input"></v-file-input>

    <v-progress-linear v-if="processing" model-value="20" color="primary" height="20" striped></v-progress-linear>


    <div v-if="fileReady">
      <v-btn href="/doc.png" target="_blank" color="primary" class="ma-3"> Download</v-btn>
      <v-btn href="/doc-scanner.png" target="_blank" color="primary" class="ma-3"> View FingerPrints</v-btn>
      <v-btn disabled class="ma-3"> Upload to CDN /IPFS (coming soon)</v-btn>
    </div>
  </div>
</template>
<script>


export default {
  name: 'upload',
  data() {
    return {
      showUpload: false,
      fileUploaded: false,
      fileReady: false,
      processing: false
    }
  },
  methods: {
    showUploadM() {
      this.showUpload = true
    },
    prepFiles() {
      this.processing = true

      setTimeout(() => {
        this.fileReady = true
        this.processing = false
      }, 5000);

    }

  }
}
</script>
