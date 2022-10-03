// need this because I'll be using my client ID and client secret

clientID = process.env.CLIENT_ID
clientSecret = process.env.CLIENT_SECRET

exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body)
    console.log('eventBody in tokenRequest: ', eventBody)
    let access_token;
    fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic' + (new Buffer(clientID + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${eventBody.code}&redirect_uri=${eventBody.redirect}`
    })
    .then(res => {
        res.json()
    })
    .then(json => {
        console.log(json)
        // access_token = json.access_token
    })
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify('beep boop') // necessary data from fetch here
    }
}