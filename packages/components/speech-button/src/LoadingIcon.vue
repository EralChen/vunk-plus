<script lang="tsx">
import { defineComponent } from 'vue'

const SIZE = 1000
const STROKE_WIDTH = 50
const CIRCLE_RADIUS = 200

export default defineComponent({
  name: 'AXSenderLoadingIcon',
  setup () {
    return () => {
      return (
        <svg
          color="currentColor"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>Speech Loading</title>

          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="currentColor"
            stroke-width={STROKE_WIDTH}
            stroke-linecap="round"
            stroke-dasharray={`${Math.PI * CIRCLE_RADIUS * 0.75} ${Math.PI * CIRCLE_RADIUS * 0.25}`}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${SIZE / 2} ${SIZE / 2}`}
              to={`360 ${SIZE / 2} ${SIZE / 2}`}
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      )
    }
  },
})
</script>
