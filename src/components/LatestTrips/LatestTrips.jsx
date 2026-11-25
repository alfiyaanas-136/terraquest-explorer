import { useEffect, useState } from 'react'
import tromso_img from '../../assets/LatestTrips/tromso.png'
import ushuaia_img from '../../assets/LatestTrips/ushuaia.png'
import './LatestTrips.css'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { searchLocations } from '../../services/geocodingApi'

const featuredTrips = [
    {
        name: 'Ushuaia',
        country: 'Argentina',
        image: ushuaia_img,
        description: "The world's southernmost city with stunning wilderness."
    },
    {
        name: 'Tromso',
        country: 'Norway',
        image: tromso_img,
        description: "Your gateway to the magical Northern Lights."
    }
]

const LatestTrips = () => {

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchTrips = async () => {
            try {
                const results = await Promise.all(
                    featuredTrips.map(async (trip) => {
                        const locations = await searchLocations(trip.name);

                        const location = locations.find(
                            (item) => item.country === trip.country
                        );

                        return location ? { ...trip, ...location } : null;
                    })
                );

                if (!cancelled) {
                    setDestinations(results.filter(Boolean));
                }
            } catch {
                if (!cancelled) {
                    setError('Unable to load destinations.');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchTrips();

        return () => {
            cancelled = true;
        };
    }, []);

  return (
    <section className='tq-latest-trips' id="latest-trips">
        <div className='tq-latest-container'>
            <div className='tq-latest-cards'>
                {loading && (
                    <p role='status'>Loading Destinations...</p>
                )}
                {error && <p role='alert'>{error}</p>}

                {!loading && !error && destinations.length === 0 && (
                    <p>No destinations available.</p>
                )}

                {destinations.map((trip) => (
                    <Link
                        to={`/explore?search=${encodeURIComponent(trip.name)}`}
                        className='tq-trip-card'
                        key={trip.id}
                    >
                        <img src={trip.image} alt={trip.name} />

                        <div className='tq-trip-info'>
                            <h3>{trip.name}, {trip.country}</h3>
                            <p>{trip.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='tq-latest-content'>
                <h2>Latest Trips</h2>

                <h3>Explore the unexplored world</h3>

                <p>
                    From remote mountains to vibrant
                    coastal towns, find travel stories and
                    destinations that inspire your next
                    adventure.
                </p>

                <Link to="/explore" className='tq-latest-btn'>
                    Discover More 
                    <ArrowRight size={18} />
                </Link>

                <div className='tq-latest-indicators' aria-hidden="true">
                    <span className='active'></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

        </div>
    </section>
  )
}

export default LatestTrips