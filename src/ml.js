import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import pt from './assets/dictionaries/pt'
import en from './assets/dictionaries/en'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'portuguese',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create(en),
    new MLanguage('portuguese').create(pt),
  ]
})