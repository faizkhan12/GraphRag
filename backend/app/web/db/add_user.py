

from app.web.db.models import User
from werkzeug.security import generate_password_hash
import click

from flask import current_app

@click.command("add-user")
@click.argument("email")
@click.argument("password")
def add_user_command(email, password):
    with current_app.app_context():
        try:
            user_obj = User.query.filter_by(email=email).first()
            if user_obj:
                click.echo("user already exists.")
                return
            user = User.create(email=email, password=generate_password_hash(password))
            click.echo("created user successfully.", user.as_dict())
        except Exception as e:
            print(e)
            click.echo("failed to create user.")