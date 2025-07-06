// import { themeScreens } from '@tech-labs/config-tailwind'
import { watch, reactive, readonly } from 'vue'
const themeScreens = {}

const parsedScreens = Object.keys(themeScreens).reduce((screensCarry, screen) => {
  return {
    ...screensCarry,
    [screen]: parseInt(themeScreens[screen]),
  }
}, {})

const screensState = reactive({
  isSmall: false,
  isLarge: false,
})

export default () => {
  const init = () => {
    window.addEventListener('resize', _handleWindowResize)

    _handleWindowResize()
  }

  const _handleWindowResize = () => {
    screensState.isSmall = window.innerWidth < parsedScreens.lg
    screensState.isLarge = window.innerWidth >= parsedScreens.lg
  }

  const onBreakpointChange = (callback) => {
    watch(() => screensState.isSmall, () => {
      callback()
    })
  }

  return {
    init,
    onBreakpointChange,
    screensState: readonly(screensState),
  }
}
