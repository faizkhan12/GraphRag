import os
from invoke import task


@task
def dev(ctx):
    ctx.run(
        "flask --app app.web run --port 8000 --host 0.0.0.0",
        pty=os.name != "nt",
        env={"APP_ENV": "development"},
    )

