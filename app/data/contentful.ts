
const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN


export interface Location {
    name: string;
    lat: number;
    long: number;
    address: string;
    tags?: string[];
}


async function apiCall(query: string, variables?: any) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    }
    return await fetch(fetchUrl, options)
}

export const GetLocations = async (): Promise<Location[]> => {
    const query = `
    {
        storeLocationCollection {
            items {
                tags
                name
                address
                lat
                long
            }
        }
    }
    `
    const response = await apiCall(query);
    const json = await response.json();
    return json.data.storeLocationCollection.items;
}