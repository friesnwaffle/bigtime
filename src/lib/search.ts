import locationTimezone from 'node-location-timezone';

let query:string
let results: Result[]
interface Result {
    displayName: string;
    slug: string;
}

function search(query:string) {
    const iso = locationTimezone.findCountryByIso(query)

    const countries = locationTimezone.getCountries()
        .filter(result => result.name.toLowerCase().includes(query))
        .slice(0, 2)
        .map(country => ({ displayName: country.name, slug: country.name.replace(/\s+/g, '-') }))

    const cities = locationTimezone.getLocations()
        .filter( result => result.city.toLowerCase().startsWith(query) )
        .slice(0, 2)
        .map(city => ({ displayName: `${city.city}, ${city.country.iso2}`, slug: city.city.replace(/\s+/g, '-') }))
    
    if (iso) {
        results = [
            { displayName: `${iso.name} (${iso.iso2})`, slug: iso.name.replace(/\s+/g, '-') },
            ...countries,
            ...cities
        ]
    }
    else {
        results = [...countries, ...cities]
    }

    return results
}

export default search