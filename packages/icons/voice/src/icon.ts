import { ElIcon } from 'element-plus'
import { h } from 'vue'
import Core from './index.vue'

const Icon = function (props) {
  return h(ElIcon, props, () => h(Core))
}

export default Icon as typeof ElIcon
