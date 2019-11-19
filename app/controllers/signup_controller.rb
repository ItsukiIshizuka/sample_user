class SignupController < ApplicationController

  def step1
    @user = User.new # 新規インスタンス作成
  end

  def step2
    # step1で入力された値をsessionに保存
    session[:email] = user_params[:email]
    session[:password] = user_params[:password]
    @user = User.new # 新規インスタンス作成
    @user.build_address
  end

  def step3
  end

  def create
    session[:nickname] = user_params[:nickname]
    session[:family_name] = user_params[:family_name]
    session[:first_name] = user_params[:first_name]
    session[:family_name_cana] = user_params[:family_name_cana]
    session[:first_name_cana] = user_params[:first_name_cana]
    @user = User.new(
      nickname: session[:nickname], # sessionに保存された値をインスタンスに渡す
      email: session[:email],
      password: session[:password],
      family_name: session[:family_name],
      first_name: session[:first_name],
      family_name_cana: session[:family_name_cana],
      first_name_cana: session[:first_name_cana]
    )
    @user.build_address(user_params[:address_attributes])
    if @user.save
      # ログインするための情報を保管
      session[:id] = @user.id
      redirect_to done_signup_index_path
    else
      puts "失敗"
      render '/signup/step1'
    end
  end

  def done
    sign_in User.find(session[:id]) unless user_signed_in?
  end

  private
  # 許可するキーを設定します
  def user_params
    params.require(:user).permit(
      :nickname,
      :email,
      :password,
      :family_name,
      :first_name,
      :family_name_cana,
      :first_name_cana,
      address_attributes: [:id, :family_name, :first_name]
    )
  end

end
