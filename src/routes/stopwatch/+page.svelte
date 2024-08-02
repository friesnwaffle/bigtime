<svelte:head>
    <title>Stopwatch</title> 
</svelte:head>

<script lang="ts">
    import { DateTime, Duration } from "luxon"
    import { onMount, onDestroy } from "svelte"
    import { writable } from "svelte/store";
    import { page } from "$app/stores";
    console.log($page)

    let startTime: DateTime
    let timeLapsed: Duration = Duration.fromMillis(0)
    let running: boolean
    let interval: number
    let stamps = writable<string[]>([])
    let ol:HTMLOListElement
    let message:HTMLDivElement

    function startPause() {
        if (!running) {
            startTime = DateTime.now().minus(timeLapsed)
            interval = setInterval(() => {
                timeLapsed = DateTime.now().diff(startTime)
            }, 10)
            running = true
            message.innerHTML = 'Running...'
        } else {
            clearInterval(interval)
            running = false
            message.innerHTML = 'Paused'
        }
    }

    function reset() {
        clearInterval(interval)
        timeLapsed = Duration.fromMillis(0)
        stamps.set([])
        running = false
        message.innerHTML = 'Hit Play Button to Start Stopwatch'
    }

    function timestamp() {
        if (running) {
            stamps.update(currentStamps => [...currentStamps, timeLapsed.toFormat('mm:ss.SSS')])
            ol.scroll({ top: ol.scrollHeight, behavior: 'smooth' })
        }
    }

    // onMount(() => {
    //     document.addEventListener('keydown', (e) => {
    //         if (e.code === 'Space') {
    //             startPause()
    //         }
    //     })
    // })

    onDestroy(() => {
        clearInterval(interval)
    })
</script>



<div class="h-[90vh] grid place-content-center text-center">

    <div bind:this={message}>Hit Play Button to Start Stopwatch</div>

    <div class="font-RubikMono text-[13vw] xl:text-[10vw]">
        {timeLapsed.hours > 0 ? timeLapsed.get('hour') : ''}<!--
        --><span class="font-RubikMono">{timeLapsed.toFormat('mm:ss')}</span><!--
        --><span class="font-RubikMono text-[5vw] ml-3">{timeLapsed.toFormat('ss SSS').split(' ')[1]}</span>
    </div>

    {#if $stamps.length > 0}
    <div class="absolute top-4 right-4 text-sm">
        <p class=" mb-2">Timestamps</p>
        <ol class="max-h-40 overflow-y-scroll no-scrollbar italic" bind:this={ol}>
            {#each $stamps as stamp, i}
                <li class="list-none font-mono">#{(i+1).toLocaleString('en-US', {minimumIntegerDigits: 2})}&nbsp;&nbsp;&nbsp;&nbsp;{stamp}</li>
            {/each}
        </ol>
    </div>
    {/if}
    
    <div class="absolute left-1/2 -translate-x-1/2 top-2/3 text-4xl flex justify-center align-center gap-10">
        <button on:click={reset} class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M10 2h4m-2 12v-4m-8 3a8 8 0 0 1 8-7a8 8 0 1 1-5.3 14L4 17.6" />
                    <path d="M9 17H4v5" />
                </g>
            </svg>
        </button>
        <button on:click={startPause} class="text-8xl">
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
        <button on:click={timestamp}>
            <svg class={running ? 'opcity-100' : 'opacity-50 cursor-not-allowed'} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                <path fill="currentColor" fill-rule="evenodd" d="M5.5.5A.5.5 0 0 1 6 0h3a.5.5 0 0 1 0 1H8v1.12a6.363 6.363 0 0 1 2.992 1.016a.638.638 0 0 1 .066-.078l1-1a.625.625 0 0 1 .884.884l-.975.975A6.4 6.4 0 1 1 7 2.119V1H6a.5.5 0 0 1-.5-.5m-3.4 8a5.4 5.4 0 1 1 10.8 0a5.4 5.4 0 0 1-10.8 0m5.4 0V4.1a4.4 4.4 0 1 0 3.111 7.511z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</div>