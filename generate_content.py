from flask import Flask, request
from requests import Response
import requests
import json 
import cohere
from flask_cors import CORS
from config import cohere_key
co = cohere.Client(cohere_key) # This is your trial API key
app = Flask(__name__)
CORS(app)
# Temperature is a configuration hyperparameter that controls the randomness of language
# model output. A high temperature produces more unpredictable and creative results, 
# while a low temperature produces more common and conservative output. 
# https://txt.cohere.com/llm-parameters-best-outputs-language-ai/

@app.route('/summarize')
def summarize():
  text = request.args.get("prompt", 'Create questions for students from the text \" My name is John, I am 15 years old and I grew up in California\"')
  response = co.generate(
  model='command-xlarge-nightly',
  prompt="summarize the text \"" + text + "\"",
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  # #print('Prediction: {}'.format(response.generations[0].text))
  # #print('Prediction: {}'.format(response.generations[0].text))
  return (json.dumps({"response":response.generations[0].text}))

@app.route('/define_words')
def define_words():
  text = request.args.get("text", None)
  words = request.args.get("words", None)
  response = co.generate(
  model='command-xlarge-nightly',
  prompt="Define the following words " + words + " as used in \"" + text + "\"",
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  # #print('Prediction: {}'.format(response.generations[0].text))
  # #print('Prediction: {}'.format(response.generations[0].text))
  return (json.dumps({"response":response.generations[0].text}))
@app.route('/define_words_language')
def define_words_language():
  words = request.args.get("words", None)
  language = request.args.get("language", None)
  #print(words)
  #print(language)
  response = co.generate(
  model='command-xlarge-nightly',
  
  prompt="Define the following words " + words + " in " + language + " language",
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  # #print('Prediction: {}'.format(response.generations[0].text))
  # #print('Prediction: {}'.format(response.generations[0].text))
  return (json.dumps({"response":response.generations[0].text}))

@app.route('/gen_questions')
def gen_questions():
  text = request.args.get("text", None)
  response = co.generate(
  model='command-xlarge-nightly',
  prompt="Generate at most  10 questions from " + "\"" + text + "\"",
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  # #print('Prediction: {}'.format(response.generations[0].text))
  # #print('Prediction: {}'.format(response.generations[0].text))
  return (json.dumps({"response":response.generations[0].text}))

@app.route('/test')
def test():
  comming_prompt = request.args.get("prompt", 'define man using swahili language')
  response = co.generate(
  model='command-xlarge-nightly',
  prompt=comming_prompt,
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  #print('Prediction: {}'.format(response.generations[0].text))
  # #print('Prediction: {}'.format(response.generations[0].text))
  return (json.dumps({"response":response.generations[0].text}))

# response = co.generate(
#   model='command-xlarge-nightly',
#   prompt='Write a body paragraph about \"My promotion to the head of Machine Learning in Cohere\" in a blog post titled \"My 2024 promotion\"',
#   max_tokens=300,
#   temperature=0.9,
#   k=0,
#   stop_sequences=[],
#   return_likelihoods='NONE')

if __name__ == "__main__":
  app.run()
