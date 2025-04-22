import os
import jwt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
from functools import wraps
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from models import db, User, Event, RSVP, Notification  # Import models

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)
app.config["JWT_SECRET_KEY"] = os.urandom(24)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)
migrate = Migrate(app, db)
CORS(app)

# User Signup
class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return {"error": "Missing username, email, or password"}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(username=username, email=email, password=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User created successfully"}, 201
        except IntegrityError:
            db.session.rollback()
            return {"error": "Username or email already exists"}, 400

# User Login
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)  # Using user ID as identity
            return jsonify(access_token=access_token)
        return {"error": "Invalid username or password"}, 401

# Logout
class LogoutResource(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "Logout successful"}, 200

# Protected route to check session
class CheckSessionResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 401
    


@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

# Event Routes
@app.route('/events', methods=['GET'])
@jwt_required()
def get_user_events():
    user_id = get_jwt_identity()
    events = Event.query.filter_by(organizer_id=user_id).all()

    event_list = [{"event_id": e.id, "event_name": e.event_name, "location": e.location,
                   "description": e.description, "organizer_id": e.organizer_id} for e in events]

    return jsonify(event_list), 200


@app.route('/event', methods=['POST'])
@jwt_required()
def add_event():
    data = request.get_json()
    user_id = get_jwt_identity()

    event_name = data.get('event_name')
    location = data.get('location')
    description = data.get('description')

    if not event_name or not location or not description:
        return jsonify(message='Event not added! Missing required data.'), 400

    new_event = Event(event_name=event_name, location=location, description=description, organizer_id=user_id)

    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify(message='Event added successfully!'), 201
    except Exception as e:
        return jsonify(message='Error adding event', error=str(e)), 500


@app.route('/event/<int:event_id>', methods=['GET'])
@jwt_required()
def get_event(event_id):
    user_id = get_jwt_identity()
    event = Event.query.filter_by(id=event_id, organizer_id=user_id).first()

    if event:
        return jsonify({"event_id": event.id, "event_name": event.event_name,
                        "location": event.location, "description": event.description,
                        "organizer_id": event.organizer_id}), 200
    return jsonify({"error": "Event not found or unauthorized"}), 404


@app.route('/event/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    user_id = get_jwt_identity()
    event = Event.query.filter_by(id=event_id, organizer_id=user_id).first()

    if not event:
        return jsonify({"error": "Event not found or unauthorized"}), 404

    data = request.json
    event.event_name = data.get('event_name', event.event_name)
    event.location = data.get('location', event.location)
    event.description = data.get('description', event.description)

    db.session.commit()
    return jsonify({"message": "Event updated successfully!"}), 200


@app.route('/event/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    user_id = get_jwt_identity()
    event = Event.query.filter_by(id=event_id, organizer_id=user_id).first()

    if not event:
        return jsonify({"error": "Event not found or unauthorized"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully!"}), 200

# API Resources
api.add_resource(SignupResource, "/signup")
api.add_resource(LoginResource, "/login")
api.add_resource(LogoutResource, "/logout")
api.add_resource(CheckSessionResource, "/checksession")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
