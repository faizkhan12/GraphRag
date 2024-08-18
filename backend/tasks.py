import os
from invoke import task


@task
def dev(ctx):
    ctx.run(
        "flask --app app.web run --port 8000 ",
        pty=os.name != "nt",
        env={"APP_ENV": "development"},
    )

