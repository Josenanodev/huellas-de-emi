# UI/UX Overview - Huellas de Emi

This document describes the user interface and user experience of the dog shelter website.

## Design Philosophy

- **Simple & Clean**: Focus on the dogs, not complex UI
- **Accessible**: Large touch targets, readable fonts, good contrast
- **Responsive**: Works seamlessly on all devices
- **Intuitive**: Clear navigation, obvious actions
- **Professional**: Modern design with a warm, welcoming feel

## Color Palette

- **Primary**: #2c3e50 (Dark Blue) - Navigation and headers
- **Secondary**: #3498db (Blue) - Primary buttons and links
- **Success**: #d4edda (Light Green) - Available dogs, success messages
- **Info**: #d1ecf1 (Light Blue) - Adopted dogs
- **Warning**: #fff3cd (Light Yellow) - In treatment dogs
- **Danger**: #f8d7da (Light Red) - Reserved dogs, delete actions
- **Background**: #f5f5f5 (Light Gray) - Page background
- **White**: #ffffff - Cards and content areas

## Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Headings**: Bold, dark blue (#2c3e50)
  - H1: 2.5rem
  - H2: 2rem
  - H3: 1.5rem
- **Body Text**: 1rem, line-height 1.6, dark gray (#333)

## Layout Structure

### Navigation Bar
```
+----------------------------------------------------------+
| 🐾 Huellas de Emi              Inicio    Admin          |
+----------------------------------------------------------+
```
- Fixed position at top
- Dark blue background (#2c3e50)
- White text with hover effects
- Logo with paw emoji on left
- Navigation links on right

### Footer
```
+----------------------------------------------------------+
| © 2026 Huellas de Emi. Todos los derechos reservados.  |
+----------------------------------------------------------+
```
- Dark blue background matching nav
- Centered text
- Simple copyright notice

## Page Layouts

### 1. Homepage (`/`)

#### Header Section
```
+----------------------------------------------------------+
| Perros en Adopción                                       |
| Conoce a nuestros adorables perros que están buscando   |
| un hogar lleno de amor.                                  |
+----------------------------------------------------------+
```

#### Dog Grid (Responsive)
```
Desktop (3 columns):
+---------------+ +---------------+ +---------------+
|   [Photo]     | |   [Photo]     | |   [Photo]     |
| Max           | | Luna          | | Toby          |
| Labrador      | | Pastor Alemán | | Beagle        |
| [Disponible]  | | [Disponible]  | | [Disponible]  |
| Description.. | | Description.. | | Description.. |
| [Ver más]     | | [Ver más]     | | [Ver más]     |
+---------------+ +---------------+ +---------------+

Tablet (2 columns):
+------------------------+ +------------------------+
|   [Photo]              | |   [Photo]              |
| Max                    | | Luna                   |
+------------------------+ +------------------------+

Mobile (1 column):
+----------------------------------------------+
|   [Photo]                                    |
| Max                                          |
+----------------------------------------------+
```

#### Card Design
- **Photo**: 250px height, cover fit, rounded top corners
- **Info Section**: Padded, white background
- **Name**: Large, bold, dark blue
- **Breed**: Gray, smaller text
- **Status Badge**: Rounded pill, color-coded
- **Description**: Truncated to ~100 characters
- **Button**: Blue, full width at bottom
- **Hover Effect**: Lifts up with shadow

### 2. Dog Detail Page (`/dog/:id`)

#### Layout (Desktop)
```
+---------------------------+  +---------------------------+
| [Photo Gallery]           |  | Name                      |
| [Photo 1] [Photo 2]       |  | [Status Badge]            |
| [Photo 3] [Photo 4]       |  |                           |
|                           |  | Raza: ...    Edad: ...    |
|                           |  | Género: ...  Tamaño: ...  |
|                           |  | Vacunado: ... Esteril: ...|
+---------------------------+  +---------------------------+

+----------------------------------------------------------+
| Sobre [Name]                                             |
| Full description text...                                 |
|                                                          |
| Personalidad                                             |
| Personality traits...                                    |
|                                                          |
| Condiciones de Salud                                     |
| • Health condition 1                                     |
| • Health condition 2                                     |
+----------------------------------------------------------+

+----------------------------------------------------------+
| ¿Interesado en adoptar a [Name]?                        |
|                                                          |
| [Contact Form]                                           |
| Nombre:     [_______________]                            |
| Email:      [_______________]                            |
| Teléfono:   [_______________]                            |
| Mensaje:    [_______________]                            |
|             [_______________]                            |
| [Enviar consulta]                                        |
+----------------------------------------------------------+

| [← Volver a la lista]                                   |
```

#### Info Grid (6 items, 2 columns)
- Light gray background boxes
- Label in small gray text
- Value in larger black text
- Responsive: 1 column on mobile

### 3. Admin Panel (`/admin`)

#### Login View
```
+----------------------------------------------------------+
| Panel de Administración                                  |
|                                                          |
| Contraseña de Administrador                              |
| [________________________]                               |
|                                                          |
| [Iniciar Sesión]                                         |
+----------------------------------------------------------+
```

#### Admin View (After Login)
```
+----------------------------------------------------------+
| Gestionar Perros                      [Cerrar Sesión]   |
+----------------------------------------------------------+

| [Success/Error Messages]                                 |

+----------------------------------------------------------+
| Agregar Nuevo Perro                                      |
|                                                          |
| Nombre:           [_______________]                      |
| Raza:             [_______________]                      |
| Edad:             [_______________]                      |
| Género:           [_Seleccionar_▼]                       |
| Tamaño:           [_Seleccionar_▼]                       |
| Estado:           [_Seleccionar_▼]                       |
| Descripción:      [_______________]                      |
|                   [_______________]                      |
| Personalidad:     [_______________]                      |
| ...                                                      |
|                                                          |
| [Guardar]  [Cancelar]                                    |
+----------------------------------------------------------+

+----------------------------------------------------------+
| Lista de Perros                                          |
|                                                          |
| Max - Labrador Retriever - [Disponible]                 |
|                              [Editar] [Eliminar]         |
| -------------------------------------------------------- |
| Luna - Pastor Alemán - [Disponible]                     |
|                              [Editar] [Eliminar]         |
| -------------------------------------------------------- |
| ...                                                      |
+----------------------------------------------------------+
```

## Interactive Elements

### Buttons
- **Primary Button** (Blue): Main actions like "Ver más", "Guardar", "Enviar"
  - Background: #3498db
  - Hover: #2980b9
  - Padding: 0.75rem 1.5rem
  - Border radius: 4px

- **Secondary Button** (Gray): Cancel or back actions
  - Background: #95a5a6
  - Hover: #7f8c8d

- **Danger Button** (Red): Delete actions
  - Background: #e74c3c
  - Hover: #c0392b

### Forms
- **Input Fields**: White background, gray border, rounded corners
- **Labels**: Bold, dark gray
- **Required Fields**: Marked with asterisk
- **Validation**: Red border on error, green on success

### Status Badges
- **Pill-shaped**: Rounded (border-radius: 20px)
- **Small text**: 0.875rem
- **Color coded**:
  - Available: Green background, dark green text
  - Adopted: Blue background, dark blue text
  - In Treatment: Yellow background, dark yellow text
  - Reserved: Red background, dark red text

## Responsive Breakpoints

```
Mobile:     < 768px  - 1 column, stacked layout
Tablet:     768px    - 2 columns, some stacking
Desktop:    1024px   - 3 columns, side-by-side
Large:      1200px   - Maximum container width
```

## Animations & Transitions

- **Card Hover**: Smooth lift effect (translateY -4px), shadow increase
- **Button Hover**: Background color darkens
- **Form Focus**: Blue outline on input fields
- **Link Hover**: Color change to blue
- **Page Transitions**: None (instant navigation)

## User Feedback

### Success Messages
```
+----------------------------------------------------------+
| ✓ Perro agregado correctamente                          |
+----------------------------------------------------------+
```
- Green background (#d4edda)
- Dark green text (#155724)
- Auto-dismiss after 3 seconds

### Error Messages
```
+----------------------------------------------------------+
| ✗ Error al guardar el perro                             |
+----------------------------------------------------------+
```
- Red background (#f8d7da)
- Dark red text (#721c24)
- Auto-dismiss after 3 seconds

### Loading States
- Form buttons show "Guardando..." while processing
- Disabled state on buttons during submission

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Alt Text**: All images have descriptive alt text
- **Keyboard Navigation**: Tab order follows logical flow
- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Focus Indicators**: Visible outline on focused elements
- **Form Labels**: All inputs properly labeled
- **Error Messages**: Clear, actionable error text

## Mobile Optimizations

- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Readable Text**: Minimum 16px font size
- **Simplified Navigation**: Hamburger menu (future enhancement)
- **Optimized Images**: Responsive image loading
- **Fixed Navigation**: Easy access to menu on scroll
- **Form Design**: Large input fields, easy to tap

## Empty States

### No Dogs Available
```
+----------------------------------------------------------+
| No hay perros disponibles en este momento.              |
+----------------------------------------------------------+
```

### No Photos
```
+---------------------------+
|                           |
|  🐕 Foto no disponible   |
|                           |
+---------------------------+
```
- SVG placeholder with dog emoji
- Gray background
- Centered text

## Performance Considerations

- **Optimized Images**: Recommended size 500px wide from Unsplash
- **Minimal JavaScript**: Only on interactive pages (admin, dog detail)
- **CSS Only**: Animations use CSS transforms (GPU accelerated)
- **Lazy Loading**: Images load as needed
- **Code Splitting**: Astro handles automatic code splitting

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 12+
- Chrome Mobile: Latest version

---

This design provides a professional, accessible, and user-friendly experience for both visitors looking to adopt and shelter staff managing the dogs.
