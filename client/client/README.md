# Event Management System

## Overview
The **Event Management System** is a web-based application designed to help users create, manage, and attend events seamlessly. Built with **Flask (backend)** and **React (frontend)**, this system provides a user-friendly platform to organize and track events.

## Features
- **User Authentication:** Secure login and registration using JWT authentication.
- **Event Creation & Management:** Users can create, edit, and delete their own events.
- **Personalized Dashboard:** Users can view only the events they have created.
- **Event Listing:** Displays upcoming events with key details such as location and description.
- **Responsive UI:** A modern, mobile-friendly interface.

## Technologies Used
### Backend (Flask)
- Flask
- Flask-JWT-Extended (for authentication)
- Flask-SQLAlchemy (for database management)
- SQLite/PostgreSQL (for data storage)

### Frontend (React)
- React.js
- React Router (for navigation)
- Tailwind CSS (for styling)

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Python (3.8+)
- Node.js (16+)

### Backend Setup (Flask)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/event-management-system.git
   cd event-management-system/backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```sh
   flask run
   ```

### Frontend Setup (React)
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```

## Usage
1. Sign up or log in to the system.
2. Create an event from the dashboard.
3. View and manage your events.
4. Browse upcoming events.

## Future Improvements
- Event RSVP functionality.
- Integration with Google Calendar.
- Admin dashboard for event approvals.

## License
This project is licensed under the MIT License.

## Contributors
- **Dennis Kimani** - Developer

---
Feel free to contribute by submitting issues or pull requests!

