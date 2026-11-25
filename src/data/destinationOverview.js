
const destinationOverview = {
    Paris: {
        France: {
            title: 'The City of Light',
            description:
                'Paris, the capital of France, is celebrated for its iconic architecture, artistic heritage, charming streets and rich cultural history. From the banks of the River Seine to its world-famous museums, the city offers a memorable experience for travellers.',
            highlights: [
                {
                    name: 'Eiffel Tower',
                    description:
                        'One of the most recognisable landmarks in the world.',
                },
                {
                    name: 'Louvre Museum',
                    description:
                        'A world-famous museum known for its remarkable art collection.',
                },
                {
                    name: 'Notre-Dame Cathedral',
                    description:
                        'A historic Gothic cathedral on the Île de la Cité.',
                },
                {
                    name: 'Montmartre',
                    description:
                        'A picturesque neighbourhood known for its artistic atmosphere.',
                },
            ],
        },
    },
};

export function getDestinationOverview(name, country) {
    return destinationOverview[name]?.[country] || {
        title: `Discover ${name}`,
        description:
            `Explore ${name}, located in ${country || 'an exciting destination'}. Discover its local character, geographical setting and the experiences this destination has to offer.`,
        highlights: [],
    };
}
