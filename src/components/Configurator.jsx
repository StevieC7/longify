import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Slider, Button } from "@mui/material";

export default function Configurator({setUserConfig}) {
    const initialFormState = {songMix: 50, playLength: 3, sortMethod: 'altEpisodesFirst'}
    const [formState, setFormState] = useState(initialFormState)

    const handleClick = () => {
        setUserConfig(formState)
        setFormState(initialFormState)
    }

    const handleChange = async (e) => {
        await setFormState({...formState, [e.target.name]: e.target.value})
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
            <div className="configuration">
                <p>Song Mix</p>
                <Slider
                    name="songMix"
                    aria-label="Percent Songs"
                    defaultValue={50}
                    onChange={(e) => handleChange(e)}
                    valueLabelDisplay='off'
                    sx={{ color: '#B07BAC', '& .MuiSlider-markLabel': {fontSize: '0.6rem'}}}
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
                    sx={{color: '#B07BAC'}}
                    step={1}
                    min={3}
                    max={12}
                />
                <FormControl variant="filled" sx={{width: '100%', marginTop: '2rem', '& .MuiFormLabel-root': {color: '#B07BAC'}, '& .MuiInputLabel-root': {color: '#B07BAC'}, '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {color: '#B07BAC'}}}>
                    <InputLabel id="sort-method-label" sx={{'& .MuiInputLabel-root': {color: '#B07BAC'}, '& .MuiFormLabel-root': {color: '#B07BAC'}, '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {color: '#B07BAC'}}}>Sort</InputLabel>
                    <Select
                        disableUnderline
                        labelId="sort-method-label"
                        id="sort-method"
                        name="sortMethod"
                        value={formState.sortMethod}
                        label='Sort'
                        onChange={(e) => handleChange(e)}
                        >
                        <MenuItem value={'songsFirst'}>Songs first</MenuItem>
                        <MenuItem value={'episodesFirst'}>Podcasts first</MenuItem>
                        <MenuItem value={'altSongsFirst'}>Alternate, start with music</MenuItem>
                        <MenuItem value={'altEpisodesFirst'}>Alternate, start with a podcast</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button variant='contained' sx={{marginTop: '2rem', marginBottom: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}} onClick={() => handleClick()}>Get Playlist</Button>
        </div>
    )
}