# README

## Waffle

https://waffle.io/conradlempert/openhpigame

## Starting the server via Docker

1. Rename file `.env.sample` to `.env`
2. Run `$ docker-compose up`

## LTI

The app can act as a LTI Tool Provider through the `'/lti'` endpoint.
To start the quiz one must `post` to this endpoint according to the lti
specification.

 
LTI Secrets and Keys can be configured in `config/initializers/lti.rb`

The app is preconfigured for the key `openhpi` the corresponding secret 
must be specified in the `.env` file

## Important LTI Parameters

### lis_outcome_service_url
For updating the score

### launch_presentation_return_url
Url to return to after game was completed

