class Track < ActiveRecord::Base
  validates :name, :roll, :options, presence: true
end
