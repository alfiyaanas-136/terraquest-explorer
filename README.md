# TerraQuest Explorer

A responsive travel discovery web application built with React. Explore destinations around the world, discover travel experiences, view destination images, and check current weather information.

## Features

- **Destination Search:** Search for destinations using location-based search.
- **Popular Destinations:** Discover featured destinations around the world.
- **Latest Trips:** Explore selected travel destinations.
- **Explore by Experience:** Browse experiences such as adventure, beaches, culture, food, nature, and city life.
- **Destination Details:** View destination information and related content.
- **Weather Information:** Retrieve current weather conditions for destinations.
- **Interactive Maps:** View destination locations on a map.
- **Destination Images:** Retrieve relevant destination images from Wikimedia Commons.
- **Responsive Design:** Optimised layouts for desktop, tablet, and mobile screens.
- **Loading and Error States:** Handle API requests and unavailable information.

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- React Router
- CSS
- Lucide React
- REST APIs

## APIs Used

- **Open-Meteo Geocoding API:** Location search and coordinates.
- **Open-Meteo Weather API:** Current destination weather.
- **Wikimedia Commons API:** Destination images.

## Project Structure

```text
src/
├── assets/
├── components/
├── data/
├── pages/
└── services/
    ├── geocodingApi.js
    ├── imageApi.js
    └── weatherApi.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd terraquest-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run lint` | Runs ESLint checks |
| `npm run preview` | Previews the production build |

## Project Status

The core application features, API integrations, responsive layouts, and main pages have been implemented.

## Author

Developed as a React portfolio project.
