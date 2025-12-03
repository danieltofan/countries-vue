import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Create a basic router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Dashboard</div>' } },
    { path: '/compare', component: { template: '<div>Compare</div>' } },
    { path: '/quiz', component: { template: '<div>Quiz</div>' } }
  ]
})

describe('App.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
  })

  it('renders without crashing', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.exists()).toBe(true)
  })

  it('displays FlagFinder branding', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('FlagFinder')
  })

  it('has navigation links', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Explore')
    expect(wrapper.text()).toContain('Compare')
    expect(wrapper.text()).toContain('Quiz')
  })

  it('has dark mode toggle button', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const toggleButton = wrapper.find('button[aria-label]')
    expect(toggleButton.exists()).toBe(true)
  })

  it('toggles dark mode off on button click (dark is default)', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()

    // Dark mode is default, so button should say "Switch to light mode"
    const toggleButton = wrapper.find('button[aria-label="Switch to light mode"]')
    await toggleButton.trigger('click')

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', false)
  })

  it('defaults to dark mode when localStorage is empty', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('respects light mode preference from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('false')
    document.documentElement.classList.add('dark') // Start with dark

    mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('has footer with attribution', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('REST Countries API')
    expect(wrapper.text()).toContain('Vue 3')
  })

  it('has RouterView for page content', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })
})
