import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'
import { goto } from "$app/navigation"

function createSWS() {
    const { subscribe, set, update } = writable({
        running: false,
        timeLapsed: Duration.fromMillis(0),
        timestamps: []
    })

    let intervalId:number
    const eventDispatcher = new EventTarget()

    function run() {
        let timeLapsed = Duration.fromMillis(0)
        let startTime = DateTime.now().minus(timeLapsed)
        intervalId = setInterval(() => {
            update(state => ({
                ...state,
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
            timeLapsed: Duration.fromMillis(0),
            timestamps: []
        })
    }

    return {
        subscribe,
        run,
        pause,
        reset,
        onTimerEnd: (callback) => eventDispatcher.addEventListener('timerEnd', callback)
    }
}

export const sws = createSWS()