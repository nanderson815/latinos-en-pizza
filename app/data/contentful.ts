const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export interface Location {
  name: string;
  location: {
    lat: number;
    lon: number;
  };
  address: string;
  phone: string;
  tags?: string[];
  linksCollection: {
    items: Link[];
  };
}

export interface Link {
  target: string;
  displayText?: string;
  icon?: ContentfulImage;
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

export interface Press {
  title: string;
  link: string;
  description: string;
  image: ContentfulImage;
}

export interface Testimonial {
  name: string;
  quote: string;
  accentColor: string;
  backgroundColor: string;
}

export interface ContentfulImage {
  url: string;
  description?: string;
  fileName?: string;
  contentType?: string;
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
    items: Bio[];
  };
}

export interface HomePageSection {
  leftAlign: boolean;
  title: string;
  body: any;
  backgroundColor: string;
  textColor: string;
  media: ContentfulImage;
}

export interface HomePage {
  heroText: string;
  heroImage: ContentfulImage;
  sectionsCollection: {
    items: HomePageSection[];
  };
}

async function apiCall(query: string, variables?: any) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  };
  return await fetch(fetchUrl, options);
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
    `;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.eventCollection.items;
};

export const getPress = async (locale: string): Promise<Press[]> => {
  const query = `
    {
        pressCollection (locale: "${locale}") {
            items {
                title
                link
                description
                image {
                    url
                }
            }
        }
    }
    `;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.pressCollection.items;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const query = `
    {
        testimonialCollection {
            items {
                name
                quote
                accentColor
                backgroundColor
            }
        }
    }
    `;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.testimonialCollection.items;
};

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
                linksCollection(limit:10) {
                  items {
                    target
                    displayText
                    icon {
                      url
                    }
                  }
                }
            }
        }
    }
    `;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.storeLocationCollection.items;
};

export const getHomePage = async (locale: string): Promise<HomePage> => {
  const query = `
 {
    homePage(id: "2IipJvLWEft3Qsb65R6S4R", locale: "${locale}") {
        heroText
        heroImage {
          url
        }
        sectionsCollection {
          items {
            media{
              url
              contentType
            }
            leftAlign
            title
            backgroundColor
            textColor
            body {
              json
            }
          }
        }
      }
  }`;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.homePage;
};

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
    }`;
  const response = await apiCall(query);
  const json = await response.json();
  return json.data.aboutPageCollection.items[0];
};
