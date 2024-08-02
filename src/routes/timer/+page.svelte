<svelte:head>
    <title>Timer</title> 
</svelte:head>

<script lang="ts">
    import { Duration } from "luxon";
    import PageStructure from "$lib/PageStructure.svelte";

    let running:boolean = false
    let started:boolean = false
    let timer:Duration = Duration.fromMillis(0)
    let intervalId:number
    let message:HTMLDivElement
    
    // SCROLL OVER ANY UNIT TO SET TIMER
    function scroll(e:WheelEvent, unit) {
        if (!started && !running) {                         // ONLY POSSIBLE WHEN NEITHER STARTED NOR RUNNING
            if (e.deltaY < 0 && timer.get(unit) < 60) {     // SCROLL UP TO INCREASE UPTO 60
                timer = timer.plus({ [unit]: 1})
            }
            else if (e.deltaY > 0 && timer.get(unit) > 0) { // SCROLL DOWN TO DECREASE UNTILL 0
                timer = timer.minus({ [unit]: 1})
            }
        }
    }

    // ADD ONE MIN BUTTON, WORKS AT ALL TIMES
    function addMinute() {
        timer = timer.plus({minutes: 1})
    }

    // START OR PAUSE BUTTON
    function startPause() {
        if (timer.as('seconds') > 0) {
            started = true                                  // FIRST CLICK STARTS THE TIMER
            message.innerHTML = 'Timer running...'
            if (!running && timer.as('seconds') > 0) {      // 
                running = true
                intervalId = setInterval(() => {            // TICKER
                    if (timer.as('seconds') === 0) {
                        reset()                             // RESET WHEN TIMER === 0
                        message.innerHTML = 'Timer ended'
                    }
                    else {
                        timer = timer.minus(1000)
                    }
                }, 1000)
                
            }
            else {                                          // SUBSEQUENT CLICKS PAUSES THE TIMER
                running = false
                clearInterval(intervalId)
                message.innerHTML = 'Timer paused...'
            }
        }
    }

    // RESET BUTTON/FUNCTION
    function reset() {
        started = false
        running = false
        clearInterval(intervalId)
        timer = Duration.fromMillis(0)
        message.innerHTML = 'Scroll up/down to set timer'
    }
</script>

<PageStructure>

    <div slot="upper" bind:this={message}>Scroll up/down to set timer</div>

    <div slot="clock" class="flex justify-center">
        <div class="{started || running ? 'cursor-not-allowed' : 'cursor-ns-resize'}" on:wheel={(e) => scroll(e, 'hours')}>{timer.toFormat('hh:mm:ss').split(':')[0]}</div>
        :
        <div class="{started || running ? 'cursor-not-allowed' : 'cursor-ns-resize'}" on:wheel={(e) => scroll(e, 'minutes')}>{timer.toFormat('hh:mm:ss').split(':')[1]}</div>
        :
        <div class="{started || running ? 'cursor-not-allowed' : 'cursor-ns-resize'}" on:wheel={(e) => scroll(e, 'seconds')}>{timer.toFormat('hh:mm:ss').split(':')[2]}</div>
    </div>

    <div slot="lower" class="flex justify-center align-center gap-10">
        <button on:click={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3s-3 1.331-3 3s1.329 3 3 3" />
                <path fill="currentColor" d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219a9.053 9.053 0 0 0-2.43-2.43a8.95 8.95 0 0 0-3.219-1.355a9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053a7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725a7.11 7.11 0 0 1-.644 1.188a7.2 7.2 0 0 1-.858 1.039a7.028 7.028 0 0 1-3.536 1.907a7.13 7.13 0 0 1-2.822 0a6.961 6.961 0 0 1-2.503-1.054a7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034a9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183a9.014 9.014 0 0 0 3.218-1.355a8.886 8.886 0 0 0 1.331-1.099a9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814" />
            </svg>
        </button>
        <button class="text-8xl {timer.as('seconds') > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}" on:click={startPause}>
            {#if running}
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M5.5 5.5A.5.5 0 0 1 6 5h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5zm4-.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5A.5.5 0 0 0 10 5z" clip-rule="evenodd" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m-.847-9.766A.75.75 0 0 0 6 5.866v4.268a.75.75 0 0 0 1.153.633l3.353-2.134a.75.75 0 0 0 0-1.266z" clip-rule="evenodd" />
                </svg>
            {/if}
        </button>
        <button class="" on:click={addMinute}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 8c-.55 0-1 .45-1 1v3H5c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V9c0-.55-.45-1-1-1m5.5-1.21c0 .57.52 1 1.08.89L17 7.4V17c0 .55.45 1 1 1s1-.45 1-1V6.27c0-.65-.6-1.12-1.23-.97l-2.57.62c-.41.09-.7.46-.7.87" />
            </svg>
        </button>
    </div>
</PageStructure>