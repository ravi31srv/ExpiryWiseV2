# ExpiryWise - Full Stack Setup Guide

## 📦 Project Overview

ExpiryWise is a full-stack application for tracking item expiration dates. It consists of:
- **Backend**: Express.js API with MongoDB (running on port 3000)
- **Frontend**: Angular 21 application with modern UI (running on port 4200)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm
- MongoDB Atlas account (credentials already configured in `.env`)

### Installation

#### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

#### 2. Backend Setup
The backend is already configured with:
- Express.js server
- MongoDB connection (Atlas)
- CORS enabled for frontend
- API endpoints:
  - `GET /items` - Get all items sorted by expiry date
  - `POST /items` - Add a new item
  - `DELETE /items/:id` - Delete an item

### 🎯 Running the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Backend will be available at http://localhost:3000
```

**Terminal 2 - Start Frontend:**
```bash
cd web
npm run start
# or for Angular dev server
ng serve
# Frontend will be available at http://localhost:4200
```

#### Option 2: Run with Nx (Monorepo)

**Start both backend and frontend:**
```bash
# Using Nx
nx run-many --target=serve --projects=backend,web
```

**Run individual projects:**
```bash
# Backend
nx serve backend

# Frontend (Web)
nx serve web
```

## 📋 Frontend Features

### Components
1. **Items List Component** (`/`)
   - Display all items sorted by expiry date
   - Visual status indicators (Expired, Expiring Soon, Safe)
   - Delete individual items
   - Responsive design with progress bars

2. **Add Item Component** (`/add`)
   - Form to add new items
   - Input validation
   - Date picker (prevents past dates)
   - Success/error messages

### UI Highlights
- **Modern Gradient Design**: Purple gradient background
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Status Indicators**:
  - 🔴 **Expired** (red) - Item has passed expiry date
  - 🟠 **Expiring Soon** (orange) - Within 7 days
  - 🟢 **Safe** (green) - More than 7 days remaining
- **Progress Bar**: Visual representation of time remaining (30-day scale)
- **Smooth Animations**: Fade-in and slide animations throughout the app

## 🔗 API Integration

### Service: `ItemsService`
Located in `web/src/app/services/items.service.ts`

**Methods:**
```typescript
// Get all items
getItems(): Observable<Item[]>

// Add new item
addItem(item: Item): Observable<{ success: boolean; data: Item }>

// Delete item
deleteItem(itemId: string): Observable<{ success: boolean; message: string }>

// Load items (auto-fetch on service init)
loadItems(): void
```

### Item Model
```typescript
interface Item {
  _id?: string;        // MongoDB ID
  item: string;        // Item name
  date: string;        // Expiry date (YYYY-MM-DD format)
}
```

## 📁 Project Structure

```
expirywise/
├── backend/                          # Express.js API
│   ├── src/
│   │   ├── main.ts                  # Express server & API routes
│   │   ├── db.ts                    # MongoDB connection
│   │   └── models/
│   │       └── item.ts              # Mongoose schema
│   └── .env                         # MongoDB connection
│
├── web/                              # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts               # Root component
│   │   │   ├── app.config.ts        # App configuration (HttpClient)
│   │   │   ├── app.routes.ts        # Routing
│   │   │   ├── services/
│   │   │   │   └── items.service.ts # API service
│   │   │   └── components/
│   │   │       ├── items-list/      # List component
│   │   │       └── add-item/        # Add form component
│   │   ├── index.html               # HTML template
│   │   ├── main.ts                  # Bootstrap
│   │   └── styles.scss              # Global styles
│   └── project.json                 # Nx config
│
└── package.json                     # Root dependencies
```

## 🎨 Styling

### Color Scheme
- **Primary**: `#667eea` (Purple)
- **Primary Dark**: `#764ba2` (Darker Purple)
- **Success**: `#4caf50` (Green)
- **Warning**: `#ffa502` (Orange)
- **Danger**: `#ff4242` (Red)

### CSS Architecture
- **SCSS Modules**: Component-scoped styles
- **Global Styles**: `web/src/styles.scss`
- **CSS Variables**: Defined in `:root` for theme consistency
- **Responsive**: Mobile-first approach with breakpoints at 768px

## 🧪 Testing

### Run Tests
```bash
# Backend tests
nx test backend

# Frontend tests
nx test web
```

### E2E Tests
```bash
nx e2e backend-e2e
```

## 🐛 Troubleshooting

### Frontend can't connect to Backend
- Ensure backend is running on `http://localhost:3000`
- Check CORS is enabled in backend (`app.use(cors())`)
- Open browser DevTools → Network tab to see API calls

### MongoDB Connection Issues
- Verify `MONGO_URI` in `backend/.env`
- Check MongoDB Atlas cluster is active
- Ensure IP whitelist includes your IP (or allow all)

### Ports Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

## 📝 API Examples

### Add Item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "item": "Milk",
    "date": "2024-12-25"
  }'
```

### Get All Items
```bash
curl http://localhost:3000/items
```

### Delete Item
```bash
curl -X DELETE http://localhost:3000/items/{ITEM_ID}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Or with Nx
nx build web
```

### Backend (Heroku/Railway)
```bash
# Build and deploy
npm run build

# Or with Nx
nx build backend
```

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend server logs
3. Verify MongoDB connection
4. Review API response in Network tab

---

**Happy tracking! 📦✨**
