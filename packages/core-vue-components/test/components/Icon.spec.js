import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

import * as iconsLoader from '@/Icon/iconsLoader'
import CoreIcon from '@/Icon/index.vue'

const MockIconComponent = {
  template: '<svg><g></g></svg>',
}

vi.mock('@/Icon/iconsLoader.js', () => ({
  bootstrap: vi.fn(),
  getIconsLibrary: vi.fn(),
  getIsInitialized: vi.fn(),
}))

async function createWrapper (override = {}) {
  const wrapper = mount(CoreIcon, override)
  return {
    wrapper,
    iconContainerSelector: '[data-test="icon-container"]',
    iconComponentSelector: '[data-test="icon-component"]',
  }
}

describe('CoreIcon', () => {
  const mockIconsLibrary = {
    'sample-icon': MockIconComponent,
  }

  beforeEach(async () => {
    iconsLoader.getIconsLibrary.mockReturnValue(mockIconsLibrary)
    iconsLoader.getIsInitialized.mockReturnValue(false)

    await flushPromises()

    iconsLoader.getIsInitialized.mockReturnValue(true)
  })

  afterEach(() => {
    iconsLoader.getIconsLibrary.mockRestore()
    iconsLoader.getIsInitialized.mockRestore()
  })

  test('renders without errors when initialized', async () => {
    const { wrapper } = await createWrapper({
      props: { icon: 'sample-icon' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('applies default classes correctly', async () => {
    const { wrapper, iconContainerSelector } = await createWrapper({
      props: { icon: 'sample-icon' },
    })
    const iconContainer = wrapper.find(iconContainerSelector)
    expect(iconContainer.exists()).toBe(true)
    expect(iconContainer.classes()).toContain('p-0')
  })

  it.each([
    [40, 8, 'p-4', 'w-2', 'h-2'],
    [40, 12, 'p-3.5', 'w-3', 'h-3'],
    [40, 16, 'p-3', 'w-4', 'h-4'],
    [40, 20, 'p-2.5', 'w-5', 'h-5'],
    [40, 24, 'p-2', 'w-6', 'h-6'],
    [40, 28, 'p-1.5', 'w-7', 'h-7'],
    [40, 32, 'p-1', 'w-8', 'h-8'],
    [40, 40, 'p-0', 'w-10', 'h-10'],
    [32, 8, 'p-3', 'w-2', 'h-2'],
    [32, 12, 'p-2.5', 'w-3', 'h-3'],
    [32, 16, 'p-2', 'w-4', 'h-4'],
    [32, 20, 'p-1.5', 'w-5', 'h-5'],
    [32, 24, 'p-1', 'w-6', 'h-6'],
    [32, 28, 'p-0.5', 'w-7', 'h-7'],
    [32, 32, 'p-0', 'w-8', 'h-8'],
    [24, 8, 'p-2', 'w-2', 'h-2'],
    [24, 12, 'p-1.5', 'w-3', 'h-3'],
    [24, 16, 'p-1', 'w-4', 'h-4'],
    [24, 20, 'p-0.5', 'w-5', 'h-5'],
    [24, 24, 'p-0', 'w-6', 'h-6'],
  ])(
    'applies correct padding and size classes for area=%s and size=%s',
    async (area, size, expectedPaddingClass, expectedWidthClass, expectedHeightClass) => {
      const { wrapper, iconContainerSelector, iconComponentSelector } = await createWrapper({
        props: { icon: 'sample-icon', area, size },
      })

      const iconContainer = wrapper.find(iconContainerSelector)
      const iconComponent = wrapper.find(iconComponentSelector)

      expect(iconContainer.exists()).toBe(true)
      expect(iconComponent.exists()).toBe(true)

      expect(iconContainer.classes()).toContain(expectedPaddingClass)
      expect(iconComponent.classes()).toContain(expectedWidthClass)
      expect(iconComponent.classes()).toContain(expectedHeightClass)
    },
  )

  test('does not render if the icon is not found in the library', async () => {
    const { wrapper, iconContainerSelector } = await createWrapper({
      props: { icon: 'unknown-icon' },
    })

    const iconContainer = wrapper.find(iconContainerSelector)
    expect(iconContainer.exists()).toBe(false)
  })

  test('renders icon content correctly when initialized', async () => {
    const { wrapper, iconComponentSelector } = await createWrapper({
      props: { icon: 'sample-icon' },
    })
    const iconComponent = wrapper.find(iconComponentSelector)
    expect(iconComponent.exists()).toBe(true)
    expect(iconComponent.html()).toContain('<g></g>')
  })

  test('calls the bootstrap function on mount', async () => {
    await createWrapper({
      props: { icon: 'sample-icon' },
    })
    expect(iconsLoader.bootstrap).toHaveBeenCalled()
  })
})
