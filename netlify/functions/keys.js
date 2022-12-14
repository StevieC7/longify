exports.handler = async function(event, context) {
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'clientID': `${process.env.CLIENT_ID}`})
    }
}