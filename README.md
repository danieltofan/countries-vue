# FlagFinder

An interactive flag and country exploration app built with Vue 3 and Tailwind CSS. Discover flags from around the world, compare countries, and test your knowledge with fun quizzes.

**Live Demo:** [FlagFinder](https://danieltofan.github.io/countries/)

## Features

### Explore Countries
- Browse 30 countries from all continents
- Search by name or capital
- Filter by region (Africa, Americas, Asia, Europe, Oceania)
- Sort by name, population, or area
- View detailed country information

### Country Details
- Flag and official name
- Population, area, and population density
- Languages, currencies, and timezones
- Border countries with quick navigation
- Quick stats cards

### Compare Countries
- Side-by-side comparison of two countries
- Population, area, density metrics
- Random country selection
- Swap countries feature

### Geography Quiz
- **Flag Quiz:** Identify countries by their flags
- **Capital Quiz:** Match capitals to countries
- **Higher or Lower:** Compare country populations
- Score tracking and performance feedback

## Tech Stack

- **Vue 3.4** with Composition API (`<script setup>`)
- **Vite 5** for fast development and building
- **Tailwind CSS 3.4** for styling
- **Vue Router 4** for navigation
- **Vitest** for unit testing

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
src/
├── assets/
│   └── main.css          # Tailwind + custom styles
├── components/
│   └── CountryCard.vue   # Country grid card
├── data/
│   └── countries.js      # Static country data + helpers
├── router/
│   └── index.js          # Vue Router config
├── views/
│   ├── Dashboard.vue     # Main explore page
│   ├── CountryDetail.vue # Country details
│   ├── Compare.vue       # Country comparison
│   └── Quiz.vue          # Geography quizzes
├── App.vue               # Root component
└── main.js               # App entry point
```

## Data

Country data is sourced from the [REST Countries API](https://restcountries.com/) structure, stored statically for reliable performance. Includes:

- 30 countries across all regions
- Flags from FlagCDN
- Population, area, languages, currencies
- Border country relationships

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Deployment

The app is configured for GitHub Pages deployment:

```bash
npm run build
```

Output is in the `dist/` directory, configured with base path `/countries/`.

## License

MIT

---

Built with Vue 3 + Tailwind CSS
