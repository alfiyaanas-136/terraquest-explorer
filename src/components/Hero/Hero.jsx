import { Mountain, PawPrint, Rainbow, Search, TreePine, Waves } from 'lucide-react'
import './Hero.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        name: 'Mountains',
        description: 'Snowy peaks & trails',
        icon: Mountain,
        search: 'mountains'
    },
    {
        name: 'Nature',
        description: 'Lakes, forests & valleys',
        icon: TreePine,
        search: 'nature'
    },
    {
        name: 'Beaches',
        description: 'Tropical & coastal escapes',
        icon: Waves,
        search: 'beaches'
    },
    {
        name: 'Wildlife',
        description: 'Rare & exotic species',
        icon: PawPrint,
        search: 'wildlife'
    },
    {
        name: 'NorthernLights',
        description: 'A magical sky experience',
        icon: Rainbow,
        search: 'northern-lights'
    }
];
const Hero = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        const searchTerm = query.trim();

        if(!searchTerm) {
            navigate('/explore');
            return;
        }
        navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    };

  return (
    <section className="tq-hero">
        <div className="tq-hero-container">
            <div className="tq-hero-content">
                <p className="tq-hero-label">
                    TRAVEL . DISCOVER . EXPLORE
                </p>
                <h1>
                    AMAZING 
                    <br />
                    DESTINATIONS 
                    <br />
                    TO EXPLORE
                </h1>
                <p className="tq-hero-description">
                    Unleash your inner adventurer and witness
                    majestic landscapes, unique cultures, and
                    hidden wonders around the world.
                </p>

                <form 
                    className="tq-hero-search"
                    action=""
                    onSubmit={handleSearch}
                >
                    <Search size={21} />
                    <input 
                        type="search"
                        value={query}
                        onChange={(event) => 
                            setQuery(event.target.value)
                        }
                        placeholder='Search destinations, e.g. Ushuaia, Iceland...' 
                    />
                    <button type='submit' >
                        Explore Now
                    </button>
                </form>
            </div>

            <div className='tq-hero-categories'>
                {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                        <button
                            type='button'
                            key={category.name}
                            className='tq-hero-category'
                            onClick={() =>
                                navigate(
                                    `/experiences?category=${category.search}`
                                )
                            }
                        >
                            <Icon 
                                size={34}
                                strokeWidth={1.8}
                                className='tq-hero-icon'
                            />
                            <span className='tq-category-text'>
                                <strong>{category.name}</strong>
                                <small>{category.description}</small>
                            </span>
                        </button>
                    );
                })}
            </div>


        </div>
    </section>
  )
}

export default Hero