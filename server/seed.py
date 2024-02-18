from datetime import datetime
from models import db, User, Event, RSVP, Notification
from flask import Flask

app = Flask(__name__)

# Set up the app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

def seed_data():
    with app.app_context():
        # Create some users
        user1 = User(username='denniskimani', email='denniskimani@gmail.com', password='123456')
        user2 = User(username='tracywambui', email='tracywambui@gmail.com', password='123456')
        user3 = User(username='tevinjoshua', email='tevinjoshua@gmail.com', password='123456')
        user4 = User(username='alexwarui' ,  email='alexwarui@gmail.com', password='123456')
        user5 = User(username='abbyreithi',  email='abbyreithi@gmail.com', password='123456')

        # Create some events
        event1 = Event(organizer_id=1, event_name='Dennis', date=datetime.now(), time=datetime.now().time(), location='Uhuru Gardens', description='Wakadinali Concert')
        event2 = Event(organizer_id=2, event_name='Tracy', date=datetime.now(), time=datetime.now().time(), location='Oak Place', description='Meet and Greet')
        event3 = Event(organizer_id=3, event_name='Tevin', date=datetime.now(), time=datetime.now().time(), location='Sarit Center', description='Gamers and Inventors Festival')
        event4 = Event(organizer_id=4, event_name='Alex', date=datetime.now(), time=datetime.now().time(), location='Quiver Hq', description='HipHop and R&B gig')
        event5 = Event(organizer_id=5, event_name='Abby', date=datetime.now(), time=datetime.now().time(), location='Water Front', description='Cooking Show')

        # Create some RSVPs
        rsvp1 = RSVP(user_id=1, event_id=1, status='Going', timestamp=datetime.now())
        rsvp2 = RSVP(user_id=2, event_id=1, status='Not going', timestamp=datetime.now())
        rsvp3 = RSVP(user_id=3, event_id=2, status='Maybe', timestamp=datetime.now())
        rsvp4 = RSVP(user_id=4,  event_id=4, status='Thinking about it', timestamp=datetime.now())
        rsvp5 = RSVP(user_id=5,  event_id=5, status='Rain check', timestamp=datetime.now())

        # Create some notifications
        notification1 = Notification(sender_id=1, recipient_id=2, event_id=1, message='Notification 1', timestamp=datetime.now(), read_status='Unread')
        notification2 = Notification(sender_id=2, recipient_id=3, event_id=2, message='Notification 2', timestamp=datetime.now(), read_status='Unread')
        notification3 = Notification(sender_id=3, recipient_id=1, event_id=3, message='Notification 3', timestamp=datetime.now(), read_status='Unread')
        notification4 = Notification(sender_id=4, recipient_id=3, event_id=1, message='Notification 4', timestamp=datetime.now(), read_status='Unread')
        notification5 = Notification(sender_id=5, recipient_id=4, event_id=2, message='Notification 5', timestamp=datetime.now(), read_status='Unread')

        # Add objects to the session
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.add(user5)
        db.session.add(event1)
        db.session.add(event2)
        db.session.add(event3)
        db.session.add(event4)
        db.session.add(event5)
        db.session.add(rsvp1)
        db.session.add(rsvp2)
        db.session.add(rsvp3)
        db.session.add(rsvp4)
        db.session.add(rsvp5)
        db.session.add(notification1)
        db.session.add(notification2)
        db.session.add(notification3)
        db.session.add(notification4)
        db.session.add(notification5)

        # Commit the changes
        db.session.commit()

# Call the function to seed the data
if __name__ == "__main__":
    seed_data()
