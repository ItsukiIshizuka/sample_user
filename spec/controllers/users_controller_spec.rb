require 'rails_helper'

describe SignupController do

  describe 'GET #new' do

    user = FactoryBot.create(:user)

    it "renders the :step1 template" do
      get :step1
      expect(response).to render_template :step1
    end

    it "renders the :step2 template" do
      get :step2, params: { user: FactoryBot.attributes_for(:user) }
      expect(response).to render_template :step2
    end


  end

  describe 'POST #create' do
    it 'assigns @user' do
      post :create, params: { user: FactoryBot.attributes_for(:user) }
      expect(assigns(:user)).to eq user
    end
  end

end