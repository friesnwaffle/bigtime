import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'

export let geoipData = writable()

// function createClock() {
//     const { subscribe, set, update } = writable({
//         geoip: {}
//     })

//     function reset() {
//         set({
//             geoip: {}
//         })
//     }

//     return {
//         subscribe,
//         reset
//     }
// }

// export const cs = createClock()