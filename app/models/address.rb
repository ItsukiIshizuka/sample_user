class Address < ApplicationRecord
  validates :family_name, presence: true
  validates :first_name, presence: true

  belongs_to :users, optional: true
end
