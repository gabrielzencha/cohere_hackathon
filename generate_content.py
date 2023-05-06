from flask import Flask, request
from requests import Response
import requests
import json 
import cohere
from config import cohere_key
co = cohere.Client(cohere_key) # This is your trial API key
app = Flask(__name__)
# Temperature is a configuration hyperparameter that controls the randomness of language
# model output. A high temperature produces more unpredictable and creative results, 
# while a low temperature produces more common and conservative output. 
# https://txt.cohere.com/llm-parameters-best-outputs-language-ai/

@app.route('/test')
def test():
  comming_prompt = request.args.get("prompt", 'Create physics questions for children aged 18 about momentum')
  response = co.generate(
  model='command-xlarge-nightly',
  prompt=comming_prompt,
  max_tokens=1000,
  temperature=0.9,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
  print('Prediction: {}'.format(response.generations[0].text))
  # print('Prediction: {}'.format(response.generations[0].text))
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
