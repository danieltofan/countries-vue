import { describe, it, expect } from 'vitest'
import router from '../router'

describe('Router', () => {
  it('has dashboard route', () => {
    const route = router.getRoutes().find(r => r.name === 'Dashboard')
    expect(route).toBeDefined()
    expect(route.path).toBe('/')
  })

  it('has country detail route', () => {
    const route = router.getRoutes().find(r => r.name === 'CountryDetail')
    expect(route).toBeDefined()
    expect(route.path).toBe('/country/:code')
  })

  it('has compare route', () => {
    const route = router.getRoutes().find(r => r.name === 'Compare')
    expect(route).toBeDefined()
    expect(route.path).toBe('/compare')
  })

  it('has quiz route', () => {
    const route = router.getRoutes().find(r => r.name === 'Quiz')
    expect(route).toBeDefined()
    expect(route.path).toBe('/quiz')
  })

  it('country detail route accepts props', () => {
    const route = router.getRoutes().find(r => r.name === 'CountryDetail')
    expect(route.props).toBeDefined()
  })

  it('uses correct base path for GitHub Pages', () => {
    expect(router.options.history.base).toBe('/countries')
  })
})
