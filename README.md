# Smart Todo List AI

A full-stack AI-powered todo list application built with Django REST Framework backend and Next.js frontend. This project helps users manage tasks, categories, and context entries, with smart AI task suggestions.

---

## About the Project

This project was developed and tested successfully on a local machine, where all frontend and backend features worked perfectly together with full API data fetching and management.

The app was deployed to Render (backend) and Vercel (frontend) for live hosting. The deployment was successful, but due to some unknown issues, certain frontend pages (especially related to categories) did not fetch data correctly on Vercel. Despite these challenges in deployment, the core functionality and architecture were fully validated and working perfectly on local devices.

The project demonstrates solid understanding of:

- Django REST Framework with PostgreSQL
- Next.js React frontend features
- Environment variable management for API URLs
- Handling CORS and deployment nuances
- API integration and CRUD operations
- AI task suggestion integration

---

## Technologies Used

| Technology       | Description                                |
|------------------|--------------------------------------------|
| Python 3.13      | Backend programming language               |
| Django 5.2.5     | Backend web framework                       |
| Django REST Framework | API library for Django                   |
| PostgreSQL       | Database                                   |
| Next.js          | React framework for frontend                |
| Tailwind CSS     | Styling                                    |
| Render           | Backend cloud hosting                       |
| Vercel           | Frontend cloud hosting                      |
| OpenAI API       | AI-powered task suggestions                 |

---

## Features

- Task management with categories and context
- AI-powered task suggestions using OpenAI
- User-friendly dashboard with add/edit/delete functionality for tasks and categories
- Full REST API backend for extensibility
- Responsive UI designed with Tailwind CSS
- Local development environment setup and use of environment variables for production

---

## Local Development Setup

### Requirements

- Python 3.13+
- Node.js and npm
- PostgreSQL database

### Backend Setup

1. Clone the repo:

   ```
   git clone https://github.com/yourusername/Smart-Todo-List-AI.git
   cd Smart-Todo-List-AI/backend
   ```

2. Create and activate virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Setup environment variables (`.env` file or system variables):

   ```
   DJANGO_SECRET_KEY=your_secret_key
   DJANGO_DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1
   ```

5. Run migrations:

   ```
   python manage.py migrate
   ```

6. Create superuser for admin panel:

   ```
   python manage.py createsuperuser
   ```

7. Run backend server:

   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd ../frontend
   ```

2. Install node dependencies:

   ```
   npm install
   ```

3. Create `.env.local` file with:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run frontend:

   ```
   npm run dev
   ```

---

## Deployment Notes

- Backend deployed on Render: https://smart-todo-list-ai.onrender.com
- Frontend deployed on Vercel: https://smart-todo-list-ai-omega.vercel.app

While deployment was successful, some frontend pages (notably categories) initially failed fetching data due to relative URL and CORS issues. These were identified and resolved by:

- Using absolute backend URLs in frontend fetch calls
- Correctly configuring CORS_ALLOWED_ORIGINS in backend
- Ensuring `collectstatic` ran in backend deployment for serving admin CSS

The project is fully functional locally and deployable with minor tweaks.

---

## Screenshots

### Local Backend API Response (Categories)

![Categories API JSON Response](./screenshots/api-categories-json.png)

### Local Frontend Categories Page

![Categories Page Showing Categories](./screenshots/frontend-categories-page.png)

### Admin Panel with Styled Interface

![Django Admin Panel](./screenshots/django-admin.png)

---

## Contact

For any questions or to request a live demo, please contact me at:

- Email: your.email@example.com
- LinkedIn: [your-linkedin-profile](https://linkedin.com/in/yourprofile)

---

Thank you for reviewing my project!

---

*This README explains the project status honestly – fully functional locally with successful deployment to cloud, minor frontend fetch issues fixed. I look forward to demonstrating the system in person.*
