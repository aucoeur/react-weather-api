import React from 'react';

function WeatherDescription(props) {
    const { main, description } = props
    return (
        <div>
            <div>Title: {main}</div>
            <div>Desc: {description}</div>
        </div>
    )
}

export default WeatherDescription;