import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import CountryCard from '../components/CountryCard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/country/:code', name: 'CountryDetail', component: { template: '<div>Detail</div>' } }
  ]
})

const mockCountry = {
  name: { common: 'Test Country', official: 'Republic of Test' },
  cca3: 'TST',
  cca2: 'TC',
  capital: ['Test City'],
  region: 'Test Region',
  population: 1000000,
  area: 50000,
  flags: { svg: 'https://example.com/flag.svg', png: 'https://example.com/flag.png' }
}

describe('CountryCard.vue', () => {
  it('renders country name', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Test Country')
  })

  it('displays population', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('1.0M')
  })

  it('displays region', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Test Region')
  })

  it('displays capital', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Test City')
  })

  it('renders flag image', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/flag.svg')
    expect(img.attributes('alt')).toContain('Test Country')
  })

  it('links to country detail page', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toContain('/country/TST')
  })

  it('handles country without capital', async () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined }
    const wrapper = mount(CountryCard, {
      props: { country: countryWithoutCapital },
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('N/A')
  })

  it('has lazy loading on image', async () => {
    const wrapper = mount(CountryCard, {
      props: { country: mockCountry },
      global: { plugins: [router] }
    })
    await router.isReady()
    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
