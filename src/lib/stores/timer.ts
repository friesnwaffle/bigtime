import { writable } from "svelte/store"
import { Duration } from 'luxon'
import { goto } from "$app/navigation"

function createTS() {
    const { subscribe, set, update } = writable({
        obj: Duration.fromMillis(0),
        started: false,
        running: false,
    })

    let intervalId:number

    function run() {
        intervalId = setInterval(() => {
            let remainingSeconds
            subscribe( state => {
                remainingSeconds = state.obj.as('seconds')
            })
                        
            if (remainingSeconds > 0) {
                update(state => ({
                    ...state,
                    obj: state.obj.minus(1000),
                    started: true,
                    running: true,
                }))
            } 
            else {
                reset()
                goto('/timer')
            }
        }, 1000)
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
            obj: Duration.fromMillis(0),
            started: false,
            running: false,
        })
    }

    return {
        subscribe,
        run,
        pause,
        reset,
    }
}

export const ts = createTS()