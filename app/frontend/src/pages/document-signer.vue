<template>

  <v-container class="fill-height main">
    <v-responsive
      class=" fill-height mx-auto"
      max-width="1000"
    >
      <DocumentSigner/>
    </v-responsive>
  </v-container>


</template>

<script>
import DocumentSigner from '@/components/DocSigner.vue'

export default {
  components: {
    DocumentSigner
  }
}
</script>
<style>
.main-cover {
  background: url('/bg.png');
  z-index: 99999 !important;
  height: 100%;
  position: relative;
  margin-top: -25px;
}
</style>
<script setup lang="ts">
</script>
