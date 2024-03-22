from app import db, app, User, Event, RSVP, Notification
from datetime import datetime

with app.app_context():
    db.drop_all()

    # Create all tables
    db.create_all()

    # List of user data to insert into the database
    users_data = [
        {'username': 'User1', 'email': 'user1@gmail.com', 'password': '123456'},
        {'username': 'User2', 'email': 'user2@gmail.com', 'password': '123456'},
        {'username': 'User3', 'email': 'user3@gmail.com', 'password': '123456'},
        {'username': 'User4', 'email': 'user4@gmail.com', 'password': '123456'},
        {'username': 'User5', 'email': 'user5@gmail.com', 'password': '123456'}
    ]

    for user_data in users_data:
        # Check if the username already exists
        existing_user = User.query.filter_by(username=user_data['username']).first()
        if existing_user:
            print(f"Username '{user_data['username']}' already exists. Skipping insertion.")
        else:
            # Insert the user if the username doesn't exist
            new_user = User(**user_data)
            db.session.add(new_user)

    # Commit the changes to the database
    db.session.commit()

    # Create some events
    events_data = [
        {'organizer_id': 1, 'event_name': 'Dennis', 'date': datetime.now(), 'time': datetime.now().time(),
         'location': 'Uhuru Gardens', 'description': 'Wakadinali Concert'},
        {'organizer_id': 2, 'event_name': 'Tracy', 'date': datetime.now(), 'time': datetime.now().time(),
         'location': 'Oak Place', 'description': 'Meet and Greet'},
        {'organizer_id': 3, 'event_name': 'Tevin', 'date': datetime.now(), 'time': datetime.now().time(),
         'location': 'Sarit Center', 'description': 'Gamers and Inventors Festival'},
        {'organizer_id': 4, 'event_name': 'Alex', 'date': datetime.now(), 'time': datetime.now().time(),
         'location': 'Quiver Hq', 'description': 'HipHop and R&B gig'},
        {'organizer_id': 5, 'event_name': 'Abby', 'date': datetime.now(), 'time': datetime.now().time(),
         'location': 'Water Front', 'description': 'Cooking Show'}
    ]

    for event_data in events_data:
        new_event = Event(**event_data)
        db.session.add(new_event)

    # Commit the changes to the database
    db.session.commit()

    # Create some RSVPs
    rsvps_data = [
        {'id': 1, 'user_id': 1, 'event_id': 1, 'status': 'Going', 'timestamp': datetime.now()},
        {'id': 2, 'user_id': 2, 'event_id': 1, 'status': 'Not going', 'timestamp': datetime.now()},
        {'id': 3, 'user_id': 3, 'event_id': 2, 'status': 'Maybe', 'timestamp': datetime.now()},
        {'id': 4, 'user_id': 4, 'event_id': 4, 'status': 'Thinking about it', 'timestamp': datetime.now()},
        {'id': 5, 'user_id': 5, 'event_id': 5, 'status': 'Rain check', 'timestamp': datetime.now()}
    ]

    for rsvp_data in rsvps_data:
        new_rsvp = RSVP(**rsvp_data)
        db.session.add(new_rsvp)

    # Commit the changes to the database
    db.session.commit()

    # Create some notifications
    notifications_data = [
        {'sender_id': 1, 'recipient_id': 2, 'event_id': 1, 'message': 'Notification 1', 'timestamp': datetime.now(),
         'read_status': 'Unread'},
        {'sender_id': 2, 'recipient_id': 3, 'event_id': 2, 'message': 'Notification 2', 'timestamp': datetime.now(),
         'read_status': 'Unread'},
        {'sender_id': 3, 'recipient_id': 1, 'event_id': 3, 'message': 'Notification 3', 'timestamp': datetime.now(),
         'read_status': 'Unread'},
        {'sender_id': 4, 'recipient_id': 3, 'event_id': 1, 'message': 'Notification 4', 'timestamp': datetime.now(),
         'read_status': 'Unread'},
        {'sender_id': 5, 'recipient_id': 4, 'event_id': 2, 'message': 'Notification 5', 'timestamp': datetime.now(),
         'read_status': 'Unread'}
    ]

    for notification_data in notifications_data:
        new_notification = Notification(**notification_data)
        db.session.add(new_notification)

    # Commit the changes to the database
    db.session.commit()

