# SkillBridge - Bridging Education and Industry



By Team Commit_Crew - [@Siratul804](https://github.com/Siratul804), [@AsTeriaa09](https://github.com/AsTeriaa09), [@atik64](https://github.com/atik65), [mdyhakash](https://github.com/mdyhakash)
<div align="center">

<br />

  <img src="/public/skill_bridge.png" alt="ide" width="500"/>

### 🎯 NeoCampus: The All-in-One App

[Report Bug](https://github.com/Siratul804/NeoHire/issues) · [Request Feature](https://github.com/Siratul804/NeoHire/issues) · [Pull Request](https://github.com/Siratul804/NeoFetchHackathon/pulls) 

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

</div>

## 🌟 Overview

**NeoCampus** NeoCampus : The All-in-One App

## 🚀 Features

### 📍 Dashboard (`/dashboard`)

![alt text](/public/dash.png)


- Role based todo list
- Upcoming events
- Calender


### 📍 Cafeteria (`/Cafeteria-Menu`)

![alt text](/public/menu.png)


- Menu list
- Add to cart
- Place order


### 📍 Transportation (`/transportation`)

![alt text](/public/trans.png)


- Realtime bus track
- Track bus update
- Map


### 📍 Faculty-Schedules (`/Faculty-Schedules`)

![alt text](/public/faculty.png)


- Semester based routine
- Calender

### 📍 Faculty-Schedules (`/events-clubs`)

![alt text](/public/e1.png)
- Set event time

![alt text](/public/e2.png)
- Clubs 

![alt text](/public/e3.png)
-AI Event Recommender


### 📍 Announcements (`/updates-announcements`)

![alt text](/public/not.png)

- Realtime notifications


### 📍 Navigation (`/Navigation`)

![alt text](/public/map.png)

- Map
- Ar Mode


### 📍 NeoCampus AI (`/Neo-AI`)

![alt text](/public/chat.png)

- Ai Chatbot















## 🚀 Installation Guide

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB database
- Socket.io
- Required API keys:
  - Clerk (Authentication)
  - GROQ (AI)

### 🖥️ Local Development

1. **Clone and Install**

```bash
git clone https://github.com/Siratul804/NeoFetchHackathon.git
cd NeoCampus
npm install
```

2. **Setup Environment**

``` env
# database
MONGO_PASS=
MONGO=

# auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ai models
GROQ_API_KEY=

Start project : node server.mjs
```

3. **Start Development Server**

```bash
node server.mjs
# Open http://localhost:3000
```

### Troubleshooting

- **Environment**: Double-check API keys and MongoDB connection
- **Port Conflict**: Use `npm run dev -- -p 3001` for alternate port

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.1.7, React 19
- **Styling**: TailwindCSS, Shadcn/ui, Framer Motion
- **Components**: Radix UI
- **State**: React Context

### Backend & Infrastructure

- **Runtime**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Realtime**: Socket.io
- **Auth**: Clerk
- **Deployment**: Docker, Vercel
- **Analytics**: Vercel Analytics & Speed Insights

### AI/ML

- **Language Models**: GROQ llama-3.3-70b-versatile

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

Created by Team The Mavericks

