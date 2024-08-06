import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'

// function createClock() {
//     const { subscribe, set, update } = writable({
//         timezone: '',
//         city: '',
//         country: ''
//     })

//     return {
//         subscribe,
//     }
// }

// export const cs = writable({
//     timezone: '',
//     city: '',
//     country: ''
// })