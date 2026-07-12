# EduPlatform 🎓

Beynəlxalq Təhsil & Mobillik Platforması — Erasmus+, ESC, Təqaüdlər, Trainings, Tədbirlər.

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, next-intl (az/ru/tr/en)
- **Backend**: NestJS, Prisma ORM
- **DB**: PostgreSQL 16, Redis 7
- **DevOps**: Docker, Nginx, GitHub Actions
- **Monitoring**: Prometheus, Grafana

## 🚀 Sürətli Başlanğıc

```bash
git clone https://github.com/YOUR_USERNAME/edu-platform.git
cd edu-platform
cp .env.example .env
# .env faylını doldur
docker-compose up -d --build
```

**Servislər:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Prometheus: http://localhost:9090

## 🌍 Çoxdillilik

Platforma 4 dili dəstəkləyir: **Azərbaycan, Русский, Türkçe, English**

## ⚡ Vercel Deploy

1. GitHub-a push et
2. vercel.com-da "New Project" → repo seç
3. Root Directory: `frontend`
4. Environment Variables: `NEXT_PUBLIC_API_URL=https://your-api.com/api`
5. Deploy!

## 📋 API Endpointlər

| Method | Endpoint | Açıqlama |
|--------|----------|----------|
| POST | /api/auth/register | Qeydiyyat |
| POST | /api/auth/login | Giriş |
| GET | /api/trainings | Treninqlər |
| GET | /api/projects | Layihələr |
| GET | /api/blog | Bloq yazıları |
| GET | /api/events | Tədbirlər |
| GET | /api/translations/:locale | Tərcümələr |
