import random

from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from backend.chatbot import MyChatBot

import frontend.config as config

chatbot = MyChatBot(config.en)
trainer = chatbot.train()
trainer.train("chatterbot.corpus.english")
trainer.train('corpora.misc')