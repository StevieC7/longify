// imports and requires
// const fetch = require('node-fetch');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

// building request variables 
const clientID = process.env.CLIENT_ID;
const SPOTIFY_AUTH_URI = 'https://accounts.spotify.com/authorize?response_type=code&'
const redirectURL = `${process.env.redirect}`
const scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public user-library-read user-top-read user-read-recently-played')
const spotifyState = encodeURIComponent(uuidv4());

exports.handler = async function(event, context) {
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({'redirect': `${SPOTIFY_AUTH_URI}client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURL}&state=${spotifyState}`})
        }
}