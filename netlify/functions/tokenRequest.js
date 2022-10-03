// need this because I'll be using my client ID and client secret

clientID = process.env.CLIENT_ID
console.log(clientID)
clientSecret = process.env.CLIENT_SECRET
console.log(clientSecret)

exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body)
    console.log('eventBody in tokenRequest: ', eventBody)
    let accessToken;
    fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `&grant_type=authorization_code&code=${eventBody.code}&redirect_uri=${eventBody.redirect}`
    })
    .then(res => res.json())
    .then(json => {
        accessToken = json.access_token
        console.log('access token in tokenrequest:',accessToken)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({'accessToken': accessToken}) // necessary data from fetch here
        }
    })
}