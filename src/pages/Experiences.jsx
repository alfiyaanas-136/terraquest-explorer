
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

import ExperienceCategories from '../components/ExperienceCategories/ExperienceCategories';
import experienceHero from '../assets/experiences/experience-hero.png';

import './Experiences.css';

const Experiences = () => {
    return (
        <main className="experiences-page">

            {/* Experience Hero */}
            <section
                className="experiences-hero"
                style={{
                    '--experience-hero-image': `url(${experienceHero})`,
                }}
            >
                <div className="experiences-hero-content">

                    <span className="experiences-hero-label">
                        <Compass size={17} />
                        DISCOVER YOUR NEXT ADVENTURE
                    </span>

                    <h1>
                        Experience the World,
                        <br />
                        One Journey at a Time.
                    </h1>

                    <p>
                        From breathtaking adventures to unforgettable
                        cultural discoveries, find experiences that
                        make every journey special.
                    </p>

                    <Link
                        to="/explore"
                        className="experiences-hero-btn"
                    >
                        Explore Destinations
                        <ArrowRight size={18} />
                    </Link>

                </div>
            </section>

            {/* Experience Categories */}
            <ExperienceCategories />

        </main>
    );
};

export default Experiences;
