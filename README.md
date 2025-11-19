# Tienda Gamer Medellín

E-commerce prototype for a gaming hardware store in Medellín, Colombia.

## Features

- Modern, responsive design with gaming-themed aesthetics
- Product catalog with categories (PCs, Components, Peripherals)
- Shopping cart functionality with persistent storage
- Product detail pages with image galleries
- Special offers section
- Custom PC builder page
- Checkout/payment flow
- Skeleton loaders and smooth animations throughout

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── home/        # Home page specific components
│   ├── layout/      # Layout components (Header, Footer)
│   ├── products/    # Product-related components
│   ├── skeletons/   # Loading skeleton components
│   └── ui/          # shadcn/ui components
├── contexts/        # React Context providers
├── data/            # Static data and mock products
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── pages/           # Page components (routes)
```

## Features in Detail

### Animations
- Smooth fade-in and slide-up animations
- Hover effects on cards and buttons
- Skeleton loaders with shimmer effects
- Scroll-triggered animations
- Micro-interactions throughout the UI

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent storage (localStorage)
- Real-time total calculation
- Cart badge with bounce animation

### Product Catalog
- Category filtering
- Price filtering
- Stock status indicators
- Special offer badges
- Product image galleries

## License

This is a prototype project for demonstration purposes.
