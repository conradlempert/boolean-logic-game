class LtiController < ApplicationController
  skip_before_action :verify_authenticity_token


  def create
    session[:lti_launch_params] = lti_params
    redirect_to '/'
  end

  def post_outcome
    score = params.permit(:score)[:score]
    response = tool_provider.post_replace_result!(score)
    if response.success? || response.processing?
      redirect_to action: :return
    elsif response.unsupported?
      redirect_to :action, :error
    end
  end

  def return
    if consumer_url.present?
      Rails.logger.warn(consumer_url)
      redirect_to consumer_url
    end
  end

  def error
  end

  private

  def lti_params
    params.permit(%w{
      accept_media_types
      accept_multiple
      accept_presentation_document_targets
      accept_unsigned
      auto_create
      content_item_return_url
      context_id
      context_label
      context_title
      context_type
      launch_presentation_css_url
      launch_presentation_document_target
      launch_presentation_height
      launch_presentation_locale
      launch_presentation_return_url
      launch_presentation_width
      lis_course_offering_sourcedid
      lis_course_section_sourcedid
      lis_outcome_service_url
      lis_person_contact_email_primary
      lis_person_name_family
      lis_person_name_full
      lis_person_name_given
      lis_person_sourcedid
      lis_result_sourcedid
      lti_message_type
      lti_version
      oauth_callback
      oauth_consumer_key
      oauth_nonce
      oauth_signature
      oauth_signature_method
      oauth_timestamp
      oauth_version
      resource_link_description
      resource_link_id
      resource_link_title
      roles
      role_scope_mentor
      tool_consumer_info_product_family_code
      tool_consumer_info_version
      tool_consumer_instance_contact_email
      tool_consumer_instance_description
      tool_consumer_instance_guid
      tool_consumer_instance_name
      tool_consumer_instance_url
      user_id
      user_image
    })
  end

  def auth_hash
    request.env['omniauth.auth']
  end

  def tool_provider
    key = lti_launch_params['oauth_consumer_key']
    secret = LTI_CREDENTIALS_HASH[key.to_sym]
    tool_provider = IMS::LTI::ToolProvider.new(key,
                                               secret,
                                               lti_launch_params)
  end

  def consumer_url
    session.to_hash.dig('lti_launch_params', 'launch_presentation_return_url')
  end

end