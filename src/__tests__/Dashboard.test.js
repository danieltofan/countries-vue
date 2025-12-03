import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/country/:code', name: 'CountryDetail', component: { template: '<div>Detail</div>' } }
  ]
})

describe('Dashboard.vue', () => {
  it('renders the main heading', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Explore the World')
  })

  it('shows stats cards', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Countries')
    expect(wrapper.text()).toContain('Total Population')
    expect(wrapper.text()).toContain('Area')
  })

  it('has search input', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const searchInput = wrapper.find('input[type="text"]')
    expect(searchInput.exists()).toBe(true)
    expect(searchInput.attributes('placeholder')).toContain('Search')
  })

  it('has region filter dropdown', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const selects = wrapper.findAll('select')
    expect(selects.length).toBeGreaterThanOrEqual(1)
    expect(wrapper.text()).toContain('All Regions')
  })

  it('has sort dropdown', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Sort by Name')
    expect(wrapper.text()).toContain('Sort by Population')
    expect(wrapper.text()).toContain('Sort by Area')
  })

  it('displays country cards', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()
    // Check for some known countries
    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('Canada')
  })

  it('filters countries by search', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Japan')

    expect(wrapper.text()).toContain('Japan')
    expect(wrapper.text()).not.toContain('United States')
  })

  it('filters countries by region', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const regionSelect = wrapper.find('#region')
    await regionSelect.setValue('Europe')

    expect(wrapper.text()).toContain('Germany')
    expect(wrapper.text()).toContain('France')
    expect(wrapper.text()).not.toContain('Japan')
  })

  it('sorts countries by population', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const sortSelect = wrapper.find('#sort')
    await sortSelect.setValue('population')

    // China should appear before Canada when sorted by population
    const text = wrapper.text()
    const chinaIndex = text.indexOf('China')
    const canadaIndex = text.indexOf('Canada')
    expect(chinaIndex).toBeLessThan(canadaIndex)
  })

  it('shows no results message when search has no matches', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('xyznonexistent')

    expect(wrapper.text()).toContain('No countries found')
  })

  it('clear filters button appears when filters are active', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('test')

    expect(wrapper.text()).toContain('Clear Filters')
  })

  it('clears filters when clear button clicked', async () => {
    const wrapper = mount(Dashboard, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('xyznonexistent')

    const clearButton = wrapper.findAll('button').find(b => b.text().includes('Clear Filters'))
    await clearButton.trigger('click')

    expect(searchInput.element.value).toBe('')
    expect(wrapper.text()).toContain('United States')
  })
})
