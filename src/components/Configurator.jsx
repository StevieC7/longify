import { useState } from "react";
import { Slider } from "@mui/material";

export default function Configurator({setUserConfig}) {
    const initialFormState = {}
    const [formState, setFormState] = useState(initialFormState)

    console.log("Configurator has token:",localStorage.getItem('accessToken'))

    const handleClick = () => {
        setUserConfig(formState)
        setFormState(initialFormState)
    }

    const handleChange = async (e) => {
        await setFormState({...formState, [e.target.name]: e.target.value})
        console.log(formState)
    }

    const songMixMarks = [
        { 
            value: 30,
            label: 'Mostly Podcasts'
        },
        {
            value: 40,
            label: 'More Podcasts'
        },
        {
            value: 50,
            label: 'Even'
        },
        {
            value: 60,
            label: 'More Music'
        },
        {
            value: 70,
            label: 'Mostly Music'
        }
    ]

    return(
        <div className="configuration">
            {/* Add form here for user to configure their options */}
            <p>Song Mix</p>
            <div style={{maxWidth: '600px', margin: 'auto'}}>
                <Slider
                    name="songMix"
                    aria-label="Percent Songs"
                    defaultValue={50}
                    onChange={(e) => handleChange(e)}
                    valueLabelDisplay='off'
                    step={10}
                    marks={songMixMarks}
                    min={30} 
                    max={70} />
            </div>
            <button onClick={() => handleClick()}>Get Playlist</button>
        </div>
    )
}