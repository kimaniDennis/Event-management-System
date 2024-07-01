import os
import jwt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask import Flask, request, make_response, jsonify, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators, IntegerField
from sqlalchemy.exc import IntegrityError
from models import db, User, Event, RSVP, Notification
from flask_cors import CORS
from flask_restful import reqparse
import jwt
from datetime import datetime, timedelta
from functools import wraps
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'G\xb2\xa4\xff\xc6~bM\xb9\x8c\xb3M'
app.config["JWT_SECRET_KEY"] = b"BM3\x1d\x16z!\x0e:\x8b&\xe6"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)
migrate = Migrate(app, db)
CORS(app)


class SignupResource(Resource):
    def post(self):
        # Parse incoming JSON data
        data = request.get_json(force=True)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Validate data
        if not username or not email or not password:
            return {"error": "Missing username, email, or password"}, 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password)

        # Create the user
        new_user = User(username=username, email=email, password=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User created successfully"}, 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Username or email already exists"}, 400


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"error": "Missing username or password"}, 400

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token)
        else:
            return {"error": "Invalid username or password"}, 401


class LogoutResource(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "Logout successful"}, 200


class PublicResource(Resource):
    def get(self):
        return "for public"


class AuthResource(Resource):
    @jwt_required()
    def get(self):
        return "JWT is verified. Welcome to your dashboard"


class CheckSessionResource(Resource):
    @jwt_required()
    def get(self):
        # Use the JWT identity to fetch the user details
        username = get_jwt_identity()
        user = User.query.filter_by(username=username).first()
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 401




@app.route('/events', methods=['GET'])
def get_events():
        events = Event.query.all()
        event_list = []
        for event in events:
            event_data ={
                    'event_id': event.id,
                    'event_name': event.event_name,
                    'location': event.location,
                    'description': event.description,
                    'organizer_id': event.organizer_id
                }
            event_list.append(event_data)
            return jsonify(event_list), 200


@app.route('/event/<int:event_id>', methods = ['GET'])
def get_event(event_id):
        event = Event.query.get(event_id)
        if event:
            event_data = {
                'event_id': event.id,
                'event_name': event.event_name,
                'location': event.location,
                'description': event.description,
                'organizer_id': event.organizer_id
            }
            return jsonify(event_data),200
        else:
            return jsonify({"error": "Event not found"}), 404


@app.route('/event', methods=['POST'])
def add_event():
    data = request.get_json()
    print("Received JSON data",data)
    event_name = data.get('event_name', None)
    location = data.get('location',None)
    description = data.get('description', None)
    organizer_id = data.get('organizer_id', None)

    if event_name and location and description and organizer_id is not None:
        new_event = Event(event_name=event_name, location=location,description=description,organizer_id=organizer_id)
        db.session.add(new_event)
        db.session.commit()
        return jsonify(message='Event added successfully!'),201
    else:
        return jsonify(message='Event not added! Something is wrong!'),400



@app.route('/event/<int:event_id>', methods = ['PUT'])
def update_event(event_id):
    event = Event.query.get(event_id)
    if event:
        data = request.json
        event.event_name = data.get('event_name', event.event_name)
        event.location = data.get('location', event.location)
        event.description = data.get('description', event.description)
        db.session.commit()
        return jsonify({"message": "Event updated successfully!"}), 200
    else:
        return jsonify({"error": "Event not found"}),404
    

@app.route('/event/<int:event_id>', methods = ['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully"}), 200
    else:
        return jsonify({"error":"Event not found"}), 404
    


@app.route('/rsvps', methods=['GET'])
def get_rsvps():
    rsvps = RSVP.query.all()   
    rsvp_list = []
    for rsvp in rsvps:
            rsvp_data = {
                "id":rsvp.id,
                "user_id":rsvp.user.id,
                "event_id":rsvp.event.id,
                "status":rsvp.status,
                "timestamp":rsvp.timestamp,
            }
            rsvp_list.append(rsvp_data)
            return jsonify(rsvp_list),200
        
@app.route('/rsvp/<int:rsvp_id>', methods = ['GET'])
def get_rsvp(rsvp_id):
        rsvp = RSVP.query.get(rsvp_id)
        if rsvp:
            rsvp_data = {
                "id":rsvp.id,
                "user_id":rsvp.user.id,
                "event_id":rsvp.event.id,
                "status":rsvp.status,
                "timestamp":rsvp.timestamp,
            }
            return jsonify(rsvp_data), 200
        else:
            return jsonify({"error":"Event not found"}), 404
        
@app.route('/rsvp', methods=['POST'])
def add_rsvp():
    data = request.get_json()
    print("Received JSON data:", data)
    user_id = data.get('user_id', None)
    event_id = data.get('event_id', None)
    status = data.get('status', None)
    timestamp_str = data.get('timestamp', None)
    if user_id and event_id and status and timestamp_str is not None:
        timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S")
        new_rsvp = RSVP(user_id=user_id, event_id=event_id, status=status, timestamp=timestamp)
        db.session.add(new_rsvp)
        db.session.commit()
        return jsonify(message='RSVP added successfully'), 201
    else:
        return jsonify(message='RSVP not added'), 400
    
@app.route('/rsvp/<int:rsvp_id>', methods = ['PUT'])
def upgrade_rsvp(rsvp_id):
    rsvp = RSVP.query.get(rsvp_id)
    if rsvp:
        data = request.json
        status = data.get('status',rsvp.status)
        rsvp.status = status
        db.session.commit()
        return jsonify({"message":"RSVP updated successfully!"}), 200
    else:
        return jsonify({"error":"RSVP not found"}), 404
    
@app.route('/rsvp/<int:rsvp_id>', methods = ['DELETE'])
def delete_rsvp(rsvp_id):
    rsvp = RSVP.query.get(rsvp_id)
    if rsvp:
        db.session.delete(rsvp)
        db.session.commit()
        return jsonify({"message": "RSVP delete successfully!!"}), 200
    else:
        return jsonify({"error":"RSVP not found!!"}), 404
        
def send_email_notification(sender_email, sender_password, receiver_email, subject, message):
    smtp_server = "smtp.gmail.com"  # Replace with your SMTP server
    port = 587  
    sender_name = "Event Brite"  
    
    msg = MIMEMultipart()
    msg['From'] = f"{sender_name} <{sender_email}>"
    msg['To'] = receiver_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        server = smtplib.SMTP(smtp_server, port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        print("Notification email sent successfully!")
    except Exception as e:
        print("An error occurred while sending the notification email:", str(e))
    finally:
        server.quit()

class SendNotification(Resource):
    def post(self):
        sender_email = "your-email@example.com"
        sender_password = "your-email-password"
        data = request.get_json()
        receiver_email = data.get('receiver_email')
        subject = "Notification from Your Application"
        message = "Hello,\n\nThis is a notification from your application. Have a great day!"
        
        send_email_notification(sender_email, sender_password, receiver_email, subject, message)
        return {"message": "Notification sent successfully"}, 200




api.add_resource(SignupResource, "/signup")
api.add_resource(LoginResource, "/login")
api.add_resource(LogoutResource, "/logout")
api.add_resource(PublicResource, "/public")
api.add_resource(AuthResource, "/auth")
api.add_resource(CheckSessionResource, "/checksession")


api.add_resource(SendNotification, '/send_notification')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

