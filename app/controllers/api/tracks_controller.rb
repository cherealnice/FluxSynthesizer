class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    debugger
    @track = Track.new(track_params)
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  ROLL_FILTER = {:roll => [:time, :notes => []]}
  OPTIONS_FILTER = {:options => [:wave, :chorus]}

  def track_params
    params.require(:track).permit(:name, ROLL_FILTER, OPTIONS_FILTER)
  end
end
