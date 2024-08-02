export async function load({ fetch, params }) {
    // const response = await fetch('http://ip-api.com/json/')
    // const geoip = await response.json()
    // return geoip
    return {
        "status": "success",
        "country": "India",
        "countryCode": "IN",
        "region": "BR",
        "regionName": "Bihar",
        "city": "Patna",
        "zip": "800002",
        "lat": 25.5908,
        "lon": 85.1348,
        "timezone": "Asia/Kolkata",
        "isp": "Bharti Airtel",
        "org": "Bharti Airtel Ltd.",
        "as": "AS24560 Bharti Airtel Ltd., Telemedia Services",
        "query": "223.235.177.197"
    }
}