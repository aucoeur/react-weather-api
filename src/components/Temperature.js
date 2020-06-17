import React from 'react';

function Temperature(props) {
    const { temp, temp_min, temp_max}  = props
    function convertF(temp) {
        return (temp * (9/5) - 459.67).toFixed(2)
    }

    return (
        <div>
            <div>Temp: {convertF(temp)}° F</div>
            <div>Temp Min: {convertF(temp_min)}° F Max: {convertF(temp_max)}° F</div>
        </div>
    )
}

export default Temperature;