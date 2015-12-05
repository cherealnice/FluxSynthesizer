class AddOptionsToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :options, :json
  end
end
