# Node Project with Google Cloud Pub/Sub as Subscriber

Clone this repo for subscriber and [that](https://github.com/farizmamad/node-pubsub-publisher) repo for publisher. Then follow the instructions.

# Instructions

open terminal/command line.

## Define variables
```bash
$ PROJECT_ID=my-gcp-project-id
$ SERVICE_NAME=my-service-name
```

## Set gcloud config values
```bash
# set project
gcloud config project set-value $PROJECT_ID

# set region
gcloud config region set-value any-region-that-fit-the-project
```

## Build and store image to container registry
```bash
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
```

then go to ```Google Cloud Run Console```
https://console.cloud.google.com/gcr/images/$PROJECT_ID?authuser=1&project=$PROJECT_ID&supportedpurview=project

## Deploy to Cloud Run

then choose the image. On the latest one, click the ```triple dot button``` on the right. Click ```Deploy to Cloud Run```. Make sure you set the ```number of instances``` as required by your project. In learning phase, 1 is suggested. Allow unauthenticated or require authentication to user depends on the project. If access only allowed from the internal, then choose require authentication.

Wait for seconds, then the cloud run app should be up. 

To make the subscriber service triggered to respond the topic messages, a Cloud Run Invoker is needed. 

## Create Service Account with role Cloud Run Invoker

*Using Google Cloud Console*

Go to ```Google Cloud IAM & Admin > Service Accounts``` https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=1&project=$PROJECT_ID&supportedpurview=project. Click ```Create Service Account``` button.

Write down service account name. In this case name ```pubsub-cloud-run-invoker``` is suggested to make it clear what is its role. Click ```create and continue```.

Then, add new role. On the dropdown, select ```Cloud Run Invoker```. Nothing to do anymore, so click ```Done``` button.

*Using command line*

```bash
gcloud iam service-accounts create pubsub-cloud-run-invoker --display-name "PubSub Cloud Run Invoker"
```

## Register the Invoker as Triggerer

then go to ```Google Cloud Run Console```
https://console.cloud.google.com/gcr/images/$PROJECT_ID?authuser=1&project=$PROJECT_ID&supportedpurview=project

On the top, choose ```Trigger```. Then, click ```Add Eventarc Trigger```. Write down the trigger name. Then pick an event from ```Cloud Pub/Sub topic```.

Then click ```Save```.

---

Until this step, we are finish with the subscriber service. You may try to POST a request to publisher service while looking at the subscriber service log. The request message received by subscriber service from Pub/Sub topic should be printed on the log.

If the publisher service hasn't been deployed yet, walkthrough the guidance [here](https://github.com/farizmamad/node-pubsub-subscriber)
