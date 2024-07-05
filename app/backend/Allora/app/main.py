import requests
import sys
import json

def process(argument):
    url = f"http://localhost:8000/inference/{argument}"
    inference_response = requests.get(url)

    if inference_response.status_code == 200:
        inference = inference_response.json()
        # Your custom processing logic can be written here
        # Data must be provided in a `{"value":"<actual-value>"}` json format.
        response = json.dumps(inference['data'])
    else:
        response = json.dumps({"error": "Errors providing inference"})

    print(response)


if __name__ == "__main__":
    try:
      	topic_id = sys.argv[1]
        argument = sys.argv[2]
        process(argument)
    except Exception as e:
        response = json.dumps({"error": {str(e)}})
        print(response)
