// need this because I'll be using my client ID and client secret

clientID = process.env.CLIENT_ID
clientSecret = process.env.CLIENT_SECRET

exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body)
    console.log('eventBody in tokenRequest: ', eventBody)
    let access_token;
    let base64clientID = clientID.toString('base64')
    let base64clientSecret = clientSecret.toString('base64')
    console.log('base64 id:', base64clientID)
    console.log('base64 secret:',base64clientSecret)
    fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64clientID}:${base64clientSecret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${eventBody.code}&redirect_uri=${eventBody.redirect}`
    })
    .then(res => res.json())
    .then(json => console.log(json))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify('beep boop') // necessary data from fetch here
    }
}