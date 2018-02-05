class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_locale

  include Omniauth::Lti::Context

  def set_locale
    I18n.locale = params[:locale] || session[:locale] || I18n.default_locale
  end
end
