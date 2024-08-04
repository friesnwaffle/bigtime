import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'

function createSWS() {
    const { subscribe, set, update } = writable({
        running: false,
        started: false,
        timeLapsed: Duration.fromMillis(0),
        timestamps: []
    })

    let intervalId:number
    let startTime: DateTime

    function run() {
        subscribe( state => !state.started && (startTime = DateTime.now()) )

        intervalId = setInterval(() => {
            update(state => ({
                ...state,
                started: true,
                running: true,
                timeLapsed: DateTime.now().diff(startTime)
            }))
        }, 10)
    }

    function pause() {
        clearInterval(intervalId)
        update(state => ({
            ...state,
            running: false
        }))
    }

    function reset() {
        clearInterval(intervalId)
        set({
            running: false,
            started: false,
            timeLapsed: Duration.fromMillis(0),
            timestamps: []
        })
    }

    return {
        subscribe,
        run,
        pause,
        reset,
    }
}

export const sws = createSWS()