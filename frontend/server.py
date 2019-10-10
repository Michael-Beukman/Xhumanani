import json
import os

from flask import Flask, render_template, request, jsonify

import frontend.config as config

app = Flask(__name__)
from backend.chatbot import MyChatBot

names = [config.xh, config.de, config.en]
indicators = ['xh', 'de', 'en']
bots = [MyChatBot(name) for name in names]


@app.route('/', methods=["GET"])
def hello_world():
    return render_template('index.html')


@app.route("/get", methods=["POST"])
def get():
    text = request.form['text']
    language = request.form['language']
    # language = 'en'
    bot = bots[indicators.index(language)]
    response = str(bot.get_reply(text))

    d = json.dumps({'response': str(response)})
    return d


if __name__ == "__main__":
    Flask(__name__, template_folder="frontend/templates")
    app.run(debug=True)