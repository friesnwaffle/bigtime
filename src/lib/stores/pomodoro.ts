import { writable } from "svelte/store"
import { DateTime, Duration } from 'luxon'

let focus = Duration.fromObject({ minutes: 25 })
let brk = Duration.fromObject({ minutes: 5 })

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
                beeptwice()
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

function beeponce() {
    const beeponce = new Audio('/sounds/beeponce.mp3')
    beeponce.play()
}
function beeptwice() {
    const beeptwice = new Audio('/sounds/beeptwice.mp3')
    beeptwice.play()
}