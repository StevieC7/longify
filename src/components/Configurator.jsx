import { useState } from "react";
import { Slider } from "@mui/material";

export default function Configurator({setUserConfig}) {
    const initialFormState = {songMix: 50, playLength: 3}
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
            <div style={{maxWidth: '600px', margin: 'auto'}}>
                <p>Song Mix</p>
                <Slider
                    name="songMix"
                    aria-label="Percent Songs"
                    defaultValue={50}
                    onChange={(e) => handleChange(e)}
                    valueLabelDisplay='off'
                    step={10}
                    track={false}
                    marks={songMixMarks}
                    min={30} 
                    max={70} 
                    />
                <p>Play Length</p>
                <Slider
                    name="playLength"
                    aria-label="Time to Fill"
                    defaultValue={3}
                    onChange={(e) => handleChange(e)}
                    valueLabelDisplay='on'
                    step={1}
                    min={3}
                    max={12}
                />
            </div>
            <button onClick={() => handleClick()}>Get Playlist</button>
        </div>
    )
}