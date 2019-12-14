class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      t.references :category, forgin_key: true 
      t.references :delivery, forgin_key: true
      t.timestamps
    end
  end
end
