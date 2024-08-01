export async function load({ fetch, params }) {
    const response = await fetch('http://ip-api.com/json/')
    const geoip = await response.json()
    return geoip
}