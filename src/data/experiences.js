
import adventureImage from '../assets/experiences/categories/adventure.png';
import beachesImage from '../assets/experiences/categories/beaches.png';
import cultureImage from '../assets/experiences/categories/culture.png';
import foodImage from '../assets/experiences/categories/food.png';
import natureImage from '../assets/experiences/categories/nature.png';
import cityLifeImage from '../assets/experiences/categories/city-life.png';

const experiences = [
    {
        id: 1,
        title: 'Mountain Adventures',
        category: 'Adventure',
        description:
            'Discover breathtaking mountain trails and unforgettable outdoor adventures.',
        image: adventureImage,
        destination: 'Zermatt',
    },
    {
        id: 2,
        title: 'Tropical Escapes',
        category: 'Beaches',
        description:
            'Relax on beautiful beaches and explore crystal-clear waters.',
        image: beachesImage,
        destination: 'Phuket',
    },
    {
        id: 3,
        title: 'Cultural Discoveries',
        category: 'Culture',
        description:
            'Experience local traditions, history and fascinating heritage.',
        image: cultureImage,
        destination: 'Tokyo',
    },
    {
        id: 4,
        title: 'Food Journeys',
        category: 'Food',
        description:
            'Explore authentic cuisines and discover unique local flavours.',
        image: foodImage,
        destination: 'Rome',
    },
    {
        id: 5,
        title: 'Nature Exploration',
        category: 'Nature',
        description:
            'Connect with nature through forests, wildlife and scenic landscapes.',
        image: natureImage,
        destination: 'Reykjavík',
    },
    {
        id: 6,
        title: 'City Experiences',
        category: 'City Life',
        description:
            'Explore vibrant cities, iconic landmarks and local neighbourhoods.',
        image: cityLifeImage,
        destination: 'Paris',
    },
];

export default experiences;
