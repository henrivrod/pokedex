class CreatePokeTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :poke_types do |t|
      t.references :pokemon, null: false, foreign_key: true
      t.references :type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
