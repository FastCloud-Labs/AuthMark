<template>
  <h1 class="text-center mt-8">Coming Soon</h1>

  <!-- modify this form HTML and place wherever you want your form -->
  <v-sheet color="default" class="pa-8 mx-8 mt-5 border-lg bg-shades-transparent">
    <h3>Request early access:</h3>
    <v-form
      class="ma-2 mt-4"
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
      <v-btn type="submit" color="info">Send</v-btn>
    </v-form>
  </v-sheet>
</template>
