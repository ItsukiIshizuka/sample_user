class ProductsController < ApplicationController
  
  def new
    @product = Product.new
    @product.product_images.build
    @category = Category.all.order("id ASC").limit(2) # categoryの親を取得
    @delivery = Delivery.all.order("id ASC").limit(2) # deliveryの親
  end

  def delivery_children  
    @delivery_children = Delivery.find(params[:productdelivery]).children
  end

  def category_children  
    @category_children = Category.find(params[:productcategory]).children 
  end
  # Ajax通信で送られてきたデータをparamsで受け取り､childrenで子を取得

  def category_grandchildren
    @category_grandchildren = Category.find(params[:productcategory]).children
  end

  def create

    @parents = Category.all.order("id ASC").limit(2)
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        params[:product_images][":image"].each do |a|
          @product.product_images.create!(image: a, product_id: @product.id)
        end
        format.html{redirect_to done_products_path}
      else
        @product.product_images.build
        format.html{render action: 'new'}
      end
    end
  end 

  def show
    @product = Product.find(4)
    @id = @product.category_id
    @category = Category.find(@id)
    @parents = Category.all.order("id ASC").limit(2)
  end


  def done
    puts "おめで！"
  end


  def product_params
    params.require(:product).permit(:name, product_images_attributes: [:image])
  end

end
