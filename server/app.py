import os
from flask import Flask, request, make_response, jsonify, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators, IntegerField
from sqlalchemy.exc import IntegrityError
from models import db, Event, RSVP, Notification
from flask_cors import CORS
from flask_restful import reqparse
import jwt
from datetime import datetime, timedelta
from functools import wraps


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'G\xb2\xa4\xff\xc6~bM\xb9\x8c\xb3M'

db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)
migrate = Migrate(app, db)
CORS(app)





class EventsResource(Resource):
    def get(self):
        events = Event.query.all()
        result = []
        for event in events:
            event_data = {
                'event_id': event.id,
                'event_name': event.event_name,
                'date': event.date,
                'time': event.time,
                'location': event.location,
                'description': event.description,
                'organizer_id': event.organizer_id
            }
            result.append(event_data)
        return jsonify({'events': result}), 200

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

api.add_resource(EventsResource, '/events')
api.add_resource(EventByID, '/events/<int:event_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

