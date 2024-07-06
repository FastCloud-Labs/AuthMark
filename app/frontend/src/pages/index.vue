<template>

  <CustomParticles/>
  <div class="main-cover">
    <Landing/>
  </div>

</template>


<script lang="ts" setup>
//
import Landing from "@/components/Landing.vue";
import CustomParticles from "@/components/Particles.vue";
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
