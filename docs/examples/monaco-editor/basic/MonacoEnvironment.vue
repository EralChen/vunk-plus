<script lang="ts">
import { defineComponent } from 'vue'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
export default defineComponent({
  setup (_, { slots }) {
    /**
     * @description for warning:  
     * You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker？
     */
    self.MonacoEnvironment = {
      getWorker (_: string, label: string) {
        if (label === 'json') {
          return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new tsWorker()
        }
        return new EditorWorker()
      },
    }
    return () => slots.default?.()
  },
})
</script>
