# 📦 ExpiryWise - Item Expiration Tracker

A modern full-stack application to track and manage item expiration dates. Never let your food spoil or medications expire unexpectedly again!

<div align="center">

![Angular](https://img.shields.io/badge/Angular-21.2-red?style=flat-square&logo=angular)
![Express](https://img.shields.io/badge/Express-4.21-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.6-green?style=flat-square&logo=mongodb)
![Nx](https://img.shields.io/badge/Nx-22.7-purple?style=flat-square&logo=nx)

</div>

## ✨ Features

- 📋 **Track Items** - Add items with expiry dates
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- ⏱️ **Smart Status Indicators** - Know at a glance which items are safe, expiring soon, or expired
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Instant feedback on all actions
- 🗑️ **Easy Management** - Delete expired items with one click
- 🔒 **Secure** - CORS-enabled API with MongoDB persistence

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or pnpm

### Installation

```bash
# Clone and install dependencies
git clone <repo-url>
cd expirywise
npm install
```

### Running the Application

**Option 1: Using Nx**
```bash
# Start both backend and frontend
nx run-many --target=serve --projects=backend,web
```

**Option 2: Separate Terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Backend runs on http://localhost:3000
```

Terminal 2 - Frontend:
```bash
cd web
npm start
# Frontend runs on http://localhost:4200
```

## 📁 Project Structure

```
expirywise/
├── backend/              # Express.js API + MongoDB
│   └── src/
│       ├── main.ts      # API endpoints
│       ├── db.ts        # MongoDB connection
│       └── models/      # Data schemas
├── web/                  # Angular Frontend
│   └── src/app/
│       ├── components/  # UI components
│       ├── services/    # API service
│       └── environments/# Config files
└── docs/                # Documentation
```

## 🎯 Core Functionality

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Fetch all items (sorted by date) |
| POST | `/items` | Add new item |
| DELETE | `/items/:id` | Delete item |

### UI Screens

#### Home Page (`/`)
- View all tracked items
- See expiration status and days remaining
- Delete items

#### Add Item Page (`/add`)
- Form to add new items
- Input validation
- Date picker (prevents past dates)

## 🎨 Status Indicators

| Status | Color | Condition |
|--------|-------|-----------|
| SAFE | Green 🟢 | > 7 days remaining |
| EXPIRING SOON | Orange 🟠 | ≤ 7 days remaining |
| EXPIRED | Red 🔴 | Already expired |

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Angular 21 + RxJS + SCSS |
| Backend | Express.js + Node.js |
| Database | MongoDB Atlas |
| Package Manager | npm/pnpm |
| Monorepo | Nx 22 |

## 📚 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed installation and configuration
- **[Developer Reference](./DEVELOPER_REFERENCE.md)** - API docs, code structure, common tasks
- **[AGENTS.md](./AGENTS.md)** - Nx guidelines and workspace info

## 🔗 API Integration

The frontend uses an `ItemsService` to communicate with the backend:

```typescript
// Get all items
itemsService.getItems().subscribe(items => {
  console.log('Items:', items);
});

// Add new item
itemsService.addItem({ item: 'Milk', date: '2024-12-25' })
  .subscribe(result => {
    console.log('Item added:', result.data);
  });

// Delete item
itemsService.deleteItem(itemId).subscribe(() => {
  console.log('Item deleted');
});
```

## 🎯 UI Features

### Modern Design
- Gradient purple backgrounds
- Smooth animations and transitions
- Card-based layout
- Progress bars for time tracking

### Responsive
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons
- Adaptive typography

### User Experience
- Real-time updates
- Loading states
- Error messages
- Confirmation dialogs

## 🧪 Testing

```bash
# Run all tests
nx test

# Run specific project tests
nx test web
nx test backend

# E2E tests
nx e2e backend-e2e
```

## 📊 Data Model

### Item Schema
```javascript
{
  _id: ObjectId,           // MongoDB ID
  item: String,            // Item name (2-100 chars)
  date: String,            // Expiry date (YYYY-MM-DD)
  createdAt: Date          // Auto-timestamp
}
```

## ⚙️ Configuration

### Environment Variables

**Backend** (`.env`)
```
MONGO_URI=mongodb+srv://...
PORT=3000
HOST=0.0.0.0
```

**Frontend** (`environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/web folder
```

### Backend Deployment (Railway/Render)
```bash
npm run build
# Deploy the dist/backend folder
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:3000`
- Check CORS is enabled in `backend/src/main.ts`
- Clear browser cache and refresh

### MongoDB connection error
- Verify `MONGO_URI` in `.env`
- Check MongoDB Atlas cluster is active
- Whitelist your IP in MongoDB Atlas

### Port conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎓 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Nx Documentation](https://nx.dev/docs)
- [RxJS Guide](https://rxjs.dev/)

## 📞 Support

For issues or questions:
1. Check the [Setup Guide](./SETUP_GUIDE.md)
2. Review the [Developer Reference](./DEVELOPER_REFERENCE.md)
3. Check browser console for errors
4. Verify backend is running

## 🌟 Future Enhancements

- [ ] User authentication & accounts
- [ ] Categories/tags for items
- [ ] Push notifications before expiry
- [ ] Bulk import/export
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Statistics and analytics dashboard
- [ ] Sharing lists with family/team

---

**Happy tracking! Keep your items fresh and organized with ExpiryWise! 📦✨**


To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Nx Cloud

Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Set up CI (non-Github Actions CI)

**Note:** This is only required if your CI provider is not GitHub Actions.

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
