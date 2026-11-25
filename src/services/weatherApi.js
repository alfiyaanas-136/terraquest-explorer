
const WEATHER_API_URL =
    'https://api.open-meteo.com/v1/forecast';

export async function getCurrentWeather(latitude, longitude) {
    const lat = Number(latitude);
    const lon = Number(longitude);

    // Validate coordinates
    if (
        latitude === '' ||
        longitude === '' ||
        latitude === null ||
        longitude === null ||
        !Number.isFinite(lat) ||
        !Number.isFinite(lon) ||
        lat < -90 ||
        lat > 90 ||
        lon < -180 ||
        lon > 180
    ) {
        throw new Error('Invalid destination coordinates.');
    }

    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
            'is_day',
        ].join(','),
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        timezone: 'auto',
    });

    const response = await fetch(
        `${WEATHER_API_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Weather request failed (${response.status}).`
        );
    }

    const data = await response.json();

    if (!data.current) {
        throw new Error('Weather information is unavailable.');
    }

    return data;
}
