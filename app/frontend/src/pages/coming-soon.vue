<template>

  <v-container class="fill-height main">
    <v-responsive
      class=" fill-height mx-auto"
      max-width="1000"
    >
      <comingSoon></comingSoon>
    </v-responsive>
  </v-container>


</template>

<script>
import ComingSoon from '@/components/ComingSoonForm.vue'

export default {
  components: {
    ComingSoon
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
