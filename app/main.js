import Vue from 'nativescript-vue'
import App from './components/App'
import RadAutoCompletePlugin from 'nativescript-ui-autocomplete/vue';
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.use(RadAutoCompletePlugin);

new Vue({
  render: h => h('frame', [h(App)])
}).$start()

