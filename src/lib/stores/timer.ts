import { writable } from "svelte/store"
import { Duration } from 'luxon'
import { goto } from "$app/navigation"
import { alerts } from "$lib"

function createTS() {
    const { subscribe, set, update } = writable({
        obj: Duration.fromMillis(0),
        started: false,
        running: false,
        message: "Swipe Up/Down to Set Timer"
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
                    message: "Timer Running..."
                }))
            } 
            else {
                reset()
                // alerts.end()
                update(state => ({...state, message:"Timer Ended"}))
                const notification = new Notification("Timer Ended", { body: "Click to set another Timer", icon: '/icons/bell.svg' })
                notification.onclick = (e) => {
                    window.focus()
                    goto('/timer')
                }
            }
        }, 1000)
    }

    function pause() {
        clearInterval(intervalId)
        update(state => ({
            ...state,
            running: false,
            message: "Timer Paused..."
        }))
    }

    function reset() {
        clearInterval(intervalId)
        set({
            obj: Duration.fromMillis(0),
            started: false,
            running: false,
            message: "Swipe Up/Down to Set Timer"
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