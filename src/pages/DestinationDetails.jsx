
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft,
    Compass,
    Globe2,
    MapPin,
    Navigation,
} from 'lucide-react';

import { searchDestinationImages } from '../services/imageApi';
import { getDestinationOverview } from '../data/destinationOverview';
import { getCurrentWeather } from '../services/weatherApi';
import DestinationMap from '../components/DestinationMap/DestinationMap';

import './DestinationDetails.css';

// Weather descriptions based on Open-Meteo weather codes.
function getWeatherDescription(code) {
    if (code === 0) return 'Clear sky';
    if (code === 1) return 'Mainly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Overcast';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55].includes(code)) return 'Drizzle';
    if ([56, 57].includes(code)) return 'Freezing drizzle';
    if ([61, 63, 65].includes(code)) return 'Rainy';
    if ([66, 67].includes(code)) return 'Freezing rain';
    if ([71, 73, 75, 77].includes(code)) return 'Snowy';
    if ([80, 81, 82].includes(code)) return 'Rain showers';
    if ([85, 86].includes(code)) return 'Snow showers';
    if (code === 95) return 'Thunderstorm';
    if ([96, 99].includes(code)) return 'Thunderstorm with hail';

    return 'Unknown conditions';
}

// Weather icons based on Open-Meteo weather codes.
function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if ([1, 2].includes(code)) return '🌤️';
    if (code === 3) return '☁️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57].includes(code)) return '🌦️';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';

    return '🌡️';
}

