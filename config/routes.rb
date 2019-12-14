Rails.application.routes.draw do
  devise_for :users
  
  resources :signup do
    collection do
      get 'step1'
      scope :step1 do
        get 'step2', to: 'signup#step2'# ここで、入力の全てが終了する
      end
      get 'done' # 登録完了後のページ
    end
  end

  resources :products do
    collection do
      get 'delivery_children'
      get 'category_children' 
      get 'category_grandchildren'
      get 'done'
    end
  end

end
