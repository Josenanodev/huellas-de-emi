# Huellas de Emi 🐾

Website for a dog shelter to promote adoptions and donations. Built as a fullstack monolith using MongoDB, Express.js, and Astro.js with TypeScript.

## Features

- 🐕 **Browse Dogs**: View all dogs available for adoption with detailed information
- 📝 **Dog Details**: Individual page for each dog showing:
  - Photos
  - Health conditions
  - Personality traits
  - Special care requirements
  - Vaccination and sterilization status
- 💌 **Contact Form**: Users can express interest in adopting a specific dog
- 🔐 **Admin Panel**: Secure admin interface to:
  - Add new dogs
  - Update dog information
  - Delete dogs
  - Manage adoption status

## Tech Stack

- **Frontend**: Astro.js with TypeScript
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Vanilla CSS

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or remote instance)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Josenanodev/huellas-de-emi.git
cd huellas-de-emi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (use `.env.example` as template):
```env
MONGODB_URI=mongodb://localhost:27017/huellas-de-emi
PORT=4321
ADMIN_PASSWORD=your_secure_password
```

4. Make sure MongoDB is running on your system.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4321`

## Usage

### For Visitors

1. Visit the homepage to browse all available dogs
2. Click on any dog to view detailed information
3. Fill out the contact form to express interest in adoption

### For Administrators

1. Navigate to `/admin`
2. Enter the admin password (set in `.env` file)
3. Use the admin panel to:
   - Add new dogs with complete information
   - Edit existing dog profiles
   - Update adoption status
   - Remove dogs from the listing

## API Endpoints

- `GET /api/dogs` - Get all dogs
- `GET /api/dogs/:id` - Get single dog by ID
- `POST /api/dogs` - Create new dog (requires admin auth)
- `PUT /api/dogs/:id` - Update dog (requires admin auth)
- `DELETE /api/dogs/:id` - Delete dog (requires admin auth)
- `POST /api/contact` - Submit contact form

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
huellas-de-emi/
├── public/
│   ├── images/          # Public images
│   └── styles/          # Global CSS
├── server/
│   ├── models/          # MongoDB models
│   ├── routes/          # Express routes
│   ├── middleware/      # Express middleware
│   └── index.js         # Express app configuration
├── src/
│   ├── layouts/         # Astro layouts
│   └── pages/           # Astro pages and API routes
│       ├── api/         # API integration
│       ├── dog/         # Dog detail pages
│       ├── index.astro  # Homepage
│       └── admin.astro  # Admin panel
├── astro.config.mjs     # Astro configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

