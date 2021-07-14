import React, { useState, useEffect } from 'react';

/// I am receiving the address, city, state, zip and more as props from my database.

export default function OpenWeather({ props }) {
  // Checking to see if props were received correctly. Delete console.log before production.
  console.log(props);

  // Pulling address, city, state and zip from props
  const { address, city, state, zip } = props;
  const location = `${address} ${city} ${state} ${zip}`;
  const [data, setData] = useState(null);
  const apiKey =
    '/* Add your own weatherapi.com API Key here from .env file */';

  /// Make api call to weatherapi.com
  const fetchData = async () => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location} &aqi=no`
    );
    const info = await res.json();
    setData(info);
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  console.log(data);

  /// ////////After the api call//////////
  if (data === null) return <p>Loading...</p>;
  /// Names not in camel case because they are set to match the API return names.
  const { feelslike_f, humidity, pressure_in, temp_f, wind_dir, wind_mph } =
    data.current;

  /* I have set up a few examples of information coming from the API. Some have been destructured and other are a direct connection.
    all API information can be found here. https://www.weatherapi.com/docs/ */

  return (
    <div>
      <div style={{ height: '275px', width: '100%', marginTop: '20px' }}>
        <h6>
          Current Weather:
          <br />
        </h6>
        <h6>{data.current.condition.text}</h6>
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
        />
        <h6>Current Temperature: {temp_f}</h6>
        <h6>Feels Like: {feelslike_f}</h6>
        <h6>Wind Direction: {wind_dir}</h6>
        <h6>Wind Speed: {wind_mph} MPH</h6>
        <h6>Barometric Pressure: {pressure_in} </h6>{' '}
        <h6>Humidity: {humidity} </h6>{' '}
      </div>
    </div>
  );
}
