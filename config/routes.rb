Rails.application.routes.draw do
  get '/', to: 'game#index'
  post '/lti', to: 'lti#create'
  post '/update_score', to: 'lti#update_score'
  get '/quiz_finished', to: 'lti#return'
end