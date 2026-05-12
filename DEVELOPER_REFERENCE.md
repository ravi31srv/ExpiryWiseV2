# ExpiryWise - Developer Reference

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Backend (Terminal 1)
cd backend && npm run dev

# 3. Start Frontend (Terminal 2)  
cd web && npm start

# Access at: http://localhost:4200
```

## File Structure Reference

### Backend (`backend/src/`)
- **main.ts** - Express server with 3 endpoints:
  - `GET /items` - Fetch all items
  - `POST /items` - Create new item
  - `DELETE /items/:id` - Delete item

- **db.ts** - MongoDB connection setup
- **models/item.ts** - Item schema (item: string, date: string)

### Frontend (`web/src/app/`)

#### Services
- **services/items.service.ts** - API calls & state management
  - `getItems()` - Fetch items
  - `addItem()` - Add new item
  - `deleteItem()` - Delete item
  - `items$` - Observable stream for UI

#### Components
- **components/items-list/** - Display all items
  - Shows status (Expired/Expiring Soon/Safe)
  - Delete buttons
  - Progress bars

- **components/add-item/** - Add new item form
  - Form validation
  - Date picker
  - Success/error messages

#### Configuration
- **app.config.ts** - Angular setup (HttpClient provider)
- **app.routes.ts** - Routing (`/` and `/add`)
- **app.ts** - Root component with navbar

#### Styling
- **styles.scss** - Global styles & CSS variables
- **app.scss** - Navbar styling
- Component SCSS files - Scoped styles

## Common Tasks

### Adding a New API Endpoint

**1. Backend (main.ts):**
```typescript
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  // Implementation
});
```

**2. Service (items.service.ts):**
```typescript
getItemById(id: string): Observable<Item> {
  return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
}
```

**3. Component:**
```typescript
this.itemsService.getItemById(id).subscribe(item => {
  // Use item data
});
```

### Modifying the Item Model

**1. Update Schema (backend/src/models/item.ts):**
```typescript
const itemSchema = new mongoose.Schema({
  item: String,
  date: String,
  category: String, // New field
});
```

**2. Update Interface (web service):**
```typescript
export interface Item {
  _id?: string;
  item: string;
  date: string;
  category?: string; // New field
}
```

### Changing Colors/Theme

Edit `web/src/styles.scss` CSS variables:
```scss
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --success-color: #4caf50;
  --warning-color: #ffa502;
  --danger-color: #ff4242;
}
```

## Environment Configuration

### Development
- API: `http://localhost:3000`
- Frontend: `http://localhost:4200`
- Config: `web/src/environments/environment.ts`

### Production
- Update API URL in `environment.prod.ts`
- Build: `nx build web --configuration production`

## Debugging

### Frontend Issues
1. Check browser console (F12)
2. Check Network tab for API responses
3. Verify backend is running on port 3000

### Backend Issues
1. Check terminal output for errors
2. Verify MongoDB connection
3. Test endpoints with curl:
```bash
curl http://localhost:3000/items
```

## Testing

```bash
# Unit tests
nx test web
nx test backend

# E2E tests
nx e2e backend-e2e

# Lint
nx lint web
nx lint backend
```

## UI Components Breakdown

### Items List Card
- **Header**: Item name + Badge (status)
- **Info**: Expiry date + Days remaining
- **Progress**: Visual time indicator
- **Action**: Delete button

### Status Badges
| Status | Color | Condition |
|--------|-------|-----------|
| SAFE | Green | > 7 days |
| EXPIRING SOON | Orange | ≤ 7 days |
| EXPIRED | Red | < 0 days |

### Form Validation
- Item name: 2-100 characters, required
- Date: Required, cannot be in past

## Key Technologies

| Layer | Tech | Version |
|-------|------|---------|
| Frontend | Angular | 21.2 |
| Backend | Express | 4.21 |
| Database | MongoDB | 9.6 |
| Styling | SCSS | Latest |
| State Mgmt | RxJS | 7.8 |

## Performance Tips

1. **Frontend**: 
   - Items loaded on service init
   - RxJS observables prevent memory leaks
   - Lazy loading available via routing

2. **Backend**:
   - MongoDB indexing on `date` field recommended
   - Items sorted at query time
   - CORS enabled for frontend

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## Deployment Checklist

- [ ] Backend API URL updated in environment.prod.ts
- [ ] Build frontend: `nx build web --configuration production`
- [ ] Build backend: `nx build backend`
- [ ] MongoDB Atlas credentials secured
- [ ] CORS updated for production domain
- [ ] Environment variables set in deployment platform
- [ ] Test all endpoints post-deployment

---

**Need Help?** Check SETUP_GUIDE.md for detailed setup instructions.
