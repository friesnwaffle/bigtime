import { writable } from "svelte/store"
import { Duration } from 'luxon'
import { goto } from "$app/navigation"

function createTS() {
    const { subscribe, set, update } = writable({
        obj: Duration.fromMillis(0),
        started: false,
        running: false,
    })

    let timerId:number
    const eventDispatcher = new EventTarget()

    function run() {
        timerId = setInterval(() => {
            let remainingSeconds
            subscribe( state => {
                remainingSeconds = state.obj.as('seconds') - 1
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
                clearInterval(timerId)
                eventDispatcher.dispatchEvent(new CustomEvent('timerEnd'))
                goto('/timer')
            }
        }, 1000)
    }

    function pause() {
        clearInterval(timerId)
        update(state => ({
            ...state,
            running: false
        }))
    }

    function reset() {
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
        onTimerEnd: (callback) => eventDispatcher.addEventListener('timerEnd', callback)
    }
}

export const ts = createTS()