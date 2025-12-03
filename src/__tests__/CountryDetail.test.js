import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import CountryDetail from '../views/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/country/:code', name: 'CountryDetail', component: CountryDetail, props: true }
  ]
})

describe('CountryDetail.vue', () => {
  it('renders country details for valid code', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('Washington, D.C.')
  })

  it('displays flag image', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('flagcdn.com')
  })

  it('shows population and area', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Population')
    expect(wrapper.text()).toContain('Area')
  })

  it('shows languages', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'CAN' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('English')
    expect(wrapper.text()).toContain('French')
  })

  it('shows currencies', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'GBR' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('British pound')
    expect(wrapper.text()).toContain('£')
  })

  it('shows border countries', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Border Countries')
    expect(wrapper.text()).toContain('Canada')
    expect(wrapper.text()).toContain('Mexico')
  })

  it('shows island nation message for countries without borders', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'JPN' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('no land borders')
  })

  it('has back button', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    const backButton = wrapper.findAll('button').find(b => b.text().includes('Back'))
    expect(backButton).toBeDefined()
  })

  it('shows not found for invalid country code', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'INVALID' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Country Not Found')
    expect(wrapper.text()).toContain('Return to Dashboard')
  })

  it('shows region and subregion', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'DEU' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Europe')
    expect(wrapper.text()).toContain('Western Europe')
  })

  it('shows population density stat', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'USA' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Pop/km²')
  })

  it('shows landlocked status', async () => {
    const wrapper = mount(CountryDetail, {
      props: { code: 'CHE' },
      global: { plugins: [router] }
    })
    await router.isReady()

    expect(wrapper.text()).toContain('Landlocked')
    expect(wrapper.text()).toContain('Yes')
  })
})
