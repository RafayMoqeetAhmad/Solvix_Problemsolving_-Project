# Solvix - Setup Instructions

## Quick Start Guide

### Step 1: Extract the Project
Extract the `solvix-app.zip` file to your desired location.

### Step 2: Install Dependencies
Open a terminal/command prompt in the project directory and run:
```bash
npm install
```

This will install all required dependencies:
- react
- react-dom
- react-router-dom
- react-scripts

### Step 3: Start the Application
After installation is complete, run:
```bash
npm start
```

The application will automatically open in your default browser at `http://localhost:3000`

### Step 4: Login
Use one of the following demo credentials:

**User Account:**
- Username: `user`
- Password: `user123`

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## Application Features

### User Features:
1. **Submit Problems**: Navigate to "Submit Problem" to add a new problem
2. **View Solutions**: Get instant AI-powered solutions with step-by-step guides
3. **My Problems**: View all your submitted problems, rate solutions, and manage them
4. **Tutorials**: Browse comprehensive tutorials by category
5. **Dashboard**: View your statistics and recent activity

### Admin Features:
1. **Platform Analytics**: View total users, problems, and success rates
2. **Problem Management**: Monitor and manage all user submissions
3. **Tutorial Management**: Add new tutorials or remove existing ones
4. **Statistics Dashboard**: Track platform performance and user engagement

## Problem Categories

The app supports the following problem categories:
- Technical (Computer, devices, software issues)
- Household (Home maintenance, repairs)
- Scheduling (Time management, planning)
- Writing (Content creation, communication)
- Financial (Budgeting, financial planning)
- Health (Wellness, fitness)
- Education (Learning, studying)
- Other (Miscellaneous problems)

## Project Structure

```
solvix-app/
├── public/                 # Static files
│   └── index.html
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   └── Navbar.js
│   ├── pages/             # Page components
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── SubmitProblem.js
│   │   ├── MyProblems.js
│   │   ├── Tutorials.js
│   │   └── Admin.js
│   ├── data/              # Mock data
│   │   └── mockData.js
│   ├── styles/            # CSS files
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   ├── SubmitProblem.css
│   │   ├── MyProblems.css
│   │   ├── Tutorials.css
│   │   └── Admin.css
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── package.json           # Dependencies
└── README.md             # Documentation
```

## Troubleshooting

### Issue: npm install fails
**Solution**: Make sure you have Node.js (v14 or higher) installed. Download from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: Either close the application using port 3000 or run:
```bash
PORT=3001 npm start
```

### Issue: Dependencies error
**Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again.

## Building for Production

To create a production-ready build:
```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## Deployment Options

The app can be deployed to:
1. **Vercel**: `npm install -g vercel` then `vercel`
2. **Netlify**: Drag and drop the `build` folder to netlify.com
3. **GitHub Pages**: Use `gh-pages` package
4. **Heroku**: Follow Heroku's React deployment guide

## Data Persistence Note

This is a frontend-only demo application. All data is stored in the browser's memory and will be reset when you refresh the page. For a production version, you would need to:
1. Implement a backend API (Node.js/Express)
2. Connect to a database (MongoDB/MySQL)
3. Add proper authentication and authorization
4. Implement API endpoints for CRUD operations

## Development

To make changes to the application:
1. Edit files in the `src` directory
2. Changes will automatically reload in the browser
3. Test your changes
4. Run `npm run build` to create production build

## Support

For issues or questions:
1. Check the README.md file
2. Review the code comments
3. Ensure all dependencies are properly installed

---

Enjoy using Solvix! 🔧
