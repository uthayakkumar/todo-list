

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faCheckCircle, faPaperclip, faPencil, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/index.css';
import store from './store';


/* add icons to the library */
library.add(faPaperclip,faCalendarAlt, faPencil,faSave,faTrashCan,faCheckCircle)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
