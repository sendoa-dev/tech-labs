import { reactive } from 'vue'

export const IconModules = import.meta.glob('../../../static-assets/icons/*.svg', { eager: true })
const iconsState = reactive({
  iconsLibrary: [],
  isInitialized: false,
})

const setIsInitialized = (isInitialized) => { iconsState.isInitialized = isInitialized }
export const getIsInitialized = () => iconsState.isInitialized

export const getIconsLibrary = () => iconsState.iconsLibrary

export const bootstrap = () => {
  if (!getIsInitialized()) {
    try {
      for (const path in IconModules) {
        const pathName = path.split('../../../static-assets/icons/')[1].replace('.svg', '')

        iconsState.iconsLibrary[pathName] = IconModules[path].render
      }

      setIsInitialized(true)
    } catch (e) {}
  }
}
