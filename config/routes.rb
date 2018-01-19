Rails.application.routes.draw do
  get '/', to: 'game#index'
  post '/lti', to: 'lti#create'
  get '/quiz_finished', to: 'lti#post_outcome'
  get '/return_to_consumer', to: 'lti#return'
  get '/error' , to: 'lti#error'
end
