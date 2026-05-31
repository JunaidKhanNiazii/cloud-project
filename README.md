# cloud-project

A full-stack Todo application with Node.js backend and React frontend.

## Branches
- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — individual features
- `release/*` — release preparation

## Git Flow
All features branch from `develop`, get merged back via PR, then released to `main`.

---

## Running the Project

### Option 1 — Docker (recommended)

**1. Build images**
```bash
sudo docker build -t taskapp-backend:local ./backend
sudo docker build -t taskapp-frontend:local ./frontend
```

**2. Run containers**
```bash
sudo docker run -d -p 5005:5005 --env-file ./backend/.env --name backend taskapp-backend:local
sudo docker run -d -p 8080:80 --name frontend taskapp-frontend:local
```

**3. Open in browser**
- Frontend: http://localhost:8080
- Backend health check: http://localhost:5005/api/health

**Start / Stop**
```bash
sudo docker start backend frontend
sudo docker stop backend frontend
```

**Check logs**
```bash
sudo docker logs backend
sudo docker logs frontend
```

---

### Option 2 — Local Dev (without Docker)

**Backend**
```bash
cd backend
npm install
npm run dev
# runs on http://localhost:5005
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# runs on http://localhost:5173
```
