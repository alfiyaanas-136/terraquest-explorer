
const WIKIMEDIA_API =
    'https://commons.wikimedia.org/w/api.php';

// Store previously fetched destination images.
const imageCache = new Map();

const EXCLUDED_TERMS = [
    'map',
    'maps',
    'historical',
    'painting',
    'drawing',
    'illustration',
    'diagram',
    'coat of arms',
    'flag',
    'logo',
    'poster',
    'cartography',
    'cartographic',
    'atlas',
    'topographic',
    'topographical',
    'locator',
    'street map',
    'road map',
    'location map',
    'political map',
    'administrative map',
    'satellite map',
    'route map',
];

const PREFERRED_TERMS = [
    'eiffel tower',
    'skyline',
    'cityscape',
    'landmark',
    'architecture',
    'panorama',
    'photograph',
    'photo',
];

// Check complete words instead of matching partial words.
function containsTerm(text, term) {
    const escapedTerm = term.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
    );

    const pattern = new RegExp(
        `(^|[^a-z0-9])${escapedTerm}([^a-z0-9]|$)`,
        'i'
    );

    return pattern.test(text);
}

// Fetch images from Wikimedia Commons.
async function fetchWikimediaImages(searchTerm) {
    const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: `${searchTerm} filetype:bitmap -map -maps -atlas`,
        gsrnamespace: '6',
        gsrlimit: '20',
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiurlwidth: '1200',
        iiextmetadatafilter:
            'Artist|LicenseShortName|UsageTerms',
        format: 'json',
        origin: '*',
    });

    const response = await fetch(
        `${WIKIMEDIA_API}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Wikimedia request failed (${response.status}).`
        );
    }

    const data = await response.json();

    return Object.values(data.query?.pages || {});
}

// Calculate image relevance.
function getImageRelevanceScore(
    page,
    destination,
    country
) {
    const title = page.title.toLowerCase();
    const destinationName = destination.toLowerCase();
    const countryName = country.toLowerCase();

    let score = 0;

    if (containsTerm(title, destinationName)) {
        score += 15;
    }

    if (
        countryName &&
        containsTerm(title, countryName)
    ) {
        score += 5;
    }

    PREFERRED_TERMS.forEach((term) => {
        if (containsTerm(title, term)) {
            score += 2;
        }
    });

    return score;
}

// Remove irrelevant image types.
function isRelevantImage(page) {
    const title = page.title.toLowerCase();

    return !EXCLUDED_TERMS.some((term) =>
        containsTerm(title, term)
    );
}

// Fetch and process destination images.
async function fetchDestinationImages(
    destination,
    country = '',
    region = ''
) {
    const searchTerms = [
        `${destination} ${country} landmark photograph`,
        `${destination} ${country}`,
        `${destination} ${region} ${country}`,
        destination,
    ].filter((term) => term.trim().length > 0);

    const uniquePages = new Map();
    let successfulRequest = false;

    // Search progressively broader terms.
    for (const searchTerm of searchTerms) {
        try {
            const pages = await fetchWikimediaImages(searchTerm);
            successfulRequest = true;
            pages.forEach((page) => {
                if (
                    page.imageinfo?.[0]?.thumburl &&
                    !uniquePages.has(page.pageid)
                ) {
                    uniquePages.set(page.pageid, page);
                }
            });
        } catch (error) {
            console.error(
                `Image search failed for "${searchTerm}":`,
                error
            );
        }

        const relevantCount = [
            ...uniquePages.values(),
        ].filter(isRelevantImage).length;

        if (relevantCount >= 5) {
            break;
        }
    }

    // Throw an error if every API request failed.
    if (!successfulRequest) {
        throw new Error(
            'Unable to fetch destination images. Please try again.'
        );
    }

    const rankedPages = [...uniquePages.values()]
        .filter(isRelevantImage)
        .map((page) => ({
            page,
            score: getImageRelevanceScore(
                page,
                destination,
                country
            ),
        }))
        .sort((a, b) => b.score - a.score);

    return rankedPages.map(({ page }) => {
        const imageInfo = page.imageinfo[0];
        const metadata = imageInfo.extmetadata || {};

        return {
            id: page.pageid,
            title: page.title,
            imageUrl: imageInfo.thumburl,
            imagePageUrl: imageInfo.descriptionurl,
            artist: metadata.Artist?.value || '',
            license:
                metadata.LicenseShortName?.value ||
                metadata.UsageTerms?.value ||
                '',
        };
    });
}

// Search destination images with caching.
export async function searchDestinationImages(
    destination,
    country = '',
    region = ''
) {
    if (
        typeof destination !== 'string' ||
        !destination.trim()
    ) {
        return [];
    }

    const cacheKey = [
        destination.trim().toLowerCase(),
        country.trim().toLowerCase(),
        region.trim().toLowerCase(),
    ].join('|');

    // Return cached results if available.
    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey);
    }

    const results = await fetchDestinationImages(
        destination.trim(),
        country,
        region
    );

    // Cache successfully fetched results.
    imageCache.set(cacheKey, results);

    return results;
}
