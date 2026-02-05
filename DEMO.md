# Huellas de Emi - Demo Guide

This document provides a walkthrough of the features available in the Huellas de Emi dog shelter website.

## Homepage

The homepage displays all dogs available for adoption in a responsive grid layout.

### Features:
- **Dog Cards**: Each dog is displayed in a card with:
  - Photo (or placeholder if no photo available)
  - Name and breed
  - Status badge (Available, Adopted, In Treatment, Reserved)
  - Short description
  - "Ver más" (View more) button

### Status Indicators:
- 🟢 **Disponible** (Available) - Green badge
- 🔵 **Adoptado** (Adopted) - Blue badge
- 🟡 **En Tratamiento** (In Treatment) - Yellow badge
- 🔴 **Reservado** (Reserved) - Red badge

## Dog Detail Page

Click on any dog to view their complete profile at `/dog/:id`

### Information Displayed:
1. **Photo Gallery**: Multiple images of the dog (if available)
2. **Basic Information**:
   - Name and status
   - Breed and age
   - Gender (Macho/Hembra)
   - Size (Pequeño/Mediano/Grande)
   - Vaccination status
   - Sterilization status

3. **About Section**:
   - Full description
   - Personality traits
   - Health conditions (if any)
   - Special care requirements

4. **Contact Form** (only shown for available dogs):
   - Name
   - Email
   - Phone
   - Message

When users submit the contact form, their information is captured for follow-up.

## Admin Panel (`/admin`)

Secure administrative interface for managing dogs.

### Login
1. Navigate to `/admin`
2. Enter the admin password (configured in `.env` file)
3. Click "Iniciar Sesión"

### Admin Features

#### Add New Dog
Fill out the form with:
- **Basic Information**: Name, Breed, Age, Gender, Size
- **Status**: Select from Available, Reserved, In Treatment, or Adopted
- **Descriptions**: Main description, Personality, Special care needs
- **Health**: Health conditions (comma-separated), Vaccination status, Sterilization status
- **Images**: URLs of dog images (comma-separated)

#### Edit Existing Dog
1. Click "Editar" button next to any dog in the list
2. Form will populate with current data
3. Make changes and click "Guardar"
4. Click "Cancelar" to discard changes

#### Delete Dog
1. Click "Eliminar" button next to any dog
2. Confirm the deletion
3. Dog is permanently removed from the database

#### View All Dogs
The admin panel shows a list of all dogs with:
- Name, breed, and current status
- Quick action buttons (Edit/Delete)

## Sample Data

Use the provided seed script to populate the database with 6 sample dogs:

```bash
npm run seed
```

Sample dogs included:
1. **Max** - Labrador Retriever (Available)
2. **Luna** - Pastor Alemán (Available)
3. **Toby** - Beagle (Available)
4. **Bella** - Golden Retriever (Reserved)
5. **Rocky** - Pitbull (In Treatment)
6. **Daisy** - Chihuahua (Available)

## API Endpoints

All API endpoints are available at `/api/*`:

### Public Endpoints
- `GET /api/dogs` - List all dogs
- `GET /api/dogs/:id` - Get single dog details
- `POST /api/contact` - Submit contact form

### Admin Endpoints (require `X-Admin-Password` header)
- `POST /api/dogs` - Create new dog
- `PUT /api/dogs/:id` - Update dog
- `DELETE /api/dogs/:id` - Delete dog

### Health Check
- `GET /api/health` - Check API and database status

## Responsive Design

The website is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1200px+)

## Security Notes

⚠️ **Important**: The current authentication system is basic and intended for demonstration purposes. For production use:

1. Implement proper user authentication with JWT or sessions
2. Use bcrypt to hash admin passwords
3. Add CSRF protection
4. Implement rate limiting
5. Add input validation and sanitization
6. Use HTTPS in production

## Testing Workflow

1. **Start MongoDB** (using Docker):
   ```bash
   docker-compose up -d
   ```

2. **Seed Database**:
   ```bash
   npm run seed
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Visit the Application**:
   - Homepage: `http://localhost:4321`
   - Admin Panel: `http://localhost:4321/admin`

5. **Test Features**:
   - Browse dogs on homepage
   - Click to view individual dog details
   - Submit a contact form
   - Login to admin panel (password: `admin123` by default)
   - Add a new dog
   - Edit an existing dog
   - Delete a dog

## Technologies Used

- **Frontend**: Astro.js 5.x with TypeScript
- **Backend**: Express.js 5.x
- **Database**: MongoDB 7.x with Mongoose
- **Styling**: Vanilla CSS (no framework)
- **Development**: Node.js 18+

## Future Enhancements

Potential features for future development:
- Image upload functionality
- Email notifications for contact forms
- User accounts for potential adopters
- Adoption application forms
- Donation system
- Blog/news section
- Multi-language support
- Search and filter functionality
- Social media integration
