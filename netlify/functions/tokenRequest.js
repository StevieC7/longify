// need this because I'll be using my client ID and client secret
import fetch from 'node-fetch'

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body)
    console.log('redirect uri at tokenrequest:',eventBody.redirect)
    let accessToken = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `&grant_type=authorization_code&code=${eventBody.code}&redirect_uri=${eventBody.redirect}`
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        })
        .catch(err => console.log(err))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'accessToken': `${accessToken.access_token}`
            , 'tokenDuration': accessToken.expires_in
        }) // necessary data from fetch here
    }
}