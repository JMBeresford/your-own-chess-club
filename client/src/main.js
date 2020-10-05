import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-chessboard/dist/vue-chessboard.css'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
