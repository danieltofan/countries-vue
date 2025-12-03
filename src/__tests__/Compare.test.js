import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Compare from '../views/Compare.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/compare', component: Compare }
  ]
})

describe('Compare.vue', () => {
  it('renders the main heading', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Compare Countries')
  })

  it('has two country selection dropdowns', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(2)
  })

  it('has swap button', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const swapButton = wrapper.find('button[title="Swap countries"]')
    expect(swapButton.exists()).toBe(true)
  })

  it('has random button', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const randomButton = wrapper.find('button[title="Random countries"]')
    expect(randomButton.exists()).toBe(true)
  })

  it('shows empty state when no countries selected', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Select two countries')
  })

  it('shows comparison when both countries selected', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const [select1, select2] = wrapper.findAll('select')
    await select1.setValue('USA')
    await select2.setValue('CAN')

    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('Canada')
    expect(wrapper.text()).toContain('Population')
    expect(wrapper.text()).toContain('Area')
  })

  it('shows flags when countries selected', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const [select1, select2] = wrapper.findAll('select')
    await select1.setValue('USA')
    await select2.setValue('CAN')

    const imgs = wrapper.findAll('img')
    expect(imgs.length).toBe(2)
  })

  it('shows comparison metrics table', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const [select1, select2] = wrapper.findAll('select')
    await select1.setValue('USA')
    await select2.setValue('CAN')

    expect(wrapper.text()).toContain('Timezones')
    expect(wrapper.text()).toContain('Languages')
    expect(wrapper.text()).toContain('Border Countries')
  })

  it('swaps countries when swap button clicked', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const [select1, select2] = wrapper.findAll('select')
    await select1.setValue('USA')
    await select2.setValue('CAN')

    const swapButton = wrapper.find('button[title="Swap countries"]')
    await swapButton.trigger('click')

    expect(select1.element.value).toBe('CAN')
    expect(select2.element.value).toBe('USA')
  })

  it('selects random countries when random button clicked', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const randomButton = wrapper.find('button[title="Random countries"]')
    await randomButton.trigger('click')

    const [select1, select2] = wrapper.findAll('select')
    expect(select1.element.value).not.toBe('')
    expect(select2.element.value).not.toBe('')
    expect(select1.element.value).not.toBe(select2.element.value)
  })

  it('shows additional country info cards', async () => {
    const wrapper = mount(Compare, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const [select1, select2] = wrapper.findAll('select')
    await select1.setValue('USA')
    await select2.setValue('GBR')

    expect(wrapper.text()).toContain('Capital')
    expect(wrapper.text()).toContain('Languages')
    expect(wrapper.text()).toContain('Currencies')
  })
})
