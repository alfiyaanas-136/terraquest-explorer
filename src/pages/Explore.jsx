
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ArrowRight,
    Compass,
    Globe2,
    MapPin,
    Search,
    X,
    SlidersHorizontal,
} from 'lucide-react';

import { searchLocations } from '../services/geocodingApi';
import { searchDestinationImages } from '../services/imageApi';
import './Explore.css';

const Explore = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const [query, setQuery] = useState(searchTerm);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Destination image state
    const [destinationImages, setDestinationImages] = useState({});
    const [failedImageIds, setFailedImageIds] = useState([]);

    // Filter and sorting state
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [sortBy, setSortBy] = useState('name-asc');


    // Fetch destinations when the URL search changes.
    useEffect(() => {
        let isActive = true;

        const fetchLocations = async () => {
            if (searchTerm.trim().length < 2) {
                setLocations([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');

                const results = await searchLocations(searchTerm);

                if (isActive) {
                    setLocations(results);
                }
            } catch (err) {
                if (isActive) {
                    setError(
                        err.message ||
                        'Unable to search destinations. Please try again.'
                    );
                    setLocations([]);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        fetchLocations();

        return () => {
            isActive = false;
        };
    }, [searchTerm]);

    // Fetch images for the search results.
    useEffect(() => {
        let isActive = true;

        const fetchImages = async () => {
            if (locations.length === 0) {
                setDestinationImages({});
                setFailedImageIds([]);
                return;
            }

            setDestinationImages({});
            setFailedImageIds([]);

            const imageResults = await Promise.all(
                locations.map(async (location) => {
                    try {
                        const images = await searchDestinationImages(
                            location.name,
                            location.country || '',
                            location.admin1 || ''
                        );

                        return {
                            locationId: location.id,
                            image: images.length > 0 ? images[0] : null,
                        };
                    } catch (error) {
                        console.error(
                            `Image fetch failed for ${location.name}:`,
                            error
                        );

                        return {
                            locationId: location.id,
                            image: null,
                        };
                    }
                })
            );

            if (!isActive) return;

            const imageMap = {};

            imageResults.forEach(({ locationId, image }) => {
                if (image?.imageUrl) {
                    imageMap[locationId] = image;
                }
            });

            setDestinationImages(imageMap);
        };

        fetchImages();

        return () => {
            isActive = false;
        };
    }, [locations]);

    // Create a list of unique countries.
    const countries = useMemo(() => {
        const countryNames = locations
            .map((location) => location.country)
            .filter(Boolean);

        return [...new Set(countryNames)].sort((a, b) =>
            a.localeCompare(b)
        );
    }, [locations]);

    // Apply country filter and sorting.
    const filteredLocations = useMemo(() => {
        let results = [...locations];

        if (selectedCountry !== 'all') {
            results = results.filter(
                (location) => location.country === selectedCountry
            );
        }

        if (sortBy === 'name-asc') {
            results.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-desc') {
            results.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === 'population-desc') {
            results.sort(
                (a, b) => (b.population || 0) - (a.population || 0)
            );
        }

        return results;
    }, [locations, selectedCountry, sortBy]);

    // Handle input changes.
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Handle search submission.
    const handleSearch = (event) => {
        event.preventDefault();

        const searchValue = query.trim();

        if (!searchValue) {
            setError('Please enter a destination to search.');
            return;
        }

        if (searchValue.length < 2) {
            setError('Please enter at least 2 characters.');
            return;
        }

        setError('');
        setSelectedCountry('all');
        setSortBy('name-asc');

        if (searchValue === searchTerm) {
            return;
        }

        setSearchParams({ search: searchValue });
    };

    // Clear search input and URL parameters.
    const handleClearSearch = () => {
        setQuery('');
        setError('');
        setSelectedCountry('all');
        setSortBy('name-asc');
        setSearchParams({});
    };

    // Reset filters and sorting.
    const handleResetFilters = () => {
        setSelectedCountry('all');
        setSortBy('name-asc');
    };

    // Handle broken destination images.
    const handleImageError = (locationId) => {
        setFailedImageIds((previous) =>
            previous.includes(locationId)
                ? previous
                : [...previous, locationId]
        );
    };

    const hasActiveFilters =
        selectedCountry !== 'all' || sortBy !== 'name-asc';

    return (
        <main className="explore-page">

            {/* Explore Hero */}
            <section className="explore-hero">
                <div className="explore-hero-content">

                    <span className="explore-label">
                        <Compass size={16} />
                        DISCOVER THE WORLD
                    </span>

                    <h1>
                        Discover Your Next
                        <span> Destination</span>
                    </h1>

                    <p>
                        Find beautiful places, explore new destinations
                        and start planning your next adventure.
                    </p>

                    {/* Search Form */}
                    <form
                        className="explore-search-form"
                        onSubmit={handleSearch}
                    >
                        <Search size={21} />

                        <input
                            type="search"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search a city or destination..."
                            aria-label="Search destinations"
                        />

                        {query && (
                            <button
                                type="button"
                                className="explore-clear-btn"
                                onClick={handleClearSearch}
                                aria-label="Clear search"
                                title="Clear search"
                            >
                                <X size={19} />
                            </button>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </form>

                    {error && (
                        <p className="explore-search-error" role="alert">
                            {error}
                        </p>
                    )}

                </div>
            </section>

            {/* Destination Results */}
            <section className="explore-results-section">

                <div className="explore-section-heading">
                    <div>
                        <span className="explore-section-label">
                            DESTINATION DISCOVERY
                        </span>

                        <h2>
                            {searchTerm
                                ? `Search Results for "${searchTerm}"`
                                : 'Explore Destinations'}
                        </h2>

                        <p>
                            {searchTerm
                                ? 'Explore the locations matching your search.'
                                : 'Search for a city or destination to discover places around the world.'}
                        </p>
                    </div>

                    {locations.length > 0 && !loading && (
                        <span className="explore-result-count">
                            {filteredLocations.length} of {locations.length} locations
                        </span>
                    )}
                </div>

                {/* Filter and Sorting Controls */}
                {!loading && !error && locations.length > 0 && (
                    <div className="explore-filter-bar">

                        <div className="explore-filter-title">
                            <SlidersHorizontal size={18} />
                            <span>Filter & Sort</span>
                        </div>

                        <div className="explore-filter-controls">

                            <div className="explore-filter-group">
                                <label htmlFor="country-filter">
                                    Country
                                </label>

                                <select
                                    id="country-filter"
                                    value={selectedCountry}
                                    onChange={(event) =>
                                        setSelectedCountry(event.target.value)
                                    }
                                >
                                    <option value="all">All Countries</option>

                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="explore-filter-group">
                                <label htmlFor="sort-filter">
                                    Sort by
                                </label>

                                <select
                                    id="sort-filter"
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(event.target.value)
                                    }
                                >
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                    <option value="population-desc">
                                        Population: Highest first
                                    </option>
                                </select>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    className="explore-reset-btn"
                                    onClick={handleResetFilters}
                                >
                                    Reset Filters
                                    <X size={15} />
                                </button>
                            )}

                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="explore-message">
                        <div className="explore-loader"></div>
                        <p>Searching destinations...</p>
                    </div>
                )}

                {/* API Error */}
                {!loading && error && searchTerm.length >= 2 && (
                    <div className="explore-message explore-error">
                        <p>{error}</p>
                    </div>
                )}

                {/* Destination Cards */}
                {!loading && !error && filteredLocations.length > 0 && (
                    <div className="explore-location-grid">

                        {filteredLocations.map((location) => {
                            const countryDetails = [
                                location.admin1,
                                location.country,
                            ].filter(Boolean);

                            const destinationImage =
                                destinationImages[location.id];

                            const showImage =
                                destinationImage?.imageUrl &&
                                !failedImageIds.includes(location.id);

                            return (
                                <article
                                    className="explore-location-card"
                                    key={location.id}
                                >
                                    {/* Destination Image */}
                                    <div className="explore-card-banner">

                                        {showImage ? (
                                            <img
                                                src={destinationImage.imageUrl}
                                                alt={`${location.name}, ${location.country || 'destination'}`}
                                                className="explore-card-image"
                                                loading="lazy"
                                                onError={() =>
                                                    handleImageError(location.id)
                                                }
                                            />
                                        ) : (
                                            <div className="explore-card-banner-icon">
                                                <MapPin size={38} />
                                            </div>
                                        )}

                                        <div className="explore-card-banner-overlay"></div>

                                        <span className="explore-card-tag">
                                            <Globe2 size={14} />
                                            DISCOVER
                                        </span>

                                        <span className="explore-card-banner-name">
                                            {location.name}
                                        </span>

                                    </div>

                                    {/* Destination Information */}
                                    <div className="explore-card-content">

                                        <h3>{location.name}</h3>

                                        <p className="explore-location-country">
                                            <Globe2 size={16} />
                                            {countryDetails.join(', ') ||
                                                'Location details unavailable'}
                                        </p>

                                        <div className="explore-card-coordinates">
                                            <div>
                                                <span>LATITUDE</span>
                                                <strong>
                                                    {location.latitude.toFixed(2)}°
                                                </strong>
                                            </div>

                                            <div>
                                                <span>LONGITUDE</span>
                                                <strong>
                                                    {location.longitude.toFixed(2)}°
                                                </strong>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/destination/${location.id}?name=${encodeURIComponent(location.name)}&country=${encodeURIComponent(location.country || '')}&region=${encodeURIComponent(location.admin1 || '')}&latitude=${location.latitude}&longitude=${location.longitude}&search=${encodeURIComponent(searchTerm)}`}
                                            className="explore-view-btn"
                                        >
                                            View Destination
                                            <ArrowRight size={17} />
                                        </Link>

                                    </div>
                                </article>
                            );
                        })}

                    </div>
                )}

                {/* No Results After Filtering */}
                {!loading &&
                    !error &&
                    locations.length > 0 &&
                    filteredLocations.length === 0 && (
                        <div className="explore-empty-state">
                            <div className="explore-empty-icon">
                                <Globe2 size={35} />
                            </div>

                            <h3>No matching destinations</h3>

                            <p>
                                No locations match your selected country.
                                Try another country or reset your filters.
                            </p>

                            <button
                                type="button"
                                className="explore-reset-btn explore-empty-reset"
                                onClick={handleResetFilters}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                {/* Initial Empty State */}
                {!loading &&
                    !error &&
                    locations.length === 0 &&
                    searchTerm.length < 2 && (
                        <div className="explore-empty-state">
                            <div className="explore-empty-icon">
                                <Globe2 size={35} />
                            </div>

                            <h3>Where would you like to go?</h3>

                            <p>
                                Enter a city or destination above to discover
                                matching locations.
                            </p>
                        </div>
                    )}

                {/* No Search Results */}
                {!loading &&
                    !error &&
                    locations.length === 0 &&
                    searchTerm.length >= 2 && (
                        <div className="explore-empty-state">
                            <div className="explore-empty-icon">
                                <Search size={35} />
                            </div>

                            <h3>No destinations found</h3>

                            <p>
                                Try another destination name or check your spelling.
                            </p>
                        </div>
                    )}

            </section>
        </main>
    );
};

export default Explore;
