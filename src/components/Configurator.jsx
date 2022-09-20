import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Slider, Button } from "@mui/material";

export default function Configurator({setUserConfig}) {
    const initialFormState = {songMix: 50, playLength: 3, sortMethod: 'episodesFirst'}
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
        <div className="configuration-wrapper">
            {/* Add form here for user to configure their options */}
            <div className="configuration">
                <p>Song Mix</p>
                <Slider
                    name="songMix"
                    aria-label="Percent Songs"
                    defaultValue={50}
                    onChange={(e) => handleChange(e)}
                    valueLabelDisplay='off'
                    sx={{ '& .MuiSlider-markLabel': {fontSize: '0.65rem'}}}
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
                <FormControl variant="filled">
                    <InputLabel id="sort-method-label">Sort Method</InputLabel>
                    <Select
                        labelId="sort-method-label"
                        id="sort-method"
                        name="sortMethod"
                        value={formState.sortMethod}
                        label='Sort Method'
                        onChange={(e) => handleChange(e)}
                        >
                        <MenuItem value={'songsFirst'}>Songs first</MenuItem>
                        <MenuItem value={'episodesFirst'}>Episodes first</MenuItem>
                        <MenuItem value={'altSongsFirst'}>Alternate, start with music</MenuItem>
                        <MenuItem value={'altEpisodesFirst'}>Alternate, start with a podcast</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button variant='contained' sx={{marginTop: '2rem'}} onClick={() => handleClick()}>Get Playlist</Button>
        </div>
    )
}