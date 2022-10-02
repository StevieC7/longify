// need this because I'll be using my client ID and client secret

const { json } = require("react-router-dom");

clientID = process.env.CLIENT_ID
clientSecret = process.env.CLIENT_SECRET

exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body)
    let access_token;
    fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic <base64 encoded ${clientID}:${clientSecret}>`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${eventBody.code}&redirect_uri=${eventBody.redirect}`
    })
    .then(res => res.json())
    .then(json => {
        access_token = json.access_token
        console.log(access_token)
    })
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({'access_token': access_token}) // necessary data from fetch here
    }
}