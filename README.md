# cloud-project

A full-stack Todo application with Node.js backend and React frontend, deployed on Azure.

## Live URLs
- Frontend (Static Web App): https://green-bush-0e6ed2400.7.azurestaticapps.net
- Backend (App Service): https://app-taskapp-backend-junaid-a8fjgwc6gmapfzfw.eastasia-01.azurewebsites.net/api/health

## Branches
- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — individual features
- `release/*` — release preparation

## Git Flow
All features branch from `develop`, get merged back via PR, then released to `main`.

## Azure Resources
| Resource | Name |
|---|---|
| Resource Group | rg-taskapp-student-junaid1 |
| Container Registry | acrtaskappjunaid |
| SQL Database | db-taskapp1 (sql-taskapp-junaid) |
| App Service | app-taskapp-backend-junaid |
| Static Web App | stapp-taskapp-frontend |
| Azure DevOps | devops-training-junaid / taskapp-cicd |

## Completion Checklist
- [x] Forked GitHub Repo with Git Flow branches
- [x] Dockerfiles committed for backend and frontend
- [x] Docker images pushed to ACR (taskapp-backend, taskapp-frontend)
- [x] Azure SQL Database running with todos table
- [x] App Service backend deployed — /api/health returns 200
- [x] Static Web App frontend live and calling backend API
- [x] End-to-end: create task in UI → saved to Azure SQL
- [x] Azure DevOps CI/CD pipeline — Build + Deploy stages green
- [x] No secrets in committed code — .env in .gitignore

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
