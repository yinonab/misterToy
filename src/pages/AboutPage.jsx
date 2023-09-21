import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { API_KEY } from '../../secret'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export function AboutPage() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    function goToLocation(target){
        const id=target.target.id
        if(id==='rehovot'){
        handleClick({lat: 31.894756, lng:34.809322})
        }
        if(id==='tel aviv'){
            handleClick({ lat: 32.0853, lng: 34.7818 })
        }
        if(id==='hadera'){
            handleClick({ lat:32.43983, lng: 34.91744 })
        }
        if(id==='bat yam'){
            handleClick({ lat:32.02379, lng:34.75185})
        }
        
    }

    return (

        <section>
            <div style={{ height: '70vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={coordinates}
                    defaultZoom={zoom}
                    onClick={handleClick}
                >
                    <AnyReactComponent
                        {...coordinates}
                        text="🚩"
                    />
                </GoogleMapReact>
            </div>
            <button id='tel aviv' onClick={goToLocation}>Tel-Aviv</button>
            <button id='hadera' onClick={goToLocation}>Hadera</button>
            <button id='bat yam' onClick={goToLocation}> Bat-Yam</button>
        </section>
    )
}