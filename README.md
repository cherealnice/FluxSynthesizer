# React Synthesizer

[Live Demo](http://flux-synth.herokuapp.com/)

A web-based keyboard implementing ReactJS which allows creating and loading tracks from a database and real-time computer-keyboard playing.

### Features

This synthesizer uses the Web Audio API to allow you to play in real-time, and also record and save tracks for later playback.  The keyboard is only active when CAPS lock is engaged, allowing the user to navitage while the app is open.

### React Components

* Organ
* Key
* Recorder
* Jukebox
* Track Player

These components follow Flux Application Architecture to render in real-time, and communicate with the database using AJAX requests for creating and loading tracks.

### Saveable Components

##### Note Roll

* Keeps track of every instance of a note being played vs time
* Upon playback, snapshots are taken over a 20ms interval of which notes were held down

##### Type of wave selected (sine, square, triangle, or sawtooth)

* Toggles AudioContext Oscillator #type

##### Chorus (on or off)

* Uses AudioContext Oscillator #detune to apply slight variations of tuning over 4 Oscillators

##### Octave

* Effects AudioContext Osillator #frequency, referencing a global object which maps frequencies to note values


### How to Run This Code

* Download this repository
* Install Rails and/or PostgreSQL (if necessary)
* Bundle install
* Create database/Run migrations
* Start Rails Server
* Open in browser
* Jam out on some funky tunes!
