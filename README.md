# README

## Waffle

https://waffle.io/conradlempert/openhpigame


# Backend

## Services
The Backend is dockerized. The services are:

1. Web: Rails Server for handling LTI and rendering the frontend
2. Postgres: Database for persistence (not used at the moment)
3. Nginx: Reverse Proxy

To add or remove services you will need to edit the `docker-compose.yml`

## Starting the server via Docker

1. Rename file `.env.sample` to `.env`
2. Modify the values in `.env` **(for production)**
3. Run `$ docker-compose up`


## LTI (1.1)

The app can act as a LTI Tool Provider through the `'/lti'` endpoint.
To start the quiz one must `post` to this endpoint according to the **LTI 1.1** specification.

 
LTI Secrets and Keys can be configured in `config/initializers/lti.rb`

The app is preconfigured for the key `openhpi` the corresponding secret 
must be specified in the `.env` file

### Important LTI Parameters

```
lis_outcome_service_url // For updating the score
launch_presentation_return_url // Url to return to after game was completed
launch_presentation_locale // For setting the quiz locale ('de', 'en')
```
### Implementation

LTI connectivity is handled through the LTI Controller in `app/controllers/lti_controller.rb`

We expose three lti endpoints defined in `config/routes.rb`.

#### post '/lti'

The first endpoint is the entrypoint `'/lti'`, this is mapped to the `create` action of the LTI Controller. Here we save the recievied LTI parameters in the session and try to determine the correct locale.

```
  def create
    session[:lti_launch_params] = lti_params
    session[:locale] = lti_params.fetch('launch_presentation_locale', I18n.default_locale)
    redirect_to '/'
  end
```

#### post '/update_score'


The next endpoint handles the updating of the quiz score.
It is exposed as `'/update_score'` and maps to the `update_score`
action of the LTI Controller. This action is used by posting a score value to the endpoint. The Controller than first requests the current score of the user from the external outcome service and
compares it to the score that was posted. If the posted score is higher than the old score it is send back to the outcome service to be updated.

```
  def update_score
    unless tool_provider.nil?
      old_score = get_current_score
      score = params.permit(:score)[:score]
      if score > old_score
        response = tool_provider.post_replace_result!(score)
        if response.success? || response.processing?
          return render json: { score: score }
        else
          Rails.logger.warn('Outcome could not be posted. Response was: ')
          Rails.logger.warn(response.to_json)
          return render json: {errors: ['Error while transmitting score']}, status: 500
        end
      end
      render json: { score: old_score }
    end
  end
```

#### get '/quiz_finished'

This endpoint allows us to return to the tool provider once the quiz has finished. Here we simply redirect to the `launch_presentation_return_url` if it was passed to the `/lti` endpoint and saved to the session.

```
def return
  if @consumer_url.present?
    redirect_to @consumer_url
  end
end
  
def consumer_url
    @consumer_url ||= session.to_hash.dig('lti_launch_params', 'launch_presentation_return_url')
end
```


#### Tool Provider Object

The actual lti communication is handled trough the gems `ims-lti 1.1.3` and `omniauth-lti`. The gem `omniauth-lti` was added to the repository because changes were necessary to make it work with rails 5. If preferred you can extract it again.

The lti communication is handled through the `tool_provider` object, 
which is implemented by the `ims-lti` gem and initialized in the LTI Controller method `tool_provider`

Here we first check if lti params were saved to the session trough
`lti_launch_params`, which are defined by the `omniauth-lti` gem.
This is the same as calling `session[:lti_launch_params]` directly.
Then we extract the key and secret from the parameters and the configured credentials (`LTI_CREDENTIALS_HASH` in `config/initializers/lti.rb`).

Finally we create the tool_provider object and pass it the key, secret and the rest of the parameters.

This allows it to create a validated connection to the external tool consumer service.

```
  def tool_provider
    unless lti_launch_params.nil?
      key = lti_launch_params['oauth_consumer_key']
      secret = LTI_CREDENTIALS_HASH[key.to_sym]
      tool_provider = IMS::LTI::ToolProvider.new(key,
                                                 secret,
                                                 lti_launch_params)
    end
  end
```
We use the following two methods of this object.

```
// Post the passed score to the external tool consumer
tool_provider.post_replace_result!(score)

// Reads the current score from the external tool consumer
tool_provider.post_read_result!```

