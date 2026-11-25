import { useEffect, useState } from 'react'
import phuket_img from '../../assets/PopularDestinations/phuket.png'
import reykjavik_img from '../../assets/PopularDestinations/reykjavik.png'
import tokyo_img from '../../assets/PopularDestinations/tokyo.png'
import zermatt_img from '../../assets/PopularDestinations/zermatt.png'
import './MostPopularDestinations.css'
import { searchLocations } from '../../services/geocodingApi'
import { Link } from 'react-router-dom'


const popularPlaces = [
    {
        name: 'Zermatt',
        country: 'Switzerland',
        image: zermatt_img
    },
    {
        name: 'Reykjavik',
        country: 'Iceland',
        image: reykjavik_img
    },
    {
        name: 'Phuket',
        country: 'Thailand',
        image: phuket_img
    },
    {
        name: 'Tokyo',
        country: 'Japan',
        image: tokyo_img
    }
];
const MostPopularDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchDestinations = async () => {
            try {
                const results = await Promise.all(
                    popularPlaces.map(async (place) => {
                        const locations = await searchLocations(place.name);

                        const location = locations.find(
                            (item) => item.country === place.country
                        );

                        return location
                            ? { ...place, ...location }
                            : null;
                    })
                );

                if (!cancelled) {
                    setDestinations(results.filter(Boolean))
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to load popular destinations.")
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        };
        fetchDestinations();

        return () => {
            cancelled = true;
        };
    }, []);
  return (
    <section className='tq-popular-section'>
        <div className='tq-popular-container'>
            <div className='tq-popular-heading'>
                <h2>Most Popular Destinations</h2>
                <p>Explore the world's most loved and extraordinary places, chosen by explorers for their stunning beauty and unique experiences.</p>
            </div>

            {loading && (
                <p className='tq-popular-status' role='status'>
                    Loading Destinations
                </p>
            )}

            {error && (
                <p className='tq-popular-status' role='alert'>
                    {error}
                </p>
            )}

            {!loading && !error && destinations.length > 0 && (
                <>
                    <div className='tq-popular-grid'>
                        {destinations.map((place) => (
                            <Link
                                key={place.id}
                                to={`/explore?search=${encodeURIComponent(place.name)}`}
                                className='tq-popular-card'
                            >
                                <img 
                                    src={place.image} 
                                    alt={`${place.name}, ${place.country}`} 
                                    loading='lazy'
                                />

                                <div className='tq-popular-overlay'>
                                    <h3>
                                        {place.name}, {place.country}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className='tq-popular-indicators'>
                        <span className='active'></span>
                        <span></span>
                        <span></span>
                    </div>
                </>
            )}
        </div>
    </section>
  )
}

export default MostPopularDestinations