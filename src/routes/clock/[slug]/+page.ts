import { normaliseName } from '$lib';
import locationTimezone from 'node-location-timezone';

let timezone:string, 
    city_name:string, 
    country_name:string

export async function load({ params }) {
    
    const countryData = locationTimezone.getCountries()
        .find(result => normaliseName(result.name) === normaliseName(params.slug))

    const cityData = locationTimezone.getLocations()
        .find(result => normaliseName(result.city) === normaliseName(params.slug))

    if (countryData) {
        country_name = countryData.name
        // COUNTRY HAS ONLY ONE TIMEZONE
        if (countryData?.timezones?.length === 1) {
            timezone = countryData.timezones[0]
        }
        // COUNTRY HAS MULTIPLE TIMEZONE
        else {
            // TIMEZONE OF COUNTRY'S CAPITAL CONSIDERED
            let capital = locationTimezone.findCapitalOfCountryIso(countryData?.iso2)
            city_name = capital.name
            timezone = capital.timezone
        }
    }
    else if (cityData) {
        city_name = cityData?.city
        country_name = cityData?.country.name
        timezone = cityData?.timezone
    }
    // NOTHING FOUND
    else {
        timezone = ''
    }
    
    return {
        timezone: timezone,
        city: city_name,
        country: country_name
    }
}