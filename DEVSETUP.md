Python 3 backend setup in virtual environment

`workon authmark`

## Allora Setup

`allocmd generate worker --name <workerName> --topic <topicId> --env dev
cd <workerName>/worker`

workedname = "authmark_detect"
topicid = "1" // integer

// make sure docker is running
// make sure go/golang is installed

`allocmd generate worker --name authmark_detect --topic 1 --env dev
cd authmark_detect/worker`


mkdir -p authmark_detect/worker/data/head
mkdir -p authmark_detect/worker/data/worker
chmod -R 777 ./authmark_detect/worker/data/head
chmod -R 777 ./authmark_detect/worker/data/worker


# build from scratch

pip install gunicorn
pip install flask
pip freeze > requirements.txt

https://docs.allora.network/datasci/build-and-deploy-worker-from-scratch

Build
`docker build -t inference-server .`

Run
`docker run -p 8000:8000 inference-server
// endpoint http://127.0.0.1:8000/inference/AuthMark-DFD/2 //frame id

