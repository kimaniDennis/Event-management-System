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




class EventResource(Resource):
    def get(self, event_id=None):
        if event_id is None:
            # Fetch all events
            events = Event.query.all()
            events_dict = [
                {
                    'event_id': event.id,
                    'event_name': event.event_name,
                    'date': event.date,
                    'time': event.time.strftime('%H:%M:%S'),  # Convert time to string
                    'location': event.location,
                    'description': event.description,
                    'organizer_id': event.organizer_id
                } for event in events
            ]

            if events_dict:
                response = make_response(
                    jsonify(events_dict), 200
                )
                return response
            else:
                print("No data")
        else:
            # Fetch a specific event by ID
            event = Event.query.get(event_id)
            if event:
                event_dict = {
                    'event_id': event.id,
                    'event_name': event.event_name,
                    'date': event.date,
                    'time': event.time.strftime('%H:%M:%S'),  # Convert time to string
                    'location': event.location,
                    'description': event.description,
                    'organizer_id': event.organizer_id
                }
                response = make_response(
                    jsonify(event_dict), 200
                )
                return response
            else:
                print("Event not found")

    def post(self):
        data = request.get_json()
        new_event = Event(
            event_name=data['event_name'],
            date=data['date'],
            time=data['time'],
            location=data['location'],
            description=data['description'],
            organizer_id=data['organizer_id']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event created successfully'}), 201

class EventByID(Resource):
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        event_data = {
            'event_id': event.id,
            'event_name': event.event_name,
            'date': event.date,
            'time': event.time,
            'location': event.location,
            'description': event.description,
            'organizer_id': event.organizer_id
        }
        return jsonify({'event': event_data}), 200

    def put(self, event_id):
        event = Event.query.get_or_404(event_id)
        data = request.get_json()
        event.event_name = data['event_name']
        event.date = data['date']
        event.time = data['time']
        event.location = data['location']
        event.description = data['description']
        event.organizer_id = data['organizer_id']
        db.session.commit()
        return jsonify({'message': 'Event updated successfully'}), 200

    def delete(self, event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'}), 200
    
api.add_resource(SignupResource, "/signup")
api.add_resource(LoginResource, "/login")
api.add_resource(LogoutResource, "/logout")
api.add_resource(PublicResource, "/public")
api.add_resource(AuthResource, "/auth")
api.add_resource(CheckSessionResource, "/checksession")
api.add_resource(EventResource, '/events')
api.add_resource(EventByID, '/events/<int:event_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

