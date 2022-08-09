"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def add_user():
    body = request.get_json()
    user = User(
    email = body["email"],
    password=body["password"],
    is_active=True
    )
    response_body = {
        "msg" : "user created",
        "user": user.serialize()
    }
    db.session.add(user)
    db.session.commit()
    return jsonify(response_body),201


@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    if len(users) <= 0:
        raise APIException("no user, please enter user, 401")
    all_users = list(map(lambda user: user.serialize(), users))    
    return jsonify(all_users),200

@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    return jsonify(user.serialize()),200


@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    db.session.delete(user)
    db.session.commit()
    res = {"msg":"user deleted"}
    return jsonify(res),200


@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200  


