from flask import Flask
from flask_cors import CORS

from app.web.db import db, init_db_command
from app.web.db import models
from app.web.config import Config
from app.web.hooks import load_logged_in_user, handle_error, add_headers
from app.web.views import (
    auth_views,
    pdf_views,
    client_views,
    conversation_views,
)


def create_app():
    app = Flask(__name__, static_folder="../../../frontend/build")
    app.url_map.strict_slashes = False
    app.config.from_object(Config)
    app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024   
    register_extensions(app)
    register_hooks(app)
    register_blueprints(app)

    return app


def register_extensions(app):
    db.init_app(app)
    app.cli.add_command(init_db_command)


def register_blueprints(app):
    app.register_blueprint(auth_views.bp)
    app.register_blueprint(pdf_views.bp)
    app.register_blueprint(conversation_views.bp)
    app.register_blueprint(client_views.bp)


def register_hooks(app):
    CORS(app)
    app.before_request(load_logged_in_user)
    app.after_request(add_headers)
    app.register_error_handler(Exception, handle_error)
