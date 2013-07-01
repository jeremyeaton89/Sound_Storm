class AddSeveralFieldsToUsers < ActiveRecord::Migration
  def change
  	change_table :users do |t|
  		t.string :first_name
  		t.string :last_name
  		t.text :bio
  		t.string :city
  		t.string :country_code
  		t.index :username
  	end 
  end
end
