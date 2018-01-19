require 'omniauth'
require 'ims/lti'
require 'oauth/request_proxy/rack_request'
require 'oauth/request_proxy/action_controller_request'

module OmniAuth
  module Strategies
    autoload :Lti, 'omniauth/strategies/lti'
  end
end
