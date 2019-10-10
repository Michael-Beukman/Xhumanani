import random
from chatterbot import ChatBot
import os
from chatterbot.trainers import ChatterBotCorpusTrainer

class MyChatBot:
    is_done = False

    def __init__(self, name):
        print(os.getcwd())
        self.name = name
        self.bot = ChatBot(name,
                           database_uri='sqlite:///../backend/databases/database{}.sqlite3'.format(name),
                           read_only=False)

    def get_reply(self, text):
        response = self.bot.get_response(text)
        response = str(response)
        if (response.find("$$") >=0):
            possibles = response.split('$$')
            possibles = [p for p in possibles if p.strip() !='']
            return random.choice(possibles)
        return response


    def train(self):
        return ChatterBotCorpusTrainer(self.bot)
