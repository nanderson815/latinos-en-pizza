
const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN


export interface Location {
    name: string;
    location: {
        lat: number;
        lon: number;
    }
    address: string;
    phone: string;
    tags?: string[];
}

export interface ContenfulEvent {
    title: string;
    startTime: string;
    endTime: string;
    streetAddress: string;
    locationName: string;
    image?: ContentfulImage;
    description: any;
}

export interface ContentfulImage {
    url: string;
    description?: string;
    fileName?: string;
}

export interface Ingredient {
    name: string;
    icon: ContentfulImage;
}

export interface Flavor {
    id: string;
    name: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    primaryImage: ContentfulImage;
    flavorImage: ContentfulImage;
    ingredientsCollection: { items: Ingredient[] };
}

export interface Bio {
    name: string;
    about: string;
    headshot: ContentfulImage;
}

export interface AboutPage {
    title: string;
    aboutUs: string;
    foundersCollection: {
        items: Bio[]
    }
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

export const getEvents = async (): Promise<ContenfulEvent[]> => {
    const query = `
    {
        eventCollection {
            items {
                title
                startTime
                endTime
                streetAddress
                locationName
                description {
                    json
                }
                image {
                    url
                }
            }
        }
    }
    `
    const response = await apiCall(query);
    const json = await response.json();
    return json.data.eventCollection.items;
}

export const getLocations = async (): Promise<Location[]> => {
    const query = `
    {
        storeLocationCollection {
            items {
                tags
                name
                address
                phone
                location {
                    lat
                    lon
                }
            }
        }
    }
    `
    const response = await apiCall(query);
    const json = await response.json();
    return json.data.storeLocationCollection.items;
}

export const getFlavors = async (): Promise<Flavor[]> => {
    const query = `
    {
        flavorCollection {
            items {
                id
                name
                description
                primaryColor
                secondaryColor
                primaryImage {
                    url (transform: {
                        height: 1200
                        resizeStrategy: FILL
                    })
                }
                flavorImage {
                    url (transform: {
                        height: 1200
                        resizeStrategy: FILL
                    })
                }
                ingredientsCollection {
                    items {
                        name
                        icon {
                            url
                            description
                            fileName
                        }
                    }
                }
            }
        }
    }`
    const response = await apiCall(query);
    const json = await response.json();
    return json.data.flavorCollection.items;
}

export const getAboutPage = async (): Promise<AboutPage> => {
    const query = `
    {
        aboutPageCollection (where: {title:"AboutUs"}) {
            items {
                title
                aboutUs
                foundersCollection {
                    items {
                        name
                        about
                        headshot {
                            url
                        }
                    }
                }
            }
        }
    }`
    const response = await apiCall(query);
    const json = await response.json();
    return json.data.aboutPageCollection.items[0];
}

export const getFlavor = async (id: string) => {
    const query = `
    query($id: String){
        flavorCollection (where: {id: $id}) { 
            items {
                id
                name
                description
                primaryColor
                secondaryColor
                primaryImage {
                    url (transform: {
                        height: 1200
                        resizeStrategy: FILL
                    })
                }
                flavorImage {
                    url (transform: {
                        height: 1200
                        resizeStrategy: FILL
                    })
                }
                ingredientsCollection {
                    items {
                        name
                        icon {
                            url
                            description
                            fileName
                        }
                    }
                }
            }
        }
    }
    `
    const variables = {
        id
    };
    const response = await apiCall(query, variables);
    const json = await response.json();
    return json.data.flavorCollection.items?.[0];
}