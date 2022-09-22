# Longify
The mixed media playlist maker for Spotify. Combine podcasts and songs into one long playlist.

Website: https://www.longify.me

## Description
This app makes it easy to make long playlists that mix podcasts and music without having to dig through your library. It's intended to help you prep for road trips, long shifts, and any situation where you want control over your playlist and you need it to be long.

## Tech Stack
Longify uses: 
- React (via create-react-app) to build
- Vanilla fetch to access the Spotify API
- Material UI for styling of buttons and sliders

## Getting Started
To build your playlist, log in to Spotify through [Longify](https://www.longify.me), then configure your options and click 'get playlist.' This will generate a preview, which you can choose to add to your library or scrap before generating a new preview.

If you want to run this locally, fork and clone the main branch to your machine for a stable build. If you're feeling dangerous, fork and clone the dev branch. Be aware that you will have to configure the auth flow to work with your own Spotify API client id, because the production version stores sensitive information in the hosting service's environment.