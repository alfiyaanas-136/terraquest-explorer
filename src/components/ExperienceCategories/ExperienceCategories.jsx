
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import experiences from '../../data/experiences';
import './ExperienceCategories.css';

const ExperienceCategories = () => {
    return (
        <section className="experience-categories-section">
            <div className="experience-categories-container">

                <div className="experience-categories-header">
                    <span className="experience-categories-label">
                        FIND YOUR EXPERIENCE
                    </span>

                    <h2>Explore by Experience</h2>

                    <p>
                        Whether you seek adventure, relaxation or cultural
                        discoveries, find the perfect experience for your
                        next journey.
                    </p>
                </div>

                <div className="experience-categories-grid">
                    {experiences.map((experience) => (
                        <Link
                            to={`/explore?search=${encodeURIComponent(experience.destination)}`}
                            className="experience-category-card"
                            key={experience.id}
                            aria-label={`Explore ${experience.category} destinations: ${experience.destination}`}
                        >
                            <img
                                src={experience.image}
                                alt={experience.title}
                                className="experience-category-image"
                            />

                            <div className="experience-category-overlay"></div>

                            <div className="experience-category-content">
                                <span className="experience-category-name">
                                    {experience.category}
                                </span>

                                <h3>{experience.title}</h3>

                                <p>{experience.description}</p>

                                <span className="experience-category-arrow">
                                    <ArrowUpRight size={20} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ExperienceCategories;
