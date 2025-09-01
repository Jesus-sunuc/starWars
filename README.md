# Star Wars Explorer

> A modern web application to explore Star Wars characters and starships, built with React, TypeScript, and Vite.

---

## Overview
Star Wars Explorer is an interactive web app that allows users to browse and view details about people and starships from the Star Wars universe. The project demonstrates modern frontend development practices, including custom hooks, modular services, and responsive design. It is designed for Star Wars fans and developers interested in learning best practices for React and TypeScript projects.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)

## Features
- Browse lists of Star Wars characters and starships
- View detailed information for each character and ship
- Fast, responsive UI with modern styling
- Modular codebase with custom hooks and services
- Font and image assets for enhanced presentation

## Tech Stack
- **React** (with hooks)
- **TypeScript**
- **Vite**
- **SCSS** for styling

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
$ git clone https://github.com/Jesus-sunuc/starWars.git
$ cd starWars

# Install dependencies
$ npm install
```

### Running the App
```bash
# Start the development server
$ npm run dev
```

The app will be available at `http://localhost:5173` (or as indicated in your terminal).

## Usage
- Navigate to the People or Ships section to explore Star Wars data.
- Click on a character or ship to view detailed information.

## Project Structure
```
starWars/
├── src/
│   ├── hooks/         # Custom React hooks for data fetching
│   ├── pages/         # Page components for lists and details
│   ├── services/      # API service modules
│   ├── types/         # TypeScript type definitions
│   ├── img/           # Image assets
│   ├── fonts/         # Font assets
│   ├── App.tsx        # Main app component
│   └── main.tsx       # App entry point
├── public/            # Static files
├── package.json       # Project metadata and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── README.md          # Project documentation
```

## Credits
- [Star Wars API (SWAPI)](https://swapi.dev/) for data
- [Orbitron Font](https://fonts.google.com/specimen/Orbitron) for typography
- Project by [Jesus-sunuc](https://github.com/Jesus-sunuc)

---

For questions or feedback, please open an issue or contact the maintainer.
