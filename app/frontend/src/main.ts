/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'
import Particles from "vue3-particles";

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(Particles).mount('#app')
