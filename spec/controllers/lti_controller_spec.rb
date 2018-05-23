require 'rails_helper'
require 'spec_helper'

RSpec.describe LtiController, type: :controller do 

	describe "GETtt #index" do
		it "returns http success" do
			get :index
			expect(response).to have_http_status(:success)
		end
	end
end