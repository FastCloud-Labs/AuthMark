<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar app class="fixed" fixed>
      <v-img
        class="mx-2 ml-2 pa-1 ma-1"
        src="@/assets/logo-hor.png"
        max-height="60"
        max-width="200"
        contain
      ></v-img>
      <div class="ml-12">Demos & PoC</div>
      <template v-slot:append>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              size="large"
            >
              <v-icon icon="mdi-cog" size="large" color="white"></v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menu"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list class="menu">
        <v-list-item @click="showPOLM">
          <v-icon icon="mdi-account-check-outline"></v-icon>
          Proof of Life Certificate
        </v-list-item>
        <v-list-item @click="showAuthContentM">
          <v-icon icon="mdi-account-key-outline"></v-icon>
          Create Proof of Authenticity
        </v-list-item>
        <v-list-item @click="showPOL = true">
          <v-icon icon="mdi-text-shadow"></v-icon>
          Secure Font
        </v-list-item>
        <v-list-item @click="showPOL = true">
          <v-icon icon="mdi-lock-check"></v-icon>
          Verify Authenticity
        </v-list-item>
        <v-list-item @click="showDePoAPM">
          <v-icon icon="mdi-shield-lock-outline"></v-icon>
          Authenticity Protocol <small>(DePoAP)</small>
        </v-list-item>

        <v-list-item @click="showPOL = true">
          <v-icon icon="mdi-google-chrome"></v-icon>
          Chrome Extension
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center ma-4 pt-12 mt-12" style="min-height: 820px; height: 100%">

      <div v-if="start" class="default mt-12 pt-12">
        <div class="hero">
          <v-img src="@/assets/hero-2.png"></v-img>
        </div>
        <br>
        <div class="text-center">
          <v-btn @click="showPOLM" color="primary">Let's get started</v-btn>
        </div>

      </div>
      <div v-if="showPOL" class="text-center">
        <h2>Proof of life test</h2>
        <ProofOfLife/>
        <br>
      </div>
      <div v-if="showAuthContent" class="text-center">
        <h2>Authenticate Content</h2>
        <p>AuthMark makes it easy too prove authenticity and protect against unauthorised distribution.</p>
        <a href="/how-it-works">How it works</a>
        <div class="text-center ma-6">
          <v-img :width="300"
                 aspect-ratio="16/9"
                 class="rounded-lg text-center" src="@/assets/auth-content.jpeg"></v-img>
        </div>
        <AuthContent/>
        <br>
      </div>
      <div v-if="showDePoAP" class="text-center">
        <h2>DePoAP</h2>
        <DePoAP/>
        <br>
      </div>
    </v-main>
  </v-layout>
</template>


<script>

export default {
  data() {
    return {
      start: true,
      showPOL: false,
      showAuthContent: false,
      showDePoAP: false,
      menu: [
        {title: 'Profile'},
        {title: 'Settings'},
        {title: 'Logout'},
      ],
    }
  },
  methods: {
    closeAll() {
      this.start = false;
      this.showPOL = false;
      this.showAuthContent = false;
    },
    showPOLM() {
      this.closeAll()
      this.showPOL = true;
    },
    showAuthContentM() {
      this.closeAll()
      this.showAuthContent = true;
    },
    showDePoAPM() {
      this.closeAll()
      this.showDePoAP = true;
    },
  },
};
</script>

<style>
header.v-toolbar.v-app-bar, .v-footer {
  background: rgb(0 50 100);
}

.v-navigation-drawer__content {
  background: rgb(0 50 100);
  border-color: #0e59a3;
}

nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active.v-theme--dark {
  border-right: 1px solid #21528a !important;
}

.v-footer {
  border-top: 1px solid #21528a !important;
}

.v-list-item__content {
  grid-area: auto !important;
}

.hero {
  width: 280px;

}

nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active.v-theme--dark {
  width: 277px !important;
}

a {
  color: #fff;
}

.v-responsive.v-img.rounded-lg.text-center {
  margin: auto;
}

</style>

