class Product < ApplicationRecord
  has_many :product_images
  accepts_nested_attributes_for :product_images
  validates :name, numericality: { greater_than_or_equal_to: 2 }
  # belongs_to :category
  # belongs_to :delivery
  
end
