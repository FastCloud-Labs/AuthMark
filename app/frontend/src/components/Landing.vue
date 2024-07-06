<template>
  <div class="verify">
    <v-btn-group>
      <v-btn href="/demos" variant="outlined" elevation="8" class="bg-black ma-2" router="/demos">Demo</v-btn>
      <v-btn href="/verify" variant="outlined" elevation="8" class="bg-black ma-2">Verify</v-btn>
    </v-btn-group>
  </div>
  <v-container class="fill-height main">
    <v-responsive
      class=" fill-height mx-auto"
      max-width="1000"
    >
      <v-img
        class="mb-2 mt-2"
        height="180"
        src="@/assets/logo.png"
      />

      <div id="cover">
        <div class="py-2"/>
        <h2 class="text-center">Cybercrime will cost $10.5 trillion globally by the end of 2025<br> We protect
          individuals and businesses against A.I scams and crimes</h2>
        <div class="py-2"/>
        <v-divider class="py-3"/>
        <h2 class="text-center">Decentralized Proof of Life and Proof of Authenticity Protocol (dePoAP)
          to protecting against malicious AI (Deepfakes, voice cloning, disinformation)</h2>
        <div class="py-3"/>
        <v-row>

          <v-col cols="6">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-video-check"
              rounded="lg"
              subtitle="Protect against deep fakes and synthetic media scams"
              title="Deep Fakes & Voice Cloning"
              variant="text"
            >

            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-file-check"
              rounded="lg"
              subtitle="Prevent document fraud & forgery, track & identity leaks"
              target="_blank"
              title="Document Fraud"
              variant="text"
            >
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card
              class="py-4 border"
              prepend-icon="mdi-check-decagram"
              color="surface-variant"
              rounded="lg"
              subtitle="Verifiable authenticity & protection against misinformation"
              target="_blank"
              title="Authenticity Verification"
              variant="text"
            >
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-account-lock"
              rounded="lg"
              subtitle="Protection against identify theft & AI cloning"
              title="Identity Theft Protection"
              variant="text"
            >

            </v-card>
          </v-col>

        </v-row>

        <v-row class="users">
          <v-col cols="12">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-security"
              rounded="lg"
              variant="outlined"
            >
              <template #image>
                <v-img position="top right"/>
              </template>

              <template #title>
                <h2 class="text-h5 font-weight-bold">Protection for all your media & communication:
                </h2>
              </template>

              <template #subtitle>
                <div class="text-subtitle-1">
                  Video calls, audio calls,
                  social media posts, images, documents, PDFs, screeenshots & more
                </div>
              </template>

              <div class="text-center">

                <v-btn color="primary" class="mr-2" href="/demos">Demo</v-btn>
                <v-btn color="default" variant="outlined" class="ml-2" href="/how-it-works">How it works</v-btn>
              </div>
              <v-img
                class="img-r"
                height="100"
                src="@/assets/shield1.png"></v-img>

            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-briefcase-outline"
              rounded="lg"
              title="For Businesses"
              variant="text"
            >

              <div class="text-center">
                <v-btn size="small" @click="demo" variant="outlined">Schedule a demo</v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-account-star-outline"
              rounded="lg"
              title="For Public Figures"
              variant="text"
            >
              <div class="text-center">
                <v-btn size="small" @click="demo" variant="outlined">Schedule a demo</v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="py-4 border"
              color="surface-variant"
              prepend-icon="mdi-account-check-outline"
              rounded="lg"
              title="For Individuals"
              variant="text"
            >
              <div class="text-center">
                <v-btn size="small" @click="demo" variant="outlined">Schedule a demo</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

      </div>


      <v-row>
        <v-col cols="12">
          <v-divider class="pt-4 mt-2"/>
          <h3 class="px-4">News:</h3>
          <v-sheet
            class="mx-auto bg-transparent"
          >

            <v-slide-group
              v-model="cases"
              show-arrows
            >
              <v-slide-group-item
                v-for="(c, index) in cases"
                :key="index"
              >
                <v-card
                  :class="['ma-4']"
                  color="darken-2 border"
                  height="180"
                  width="260"
                  show-arrows
                >
                  <div class="d-flex align-center justify-center">
                    <p class="ma-4">
                      {{ c.text }}
                      <a :href="c.link" target="_blank">Read more</a>
                    </p>
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import CustomParticles from "@/components/Particles.vue";

