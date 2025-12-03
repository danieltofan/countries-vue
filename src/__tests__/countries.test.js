import { describe, it, expect } from 'vitest'
import {
  countries,
  getCountryByCode,
  getCountriesByRegion,
  searchCountries,
  getRegions,
  formatPopulation,
  formatArea,
  getLanguages,
  getCurrencies,
  getBorderCountries
} from '../data/countries'

describe('countries data', () => {
  it('has countries array with data', () => {
    expect(countries).toBeDefined()
    expect(Array.isArray(countries)).toBe(true)
    expect(countries.length).toBeGreaterThan(0)
  })

  it('each country has required fields', () => {
    countries.forEach(country => {
      expect(country.name.common).toBeDefined()
      expect(country.cca3).toBeDefined()
      expect(country.cca2).toBeDefined()
      expect(country.region).toBeDefined()
      expect(country.population).toBeDefined()
      expect(country.area).toBeDefined()
      expect(country.flags).toBeDefined()
    })
  })

  it('has countries from all major regions', () => {
    const regions = countries.map(c => c.region)
    expect(regions).toContain('Americas')
    expect(regions).toContain('Europe')
    expect(regions).toContain('Asia')
    expect(regions).toContain('Africa')
    expect(regions).toContain('Oceania')
  })
})

describe('getCountryByCode', () => {
  it('finds country by cca3 code', () => {
    const usa = getCountryByCode('USA')
    expect(usa).toBeDefined()
    expect(usa.name.common).toBe('United States')
  })

  it('finds country by cca2 code', () => {
    const canada = getCountryByCode('CA')
    expect(canada).toBeDefined()
    expect(canada.name.common).toBe('Canada')
  })

  it('returns undefined for invalid code', () => {
    const invalid = getCountryByCode('XXX')
    expect(invalid).toBeUndefined()
  })

  it('handles lowercase codes', () => {
    const uk = getCountryByCode('gb')
    expect(uk).toBeDefined()
    expect(uk.name.common).toBe('United Kingdom')
  })
})

describe('getCountriesByRegion', () => {
  it('returns countries from specified region', () => {
    const european = getCountriesByRegion('Europe')
    expect(european.length).toBeGreaterThan(0)
    european.forEach(country => {
      expect(country.region).toBe('Europe')
    })
  })

  it('returns empty array for invalid region', () => {
    const invalid = getCountriesByRegion('Antarctica')
    expect(invalid).toEqual([])
  })
})

describe('searchCountries', () => {
  it('finds countries by common name', () => {
    const results = searchCountries('united')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(c => c.name.common === 'United States')).toBe(true)
    expect(results.some(c => c.name.common === 'United Kingdom')).toBe(true)
  })

  it('finds countries by capital', () => {
    const results = searchCountries('Tokyo')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(c => c.name.common === 'Japan')).toBe(true)
  })

  it('finds countries by official name', () => {
    const results = searchCountries('Republic of')
    expect(results.length).toBeGreaterThan(0)
  })

  it('is case insensitive', () => {
    const results1 = searchCountries('BRAZIL')
    const results2 = searchCountries('brazil')
    expect(results1.length).toBe(results2.length)
  })

  it('returns empty array for no matches', () => {
    const results = searchCountries('xyznonexistent')
    expect(results).toEqual([])
  })
})

describe('getRegions', () => {
  it('returns unique regions', () => {
    const regions = getRegions()
    expect(regions.length).toBe(new Set(regions).size)
  })

  it('returns sorted regions', () => {
    const regions = getRegions()
    const sorted = [...regions].sort()
    expect(regions).toEqual(sorted)
  })

  it('includes all major regions', () => {
    const regions = getRegions()
    expect(regions).toContain('Americas')
    expect(regions).toContain('Europe')
    expect(regions).toContain('Asia')
    expect(regions).toContain('Africa')
    expect(regions).toContain('Oceania')
  })
})

describe('formatPopulation', () => {
  it('formats billions', () => {
    expect(formatPopulation(1400000000)).toBe('1.4B')
    expect(formatPopulation(7800000000)).toBe('7.8B')
  })

  it('formats millions', () => {
    expect(formatPopulation(331000000)).toBe('331.0M')
    expect(formatPopulation(38000000)).toBe('38.0M')
  })

  it('formats thousands', () => {
    expect(formatPopulation(500000)).toBe('500.0K')
    expect(formatPopulation(1000)).toBe('1.0K')
  })

  it('formats small numbers', () => {
    expect(formatPopulation(500)).toBe('500')
    expect(formatPopulation(0)).toBe('0')
  })
})

describe('formatArea', () => {
  it('formats area with km² suffix', () => {
    expect(formatArea(9833520)).toBe('9,833,520 km²')
    expect(formatArea(1000)).toBe('1,000 km²')
  })
})

describe('getLanguages', () => {
  it('returns comma-separated languages', () => {
    const canada = getCountryByCode('CAN')
    const languages = getLanguages(canada)
    expect(languages).toContain('English')
    expect(languages).toContain('French')
  })

  it('handles single language', () => {
    const usa = getCountryByCode('USA')
    const languages = getLanguages(usa)
    expect(languages).toBe('English')
  })

  it('handles missing languages', () => {
    const result = getLanguages({})
    expect(result).toBe('')
  })
})

describe('getCurrencies', () => {
  it('returns formatted currencies', () => {
    const usa = getCountryByCode('USA')
    const currencies = getCurrencies(usa)
    expect(currencies).toContain('United States dollar')
    expect(currencies).toContain('$')
  })

  it('handles missing currencies', () => {
    const result = getCurrencies({})
    expect(result).toBe('')
  })
})

describe('getBorderCountries', () => {
  it('returns border country objects', () => {
    const usa = getCountryByCode('USA')
    const borders = getBorderCountries(usa)
    expect(borders.length).toBe(2)
    expect(borders.some(c => c.name.common === 'Canada')).toBe(true)
    expect(borders.some(c => c.name.common === 'Mexico')).toBe(true)
  })

  it('returns empty array for island nations', () => {
    const japan = getCountryByCode('JPN')
    const borders = getBorderCountries(japan)
    expect(borders).toEqual([])
  })

  it('handles countries with no borders array', () => {
    const result = getBorderCountries({})
    expect(result).toEqual([])
  })

  it('handles countries with empty borders array', () => {
    const result = getBorderCountries({ borders: [] })
    expect(result).toEqual([])
  })
})
