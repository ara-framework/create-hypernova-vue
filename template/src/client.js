import { renderVue, Vue } from 'hypernova-vue'
import Example from './components/Example.vue'

renderVue('Example', Vue.extend(Example))
