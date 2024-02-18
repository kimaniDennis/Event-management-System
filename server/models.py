from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, nullable=False)
    event_name = db.Column(db.String)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    location = db.Column(db.String)
    description = db.Column(db.String)

class RSVP(db.Model):
    rsvp_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    event_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String)
    timestamp = db.Column(db.DateTime)

class Notification(db.Model):
    notification_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    event_id = db.Column(db.Integer)  # Add this line
    message = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    read_status = db.Column(db.String)