export default {
  name: 'landingpage',
  components: {CustomParticles},
  data() {
    return {
      cases: [
        {
          'text': 'Deepfake fraudulent identity verification attempts have surged by 3,000% over the past year, pointing to an emerging threat as new ways of financial scams emerge.',
          'link': 'https://www.euronews.com/business/2024/04/10/its-a-scam-how-deepfakes-and-voice-cloning-taps-into-your-cash#:~:text=A%20recent%20deepfake%20video%20call,ways%20of%20financial%20scams%20emerge.'
        },
        {
          'text': 'Experts predict a $2 billion (€1.4 billion) annual rise in identity fraud through generative AI, according to Marketwatch.',
          'link': 'https://www.marketwatch.com/story/ai-identity-fraud-could-cost-2-billion-a-year-11647216000'
        },
        {
          'text': '77% of AI voice scam victims lost money.',
          'link': 'https://www.mcafee.com/it-it/consumer-corporate/newsroom/press-releases/press-release.html?news_id=5aa0d525-c1ae-4b1e-a1b7-dc499410c5a1'
        },
        {
          'text': 'More than half (53%) of all adults share their voice at least once a week online or on social media.',
          'link': 'https://www.mcafee.com/it-it/consumer-corporate/newsroom/press-releases/press-release.html?news_id=5aa0d525-c1ae-4b1e-a1b7-dc499410c5a1'
        },
        {
          'text': 'Finance worker pays out $25 million after video call with deepfake "chief financial officer".',
          'link': 'https://edition.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html'
        },
        {
          'text': '66 percent of SMBs had at least one cyber incident in the past two years, according to Mastercard.',
          'link': 'https://cybersecurityventures.com/hackerpocalypse-cybercrime-report-2016/'
        },
        {
          'text': 'Americans believe that 61% of social media news stories are inaccurate, which is alarming considering many Americans depend on these channels for daily news consumption.',
          'link': 'https://www.enterpriseappstoday.com/stats/fake-news-statistics.html#How_Often_Do_You_See_Fake_News'
        },

        {
          'text': 'The first quarter of 2024 saw a 217% rise in crypto deepfake scams, with $6.3 billion in losses, projected to reach $10 billion per quarter by 2025.',
          'link': 'https://readwrite.com/projected-2024-deepfake-scam-crypto-losses-exceed-25b-bitget/#:~:text=The%20most%20common%20deepfake%2Drelated,in%20the%20past%20two%20years.&text=Fraudsters%20often%20impersonate%20influential%20figures,of%20credibility%20and%20attract%20investments.'
        },
        {
          'text': 'Data breaches are on the rise, with more than 80% of breaches caused by weak, reused, or stolen passwords.',
          'link': 'https://www.lastpass.com/company/about-us#:~:text=About%20LastPass&text=Data%20breaches%20are%20on%20the,critical%20for%20individuals%20and%20businesses.'
        },

      ]
    }
  },
  methods: {
    demo() {
      alert('demo')
    }
  },
}
</script>
<style>
#cover {
  background: #121a3799;
  border-radius: 8px;
  padding: 0 25px;
}

.v-responsive.v-img.img-r {
  /* display: block; */
  float: right;
  /* z-index: 9999999; */
  padding: 58px 112px 0px 60px;
  margin-top: -93px;
}

a {
  color: #fff;
}

.v-slide-group__content {
  font-style: italic;
}

.v-sheet.v-theme--dark.elevation-8.mx-auto {
  background: #222222b3 !important;
}

v-card.v-theme--dark {
  background: #072949;
  color: #e3dada;
}

.v-card.v-theme--dark.text-surface-variant.v-card--density-default.rounded-lg.v-card--variant-text.py-4.border {
  background: #093a6a;
  color: #e3dada;
}

.v-card-item .v-card-subtitle {
  padding: 0 0 0.25rem;
  color: #ffffff;
  font-size: 15px;
}

.v-card-item .v-card-title {
  padding: 0;
  color: #e3dada;
}

.verify {
  position: absolute;
  width: 190px;
  right: 20px;
}

.v-container.v-locale--is-ltr.fill-height.main {
  margin-top: 24px;
}

.v-card.v-theme--dark.bg-darken-2.border.v-card--density-default.v-card--variant-elevated.ma-4 {
  background: #121a3799;
}

footer.v-footer.v-theme--dark {
  background: #0c1944;
  color: #fff !important;
  border-top: 1px dashed #0e59a3;
}

button.v-btn.v-theme--dark.text-default, button.v-btn.v-theme--dark.v-btn--density-default.v-btn--size-small.v-btn--variant-outlined {
  color: #ffffff;
  border-color: #ffffff;
}

.v-card--variant-outlined {
  border: thin solid currentColor;
  border-color: #e3dada !important;
}

.text-caption.text-disabled {
  color: #e3dada !important;
}

.users .v-card-subtitle {
  font-size: 12px !important;
}

.v-icon--size-default {
  color: #e3dada;
}
</style>
