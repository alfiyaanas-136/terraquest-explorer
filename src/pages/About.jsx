
import { Link } from 'react-router-dom';
import {
    Compass,
    Globe2,
    MapPin,
    CloudSun,
    Mountain,
    Heart,
    ArrowUpRight,
    Sparkles,
    Camera,
    Route,
} from 'lucide-react';

import Footer from '../components/Footer/Footer';
import './About.css';

const features = [
    {
        icon: <Globe2 />,
        title: 'Discover Destinations',
        description:
            'Explore beautiful destinations around the world and find places that inspire your next adventure.',
    },
    {
        icon: <Compass />,
        title: 'Find Your Experience',
        description:
            'From mountain adventures to relaxing beaches, discover experiences that match your travel interests.',
    },
    {
        icon: <CloudSun />,
        title: 'Explore with Confidence',
        description:
            'Get useful weather information and destination maps to help you understand the places you want to visit.',
    },
];

const values = [
    {
        icon: <Heart />,
        title: 'Travel with Passion',
        description:
            'We believe every journey begins with curiosity and a desire to discover something new.',
    },
    {
        icon: <MapPin />,
        title: 'Discover More',
        description:
            'The world is full of incredible places. We make exploring destinations easier and more inspiring.',
    },
    {
        icon: <Camera />,
        title: 'Create Memories',
        description:
            'Every destination has a story. Find places that could become part of your next unforgettable memory.',
    },
];

const About = () => {
    return (
        <>
            <main className="about-page">

                {/* About Hero */}
                <section className="about-hero">
                    <div className="about-hero-overlay"></div>

                    <div className="about-hero-content">
                        <span className="about-eyebrow">
                            <Sparkles size={16} />
                            GET TO KNOW US
                        </span>

                        <h1>
                            The World Is Waiting.
                            <br />
                            <span>Your Journey Starts Here.</span>
                        </h1>

                        <p>
                            Discover incredible destinations, find
                            unforgettable experiences and let your
                            curiosity guide your next adventure.
                        </p>

                        <Link
                            to="/explore"
                            className="about-primary-btn"
                        >
                            Start Exploring
                            <ArrowUpRight size={19} />
                        </Link>
                    </div>
                </section>

                {/* Introduction */}
                <section className="about-intro section-container">
                    <div className="about-intro-content">
                        <span className="about-section-label">
                            ABOUT TERRAQUEST
                        </span>

                        <h2>
                            Discover the World,
                            <br />
                            One Journey at a Time.
                        </h2>

                        <p>
                            TerraQuest Explorer is a travel discovery
                            platform created for curious explorers
                            and adventure lovers.
                        </p>

                        <p>
                            We bring destination discovery, travel
                            inspiration, weather information and
                            interactive maps together in one place.
                            Whether you dream of exploring vibrant
                            cities, peaceful landscapes or beautiful
                            beaches, your next journey begins here.
                        </p>
                    </div>

                    <div className="about-intro-visual">
                        <div className="about-intro-icon">
                            <Compass size={72} strokeWidth={1.2} />
                        </div>
                        <span>EXPLORE BEYOND THE ORDINARY</span>
                    </div>
                </section>

                {/* Mission */}
                <section className="about-mission">
                    <div className="about-mission-content">
                        <span className="about-section-label">
                            OUR MISSION
                        </span>

                        <h2>
                            Inspiring You to
                            <br />
                            Explore Further.
                        </h2>

                        <p>
                            Our mission is to make discovering the
                            world simpler, more exciting and more
                            accessible. We want to inspire people
                            to look beyond familiar places and
                            explore the beauty of our planet.
                        </p>
                    </div>
                </section>

                {/* What We Offer */}
                <section className="about-features section-container">
                    <div className="about-section-heading">
                        <span className="about-section-label">
                            WHAT WE OFFER
                        </span>

                        <h2>
                            Everything You Need
                            <br />
                            to Explore.
                        </h2>

                        <p>
                            Useful discovery tools to help you
                            explore destinations and plan your
                            next adventure.
                        </p>
                    </div>

                    <div className="about-feature-grid">
                        {features.map((feature, index) => (
                            <article
                                className="about-feature-card"
                                key={feature.title}
                            >
                                <div className="about-card-icon">
                                    {feature.icon}
                                </div>

                                <span className="about-card-number">
                                    0{index + 1}
                                </span>

                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section className="about-values">
                    <div className="section-container">
                        <div className="about-section-heading">
                            <span className="about-section-label">
                                WHAT DRIVES US
                            </span>

                            <h2>
                                More Than Just
                                <br />
                                Finding a Destination.
                            </h2>
                        </div>

                        <div className="about-values-grid">
                            {values.map((value) => (
                                <article
                                    className="about-value-card"
                                    key={value.title}
                                >
                                    <div className="about-value-icon">
                                        {value.icon}
                                    </div>

                                    <h3>{value.title}</h3>

                                    <p>{value.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Explore CTA */}
                <section className="about-cta">
                    <div className="about-cta-content">
                        <span className="about-section-label">
                            YOUR NEXT ADVENTURE AWAITS
                        </span>

                        <h2>
                            Ready to Explore
                            <br />
                            Somewhere New?
                        </h2>

                        <p>
                            The world is full of places waiting to
                            be discovered. Let's find yours.
                        </p>

                        <Link
                            to="/explore"
                            className="about-primary-btn"
                        >
                            Explore Destinations
                            <ArrowUpRight size={19} />
                        </Link>
                    </div>

                    <div className="about-cta-decoration">
                        <Route size={110} strokeWidth={0.8} />
                        <Mountain size={85} strokeWidth={0.8} />
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default About;
