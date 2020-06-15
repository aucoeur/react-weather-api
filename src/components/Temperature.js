import React from 'react';

function Temperature(props) {
    const { temp, temp_min, temp_max}  = props
    return (
        <div>
            <div>Temp: {temp}</div>
            <div>Temp Min: {temp_min} Max:{temp_max}</div>
        </div>
    )
}

export default Temperature;