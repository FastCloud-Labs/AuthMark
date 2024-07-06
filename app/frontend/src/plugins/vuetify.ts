/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      options: {
        customProperties: true,
      },
      dark: {
        dark: true,
        variables: {}, // ✅ this property is required to avoid Vuetify crash
        colors: {
          // Workaround: Custom colors seem to erase default colors, so we need to include the default colors (of `light` or `dark` theme)
          background: '#22222285',
        },
      },
    },
  },
})
