from flask import Flask
#from model import get_inference  # Importing the hypothetical model

app = Flask(__name__)

@app.route('/inference/<argument>')
def inference(argument):
    #inference_data = get_inference(argument)
    #return inference_data
    return "Inference data response for argument: " + argument

if __name__ == '__main__':
    app.run(host='0.0.0.0')

## http://localhost:5000/inference/{{1}}