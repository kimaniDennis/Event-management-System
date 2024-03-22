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
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    
    # Define relationships
    user = db.relationship('User', backref=db.backref('rsvps', lazy=True))
    event = db.relationship('Event', backref=db.backref('rsvps', lazy=True))



class Notification(db.Model):
    notification_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    event_id = db.Column(db.Integer)  # Add this line
    message = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    read_status = db.Column(db.String)
