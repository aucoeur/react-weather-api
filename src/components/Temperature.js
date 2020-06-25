import React from 'react';

function Temperature(props) {
    const { temp, temp_min, temp_max, unit }  = props

    function convert(temp, unit) {
        if (unit === 'F') {
            return (temp * (9/5) - 459.67).toFixed(1) + '°' + unit
        } else if ( unit === 'C') {
            return (temp - 273.15).toFixed(1) + '°' + unit
        }
        return (temp + unit)
    }

    return (
        <div>
            <div>Temp: {convert(temp, unit)}</div>
            <div>Temp Min: {convert(temp_min, unit)}<br /> Temp Max: {convert(temp_max, unit)}</div>
        </div>
    )
}

export default Temperature;