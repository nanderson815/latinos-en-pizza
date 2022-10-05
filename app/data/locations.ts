
export interface Location {
    name: string;
    lat: number;
    long: number;
    address: string;
    tags?: string[];
}

export const locations: Location[] = [
    {
        name: "Grant Park Market",
        lat: 33.74636858126393,
        long: -84.37079962883581,
        address: "519 Memorial Dr SE Suite A-04, Atlanta, GA 30312",
        tags: ["pops", "pints"]
    }
];