const DestinationDetails = () => {
    const [searchParams] = useSearchParams();

    // Destination information from URL parameters.
    const name = searchParams.get('name') || '';
    const country = searchParams.get('country') || '';
    const region = searchParams.get('region') || '';

    const latitudeValue = Number(searchParams.get('latitude'));
    const longitudeValue = Number(searchParams.get('longitude'));

    // Validate destination coordinates.
    const hasCoordinates =
        searchParams.has('latitude') &&
        searchParams.has('longitude') &&
        searchParams.get('latitude') !== '' &&
        searchParams.get('longitude') !== '' &&
        Number.isFinite(latitudeValue) &&
        Number.isFinite(longitudeValue);

    const latitude = hasCoordinates ? latitudeValue : null;
    const longitude = hasCoordinates ? longitudeValue : null;

    const hasValidCoordinates = hasCoordinates;

    // Destination overview data.
    const overview = getDestinationOverview(name, country);

    // Return path to Explore page.
    const searchTerm = searchParams.get('search') || '';

    const backToExplore = searchTerm
        ? `/explore?search=${encodeURIComponent(searchTerm)}`
        : '/explore';

    // Weather state.
    const [weather, setWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState('');

    // Destination hero image state.
    const [heroImageState, setHeroImageState] = useState(null);

    const imageKey = `${name}-${country}-${region}`;

    // Fetch current weather for the selected destination.
    
    
    useEffect(() => {
        let isActive = true;

        async function fetchWeather() {
            try {
                setWeatherLoading(true);
                setWeatherError('');

                const data = await getCurrentWeather(
                    latitude,
                    longitude
                );

                if (isActive) {
                    setWeather(data);
                }
            } catch (error) {
                if (isActive) {
                    setWeatherError(error.message);
                    setWeather(null);
                }
            } finally {
                if (isActive) {
                    setWeatherLoading(false);
                }
            }
        }

        if (hasValidCoordinates) {
            fetchWeather();
        }

        return () => {
            isActive = false;
        };
    }, [latitude, longitude, hasValidCoordinates]);


    // Fetch destination hero image.
    useEffect(() => {
        let isActive = true;

        const fetchHeroImage = async () => {
            if (!name) {
                setHeroImageState(null);
                return;
            }

            try {
                const images = await searchDestinationImages(
                    name,
                    country,
                    region
                );

                if (isActive) {
                    setHeroImageState({
                        key: imageKey,
                        image: images[0] || null,
                    });
                }
            } catch (error) {
                console.error(
                    'Failed to fetch destination image:',
                    error
                );

                if (isActive) {
                    setHeroImageState({
                        key: imageKey,
                        image: null,
                    });
                }
            }
        };

        fetchHeroImage();

        return () => {
            isActive = false;
        };
    }, [name, country, region, imageKey]);

    const heroImage =
        heroImageState?.key === imageKey
            ? heroImageState.image
            : null;

    // Handle missing destination information.
    if (!name || !hasCoordinates) {
        return (
            <main className="destination-details-page">
                <section className="destination-not-found">
                    <div className="destination-not-found-icon">
                        <MapPin size={38} />
                    </div>

                    <h1>Destination Details Unavailable</h1>

                    <p>
                        We couldn't find the destination information.
                        Please return to Explore and select a destination.
                    </p>

                    <Link
                        to="/explore"
                        className="destination-back-btn"
                    >
                        <ArrowLeft size={18} />
                        Back to Explore
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="destination-details-page">

            {/* Destination Hero */}
            <section className="destination-details-hero">

                {heroImage?.imageUrl && (
                    <img
                        src={heroImage.imageUrl}
                        alt={`${name}, ${country}`}
                        className="destination-details-hero-image"
                    />
                )}

                <div className="destination-details-hero-overlay"></div>

                <div className="destination-details-hero-content">

                    <Link
                        to={backToExplore}
                        className="destination-back-link"
                    >
                        <ArrowLeft size={18} />
                        Back to Explore
                    </Link>

                    <br />
                    <br />

                    <span className="destination-details-label">
                        <Compass size={16} />
                        Explore {name}
                    </span>

                    <h1>{name}</h1>

                    <p className="destination-details-location">
                        <MapPin size={19} />
                        {[region, country].filter(Boolean).join(', ') ||
                            'Location details unavailable'}
                    </p>

                    {/* Image Attribution */}
                    {heroImage?.imagePageUrl && (
                        <a
                            href={heroImage.imagePageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="destination-image-credit"
                        >
                            Photo source: Wikimedia Commons
                            {heroImage.license && ` · ${heroImage.license}`}
                        </a>
                    )}

                </div>
            </section>

            {/* Destination Information */}
            <section className="destination-details-content">

                <div className="destination-details-heading">
                    <span>EXPLORE THIS PLACE</span>

                    <h2>Discover {name}</h2>

                    <p>
                        Get to know the location and its geographical
                        position before planning your next adventure.
                    </p>
                </div>

                <div className="destination-info-grid">

                    {/* Location Card */}
                    <article className="destination-info-card">
                        <div className="destination-info-icon">
                            <Globe2 size={25} />
                        </div>

                        <span>DESTINATION</span>
                        <h3>{name}</h3>

                        <p>
                            {[region, country].filter(Boolean).join(', ') ||
                                'Location information unavailable'}
                        </p>
                    </article>

                    {/* Latitude Card */}
                    <article className="destination-info-card">
                        <div className="destination-info-icon">
                            <Navigation size={25} />
                        </div>

                        <span>LATITUDE</span>
                        <h3>{latitude.toFixed(4)}°</h3>

                        <p>North / South geographical position</p>
                    </article>

                    {/* Longitude Card */}
                    <article className="destination-info-card">
                        <div className="destination-info-icon">
                            <MapPin size={25} />
                        </div>

                        <span>LONGITUDE</span>
                        <h3>{longitude.toFixed(4)}°</h3>

                        <p>East / West geographical position</p>
                    </article>

                </div>

                {/* Destination Overview */}
                <section className="destination-overview-section">
                    <div className="destination-overview-header">
                        <span className="destination-section-label">
                            GET TO KNOW THE DESTINATION
                        </span>

                        <h2>{overview.title}</h2>

                        <p>{overview.description}</p>
                    </div>

                    {overview.highlights.length > 0 && (
                        <div className="destination-highlights">
                            <h3>Popular Highlights</h3>

                            <div className="destination-highlights-grid">
                                {overview.highlights.map((highlight) => (
                                    <article
                                        className="destination-highlight-card"
                                        key={highlight.name}
                                    >
                                        <MapPin size={22} />

                                        <h4>{highlight.name}</h4>

                                        <p>{highlight.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Destination Weather */}
                <section className="destination-weather-section">
                    <div className="destination-weather-header">
                        <span className="destination-section-label">
                            LIVE WEATHER
                        </span>

                        <h2>Weather in {name}</h2>

                        <p>
                            Current weather conditions at your selected destination.
                        </p>
                    </div>

                    {weatherLoading ? (
                        <div className="destination-weather-message">
                            Loading weather information...
                        </div>
                    ) : weatherError ? (
                        <div className="destination-weather-message weather-error">
                            {weatherError}
                        </div>
                    ) : weather?.current ? (
                        <div className="destination-weather-card">

                            <div className="weather-main-info">
                                <div>
                                    <span className="weather-temperature">
                                        {Math.round(
                                            weather.current.temperature_2m
                                        )}°C
                                    </span>

                                    <p className="weather-condition">
                                        {getWeatherDescription(
                                            weather.current.weather_code
                                        )}
                                    </p>
                                </div>

                                <div className="weather-icon">
                                    {getWeatherIcon(
                                        weather.current.weather_code
                                    )}
                                </div>
                            </div>

                            <div className="weather-details-grid">

                                <div className="weather-detail">
                                    <span>Feels Like</span>
                                    <strong>
                                        {Math.round(
                                            weather.current.apparent_temperature
                                        )}°C
                                    </strong>
                                </div>

                                <div className="weather-detail">
                                    <span>Humidity</span>
                                    <strong>
                                        {weather.current.relative_humidity_2m}%
                                    </strong>
                                </div>

                                <div className="weather-detail">
                                    <span>Wind Speed</span>
                                    <strong>
                                        {weather.current.wind_speed_10m} km/h
                                    </strong>
                                </div>

                                <div className="weather-detail">
                                    <span>Time of Day</span>
                                    <strong>
                                        {weather.current.is_day ? 'Day' : 'Night'}
                                    </strong>
                                </div>

                            </div>

                            <p className="weather-updated">
                                Updated: {weather.current.time.replace('T', ' ')}
                                {' '}({weather.timezone})
                            </p>

                        </div>
                    ) : (
                        <div className="destination-weather-message">
                            Weather information is currently unavailable.
                        </div>
                    )}
                </section>

                {/* Interactive Map Section */}
                {hasValidCoordinates && (
                    <DestinationMap
                        name={name}
                        latitude={latitude}
                        longitude={longitude}
                    />
                )}

                {/* Coordinates Section */}
                <section className="destination-coordinates-section">

                    <div className="destination-coordinates-heading">
                        <MapPin size={22} />

                        <div>
                            <h2>Geographical Coordinates</h2>

                            <p>
                                Exact coordinates returned by the
                                Open-Meteo Geocoding API.
                            </p>
                        </div>
                    </div>

                    <div className="destination-coordinate-values">

                        <div>
                            <span>LATITUDE</span>
                            <strong>{latitude.toFixed(6)}°</strong>
                        </div>

                        <div>
                            <span>LONGITUDE</span>
                            <strong>{longitude.toFixed(6)}°</strong>
                        </div>

                    </div>

                    <a
                        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="destination-map-link"
                    >
                        View on Google Maps
                        <Navigation size={17} />
                    </a>

                </section>

                {/* Return Button */}
                <div className="destination-explore-action">
                    <Link to={backToExplore}>
                        <ArrowLeft size={17} />
                        Explore More Destinations
                    </Link>
                </div>

            </section>
        </main>
    );
};

export default DestinationDetails;
