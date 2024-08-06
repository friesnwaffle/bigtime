import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'
import { goto } from "$app/navigation"
import { alerts } from "$lib"

let focus = Duration.fromObject({ seconds: 5 })
let brk = Duration.fromObject({ seconds: 3 })

function createPS() {
    const { subscribe, set, update } = writable({
        started: false,
        running: false,
        current: focus,
        isFocus: true
    })

    let intervalId:number

    function run() {
        let current:Duration
        subscribe(state => current = state.current)

        intervalId = setInterval(() => {
            if (current.as('seconds') !== 0) {
                update(state => ({
                    ...state, current: current.minus(1000),
                    running: true,
                    started: true
                }))
            }
            else {
                clearInterval(intervalId)

                // alerts.end()

                let isFocus:boolean
                subscribe(state => isFocus = state.isFocus)
                const notification = new Notification(isFocus ? "Focus Session Over" : "Break Over", { 
                    body: `Click to Start ${isFocus ? "Break" : "Focus Session"}`, icon: '/icons/bell.svg' 
                })
                notification.onclick = (e) => {
                    if (!isFocus) {
                        window.focus()
                        goto('/pomodoro')
                    }
                    run()
                }

                update(state => ({
                    ...state,
                    running: false,
                    isFocus: !state.isFocus,
                    current: state.isFocus ? brk : focus
                }))
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
            started: false,
            running: false,
            current: focus,
            isFocus: true
        })
    }

    return {
        subscribe,
        run,
        pause,
        reset,
    }
}

export const ps = createPS()