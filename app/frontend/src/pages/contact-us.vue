<template>

  <v-container class="fill-height main">
    <v-responsive
      class=" fill-height mx-auto"
      max-width="1000"
    >

        <h1 class="text-center mt-8">Contact AuthMark</h1>
        <!-- modify this form HTML and place wherever you want your form -->
      <v-sheet color="default" class="pa-8 mx-8 mt-5 border-lg bg-shades-transparent">
        <v-form
          action="https://formspree.io/f/xldrdzbq"
          method="POST"
        >
          <v-label>
            Your email:
            <v-text-field type="email" name="email" width="400" single-line/>
          </v-label>
          <br>
          <label>
            Your message:
            <v-textarea name="message"></v-textarea>
          </label>
          <!-- your other form fields go here -->
          <v-btn type="submit">Send</v-btn>
        </v-form>
      </v-sheet>
    </v-responsive>
  </v-container>


</template>


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
