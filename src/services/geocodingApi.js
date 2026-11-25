
const GEOCODING_URL =
    'https://geocoding-api.open-meteo.com/v1/search';

export async function searchLocations(query) {
    // Validate search input.
    if (typeof query !== 'string') {
        return [];
    }

    const searchTerm = query.trim();

    // Avoid unnecessary API requests.
    if (searchTerm.length < 2) {
        return [];
    }

    const params = new URLSearchParams({
        name: searchTerm,
        count: '10',
        language: 'en',
        format: 'json',
    });

    const response = await fetch(
        `${GEOCODING_URL}?${params.toString()}`
    );

    // Handle HTTP errors.
    if (!response.ok) {
        throw new Error(
            `Geocoding request failed (${response.status}).`
        );
    }

    const data = await response.json();

    // Validate API response.
    if (
        data.results !== undefined &&
        !Array.isArray(data.results)
    ) {
        throw new Error(
            'Invalid location data received from the API.'
        );
    }

    return data.results ?? [];
}
