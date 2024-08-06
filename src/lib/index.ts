// NORMALISE NAME
export function normaliseName(input:String) {
    return input.replace(/[\s_-]+/g, '').toLowerCase();
}

// SOUND ALERTS
function createAlerts() {
    function start() {
        const audio = new Audio('/sounds/beeponce.mp3')
        audio.play()
    }
    function end() {
        const audio = new Audio('/sounds/beeptwice.mp3')
        audio.play()
    }

    return {
        start,
        end
    }
}

export const alerts = createAlerts()

// GET TIMEZONE FUNCTION
import locationTimezone from 'node-location-timezone';

let timezone:string, 
    city:string, 
    country:string

export function getTimezone(query:string) {

    const countryData = locationTimezone.getCountries()
        .find(result => normaliseName(result.name) === normaliseName(query))

    const cityData = locationTimezone.getLocations()
        .find(result => normaliseName(result.city) === normaliseName(query))

    if (countryData) {
        country = countryData.name
        city = ''
        // COUNTRY HAS ONLY ONE TIMEZONE
        if (countryData?.timezones?.length === 1) {
            timezone = countryData.timezones[0]
        }
        // COUNTRY HAS MULTIPLE TIMEZONE
        else {
            // TIMEZONE OF COUNTRY'S CAPITAL CONSIDERED
            let capital = locationTimezone.findCapitalOfCountryIso(countryData?.iso2)
            city = capital.name
            timezone = capital.timezone
        }
    }
    else if (cityData) {
        city = cityData?.city
        country = cityData?.country.name
        timezone = cityData?.timezone
    }
    
    return {
        timezone,
        city,
        country
    }
}