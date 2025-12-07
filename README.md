# TravelTrucks 

## Project Overview

This website is developed for the TravelTrucks camper rental service. The application enables users to search, filter, and book motorhomes with detailed information about each vehicle.

[TravelTrucks](https://campervan-hire.vercel.app)

## Application Pages

### **Home Page** (`/`)
- Welcome screen with a banner and main navigation button "View Now" leading to the catalog.

### **Catalog Page** (`/catalog`)
- Grid of cards with available campers for rent.
- Filtering system with server-side request processing:
  - Search by location (text field)
  - Selection of vehicle category
  - Filtering by optional equipment
- Each card contains brief information and a "Show More" button to navigate to detailed view.
- "Load More" button implements pagination with chunked data loading.
- Ability to add campers to favorites.

### **Camper Details Page** (`/catalog/:id`)
- Complete description of the selected vehicle.
- Slider with interior and exterior photos.
- Switchable tabs with technical specifications and user reviews.
- List of available features: transmission type, engine, kitchen, bathroom, multimedia, and other amenities.
- Geometric parameters and consumption characteristics.
- Contact form for booking with submission confirmation.

## Technology Stack

- **Next.js 16** — React framework with App Router
- **TypeScript** — static typing
- **Zustand** — application state management
- **Axios** — HTTP client for API requests
- **CSS Modules** — modular styling approach

## External API

The application uses the MockAPI service with two main endpoints:

- `GET /campers` — retrieve a list of campers with filtering and pagination support.
- `GET /campers/:id` — detailed information about a specific camper by ID.

API Address: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Vitalii978/campervan_hire.git
cd campervan_hire

# Install dependencies
npm install

# Run in development mode
npm run dev