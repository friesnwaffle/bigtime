import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'

function createClock() {
    const { subscribe, set, update } = writable({
        slug: ""
    })

    function reset() {
        set({
            slug: ""
        })
    }

    return {
        subscribe,
        reset
    }
}

export const cs = createClock()