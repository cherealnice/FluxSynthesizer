class Track < ActiveRecord::Base
  validates :name, :roll, :options, :octave, presence: true
end
