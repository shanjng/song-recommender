import React, { useState, useRef, useEffect } from 'react';
import { rgbToHex } from '../../utils/functions';
import { queueSong, queueAndPlaySong } from '../../utils/API';
import ColorThief from 'colorthief';
import * as IoIcons from 'react-icons/io';
import './Section.css';

const Section = (props) => {
    const [palette, setPalette] = useState('black');
    const [isLoaded, setIsLoaded] = useState(false);
    const song = props.song;
    const type = song.type;

    const myRef = useRef(null);

    useEffect(() => {
        console.log("Rerender of Section " + type)
    });
    
    const paletteUpdate = () => {
        const colorThief = new ColorThief();
        const img = myRef.current;
        const result = colorThief.getColor(img);
        
        setPalette(rgbToHex(...result));
    }

    const handleLoaded = () => {
        paletteUpdate();
        setIsLoaded(true);
    }

    return (
        <div style={isLoaded ? { backgroundColor: palette } : { display: 'none' }} className="section">
            <div className="section-info">
                <p>
                    <b>{ type }</b> <br />
                    {song.name === 'No Song Playing' ? '' : `${song.name} - ${song.artists}`}
                </p>
                <div className="img-wrapper">
                    <img 
                        src={song.imageUrl} 
                        alt=""
                        ref={myRef} 
                        crossOrigin={"anonymous"}
                        onLoad={handleLoaded}
                    /> 
                    <div className="play-button-overlay">
                        <IoIcons.IoMdPlay className="play-button-icon" onClick={() => queueAndPlaySong(song.id)}/>  
                    </div>
                </div>
                {
                    type === 'Recommendation' && 
                    (<div>
                    <button style={{ color: 'black' }} onClick={() => queueAndPlaySong(song.id)}>Play</button>
                    <button style={{ color: 'black' }} onClick={() => queueSong(song.id)}>Queue</button> 
                    <button style={{ color: 'black' }} onClick={() => queueSong(song.id)}>Next</button> 
                    </div>)
                }
            </div>
        </div>
    );
}

export default Section;