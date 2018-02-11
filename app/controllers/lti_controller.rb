class LtiController < ApplicationController
  skip_before_action :verify_authenticity_token


  def create
    session[:lti_launch_params] = lti_params
    session[:locale] = lti_params.fetch('launch_presentation_locale', I18n.default_locale)
    redirect_to '/'
  end

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

  def return
    if @consumer_url.present?
      redirect_to @consumer_url
    end
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
    unless lti_launch_params.nil?
      key = lti_launch_params['oauth_consumer_key']
      secret = LTI_CREDENTIALS_HASH[key.to_sym]
      tool_provider = IMS::LTI::ToolProvider.new(key,
                                                 secret,
                                                 lti_launch_params)
    end
  end

  def consumer_url
    @consumer_url ||= session.to_hash.dig('lti_launch_params', 'launch_presentation_return_url')
  end

  def get_current_score
    unless tool_provider.nil?
      response = tool_provider.post_read_result!
      if response.success?
        return response.score
      else
        Rails.logger.error('Score could not be read. Response was: ')
        Rails.logger.error(response.to_json)
        return 0
      end
    end
  end

end