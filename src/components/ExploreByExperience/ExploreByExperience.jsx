import ushuaia_img from '../../assets/experiences/ushuaia.png'
import {
  Triangle,
  TreePine,
  Waves,
  PawPrint,
  Circle,
  Snowflake,
  Leaf,
  Landmark,
} from 'lucide-react';

import './ExploreByExperience.css';

const experiences = [
  { name: 'Adventure', icon: Triangle },
  { name: 'Mountains', icon: TreePine },
  { name: 'Beaches', icon: Waves },
  { name: 'Wildlife', icon: PawPrint },
  { name: 'Northern Lights', icon: Circle },
  { name: 'Snowy Countries', icon: Snowflake },
  { name: 'Nature', icon: Leaf },
  { name: 'Culture', icon: Landmark },
];

const ExploreByExperience = ({onExperienceSelect}) => {
  return (
    <section className='exp-section' id="experiences">
        <div className='exp-container'>
            <div className='exp-img-wrapper'>
                <img 
                    src={ushuaia_img}
                    alt="Beautiful snow-covered mountains beside a lake" 
                    className='exp-main-img'
                />
            </div>
            <div className='exp-content'>
                <div className='exp-heading'>
                    <h2>Explore by Experience</h2>
                    <p>
                        Choose your travel style and discover destinations
                        <br className='desktop-break'/>
                        that match your passion.
                    </p>
                </div>
                <div className='exp-grid'>
                    {experiences.map((experiences) => {
                        const Icon = experiences.icon;

                        return (
                            <button
                                type='button'
                                className='exp-card'
                                key={experiences.name}
                                onClick={() => 
                                    onExperienceSelect?.(experiences.name)
                                }
                            >
                                <Icon className="exp-icon" />
                                <span>{experiences.name}</span>
                            </button>
                        );
                    })

                    }



                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default ExploreByExperience