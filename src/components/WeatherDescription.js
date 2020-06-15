import React from 'react';

function WeatherDescription(props) {
    const { main, description, icon } = props
    return (
        <div>
            <div>Title: {main}</div>
            <div>Desc: {description}</div>
            <div>Icon: {icon}</div>
        </div>
    )
}

export default WeatherDescription;