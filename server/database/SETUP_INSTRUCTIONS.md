# 🚀 Quick Setup Guide - Baseball PWA

## Prerequisites
- Node.js (v14 or higher)
- XAMPP (for MySQL)
- Google account (for OAuth setup)

## Step-by-Step Setup

### 1️⃣ Database Setup (5 minutes)

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start "Apache" and "MySQL" modules

2. **Create Database**
   - Open browser: http://localhost/phpmyadmin
   - Click "New" in left sidebar
   - Database name: `baseball_pwa`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

3. **Import SQL Schema**
   - Select `baseball_pwa` database
   - Click "SQL" tab at the top
   - Open `database.sql` file from project
   - Copy ALL content
   - Paste into SQL query box
   - Click "Go" button
   - ✅ You should see "4 rows inserted" message

### 2️⃣ Backend Setup (3 minutes)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy example env file
   copy .env.example .env
   
   # Edit .env file with these values:
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=baseball_pwa
   JWT_SECRET=your_random_secret_key_here_change_this
   SESSION_SECRET=another_random_secret_here
   CLIENT_URL=http://localhost:3000
   ```

3. **Google OAuth Setup** (Optional - can skip for now)
   
   **IMPORTANT:** If you see "OAuth client was not found" error, either:
   - Skip Google login and use local authentication, OR
   - Follow these steps carefully:

   a. Go to: https://console.cloud.google.com/
   
   b. Create new project:
      - Click "Select a project" → "New Project"
      - Name: "Baseball PWA"
      - Click "Create"
   
   c. Configure OAuth consent screen:
      - Go to "APIs & Services" → "OAuth consent screen"
      - Select "External" → Click "Create"
      - App name: "Baseball PWA"
      - User support email: your email
      - Developer contact: your email
      - Click "Save and Continue"
      - Skip scopes → Click "Save and Continue"
      - Add test users (your email) → Click "Save and Continue"
   
   d. Create OAuth credentials:
      - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
      - Application type: "Web application"
      - Name: "Baseball PWA Client"
      - Authorized JavaScript origins:
        * http://localhost:3000
        * http://localhost:5000
      - Authorized redirect URIs:
        * http://localhost:5000/auth/google/callback
      - Click "Create"
      - Copy Client ID and Client Secret
   
   e. Update .env file:
     ```
     GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
     GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
     ```
   
   f. Restart your server:
     ```bash
     # Stop server (Ctrl+C)
     npm run server
     ```

### 3️⃣ Frontend Setup (2 minutes)

1. **Navigate to Client Folder**
   ```bash
   cd client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   # Create .env file in client folder
   echo REACT_APP_API_URL=http://localhost:5000 > .env
   ```

### 4️⃣ Run the Application

**Option A: Run Both Together (Recommended)**
```bash
# From root directory
npm run dev
```

**Option B: Run Separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend (new terminal)
cd client
npm start
```

### 5️⃣ Access the App

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- phpMyAdmin: http://localhost/phpmyadmin

## 🧪 Test the Application

### Test Local Authentication
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   - Username: `testplayer`
   - Email: `test@baseball.com`
   - Password: `password123`
4. Click "Register"
5. You should be redirected to Dashboard

### Test Task Management
1. Click "Tasks" in navigation
2. Click "+ New Task"
3. Create a task:
   - Title: "Batting Practice"
   - Category: Training
   - Priority: High
4. Click "Save Task"
5. Try editing and deleting tasks

### Test PWA Installation
1. Open in Chrome/Edge
2. Look for install icon in address bar (⊕)
3. Click "Install"
4. App opens as standalone application

### Test Offline Mode
1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Click "Service Workers"
4. Check "Offline" checkbox
5. Refresh page - should still work!

## 🐛 Troubleshooting

### Database Connection Error
- Check XAMPP MySQL is running
- Verify database name is `baseball_pwa`
- Check .env DB credentials

### Port Already in Use
```bash
# Change PORT in .env to different number
PORT=5001
```

### Google OAuth Not Working
- Skip for now, use local authentication
- Or verify redirect URI matches exactly

### React App Won't Start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📱 PWA Features to Test

1. **Install App** - Click install button in browser
2. **Offline Access** - Turn off internet, app still works
3. **Add to Home Screen** - On mobile, add to home screen
4. **Push Notifications** - (Future feature)

## ✅ Verification Checklist

- [ ] XAMPP MySQL running
- [ ] Database `baseball_pwa` created
- [ ] SQL schema imported successfully
- [ ] Backend .env configured
- [ ] Backend running on port 5000
- [ ] Frontend .env configured
- [ ] Frontend running on port 3000
- [ ] Can register new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] PWA installable
- [ ] Works offline

## 🎉 Success!

If all checks pass, your Baseball PWA is ready to use!

## 📞 Need Help?

Check the main README.md for detailed documentation.
