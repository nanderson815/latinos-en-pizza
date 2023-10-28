const resources: any = {
  contactUs: {
    "en-US": "Contact Us",
    es: "Contáctenos",
  },
  locations: {
    "en-US": "Locations",
    es: "Ubicaciones",
  },
  events: {
    "en-US": "Events",
    es: "Eventos",
  },
  about: {
    "en-US": "About",
    es: "Sobre",
  },
  resources: {
    "en-US": "Resources",
    es: "Recursos",
  },
  links: {
    "en-US": "Links",
    es: "Enlaces",
  },
  press: {
    "en-US": "Press",
    es: "Prensa",
  },
  findLocations: {
    "en-US": "Find Locations",
    es: "Encuentra ubicaciones",
  },
  locationCTA: {
    "en-US": "Find a location near you!",
    es: "Encuentra una ubicación cerca de ti!",
  },
  contactUsCTA: {
    "en-US": " Have a question or feedback? We’d love to hear from you!",
    es: "¿Tienes alguna pregunta o comentario? ¡Nos encantaría saber de ti!",
  },
  yourEmail: {
    "en-US": "Your Email",
    es: "Tu correo electrónico",
  },
  subject: {
    "en-US": "Subject",
    es: "Tema",
  },
  yourMessage: {
    "en-US": "Your Message",
    es: "Tu mensaje",
  },
  send: {
    "en-US": "Send",
    es: "Enviar",
  },
  success: {
    "en-US": "Success!",
    es: "Éxito!",
  },
  error: {
    "en-US": "Something went wrong!",
    es: "Algo salió mal!",
  },
};

export const getResources = (locale: string) => {
  // return object with only the keys that match the locale
  return Object.keys(resources).reduce((acc, key) => {
    acc[key] = resources[key as keyof typeof resources][locale];
    return acc;
  }, {} as Record<string, string>);
};
