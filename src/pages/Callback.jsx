import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Callback(props) {
    const navigate = useNavigate()
    // write a regex to get the key-value pairs out of the url
    const getParametersFromHash = (url, parameter) => {
        let myRegex = new RegExp(parameter + '=([^&]+)(&|$)')
        let match = url.match(myRegex);
        return(match ? match[1] : 'none found');
    }
    // store the state and access token which I'll need later
    const state = getParametersFromHash(useLocation().hash, 'state')
    // eslint-disable-next-line
    const accessToken = getParametersFromHash(useLocation().hash, 'access\_token')
    localStorage.setItem('accessToken', accessToken)

    
    // TODO: write something to kick people out if the state returned doesn't match the state stored in local browser storage
    useEffect(() => {
        navigate('/make')
    })

    if (state !== localStorage.getItem('spotifyState')) {
        return(
            <>
            <p>Something has gone wrong. No hacking, please.</p>
        </>
        )
    }
    // redirect the user here using navigate 
    return(
        <>
            <p>This is where I'd put a redirect. IF I HAD ONE</p>
        </>
    )
}