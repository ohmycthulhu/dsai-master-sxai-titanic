from flask import Flask
from flask_cors import CORS
# import logging
from app import config as server_config
from app.cache import cache

def get_app():
    tmp = Flask(__name__)
    tmp.config.from_object(server_config)
    cache.init_app(tmp)
    CORS(tmp)
    return tmp


server = get_app()


from app import routes  # NOQA
