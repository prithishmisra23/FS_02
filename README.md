# LeadFlow CRM 🚀

LeadFlow is a modern, full-stack CRM dashboard designed for small businesses to manage their website leads efficiently.

## ✨ Features

- **📊 Comprehensive Dashboard**: Real-time statistics including Total, New, Contacted, and Converted leads.
- **🏗️ Full CRUD Operations**: Effortlessly add, view, update status, and delete leads.
- **🔍 Advanced Lead Management**:
  - Filter by status (New, Contacted, Converted)
  - Search by Name or Email
- **🛡️ Data Integrity**: Validated forms and robust MongoDB backend.
- **🎨 Premium UI/UX**:
  - Modern SaaS aesthetic using TailwindCSS
  - Responsive design for mobile and desktop
  - Sleek animations and backdrop blurs
  - Status-colored badges and intuitive icons
- **🔔 Real-time Feedback**: Interactive toast notifications for all operations.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Axios, Lucide-React, React-Hot-Toast
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Environment**: Dotenv for secure configuration

## 📂 Project Structure

```text
FUTURE_FS_02/
├── client/             # Frontend React app
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages (Dashboard)
│   │   ├── services/   # API communication (Axios)
│   │   └── App.jsx
├── server/             # Backend Node.js app
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   ├── config/         # Database connection
│   └── server.js       # Entry point
└── .env                # Server configuration (ignored in git)
```

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account (for connection string)

### 1. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (if not present) and add your MongoDB URI:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev  # or node server.js
   ```

### 2. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` and the API at `http://localhost:5000`.

## 🌐 Deployment

- **Frontend**: Connect your repo to **Vercel**. Set the root directory to `client` and the build command to `npm run build`.
- **Backend**: Deploy on **Render**. Set the root directory to `server`, use `node server.js` as the start command, and add your `.env` variables in the dashboard.
- **Database**: Use **MongoDB Atlas** shared tier for free production-ready storage.

## 📸 Screenshots

_(Add screenshots here)_

---

Built with ❤️ by LeadFlow Team.
