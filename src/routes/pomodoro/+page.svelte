<svelte:head>
    <title>Pomodoro</title> 
</svelte:head>

<script lang="ts">
    import { Duration } from "luxon";

    let workSession = Duration.fromObject({minutes: 25})
    let breakSession = Duration.fromObject({minutes: 5})

    let currentSession = workSession
    let isWorkSession:boolean = true
    let running:boolean = false
    let intervalId:number
    let message:HTMLDivElement

    function startPause() {
        if (!running) {
            running = true
            message.innerHTML = isWorkSession ? 'Focus Session' : 'Break'
            intervalId = setInterval(() => {
                if (currentSession.as('seconds') !== 0) {
                    currentSession = currentSession.minus(1000)
                    message.innerHTML = isWorkSession ? 'Focus Session' : 'Break'
                }
                else {
                    isWorkSession = !isWorkSession
                    currentSession = isWorkSession ? workSession : breakSession 
                    message.innerHTML = isWorkSession ? 'Focus Session' : 'Break'
                }
            }, 1000)
        }
        else {
            running = false
            clearInterval(intervalId)
            message.innerHTML = 'Paused'
        }

        function startSession() {
            intervalId = setInterval(() => {
                currentSession = currentSession.minus(1000)
            })
        }
    }

    function reset() {
        running = false
        clearInterval(intervalId)
        isWorkSession = true
        currentSession = workSession
        message.innerHTML = 'Hit Play Button to Start Focus Session'
    }
</script>

<div class="h-[90vh] grid place-content-center text-center">
    <div bind:this={message}>Hit Play Button to Start Focus Session</div>
    <div class="font-RubikMono text-[13vw] xl:text-[10vw]">{currentSession.toFormat('hh:mm:ss')}</div>

    <div class="absolute left-1/2 -translate-x-1/2 top-2/3 text-4xl flex justify-center align-center gap-10">
        <button on:click={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3s-3 1.331-3 3s1.329 3 3 3" />
                <path fill="currentColor" d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219a9.053 9.053 0 0 0-2.43-2.43a8.95 8.95 0 0 0-3.219-1.355a9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053a7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725a7.11 7.11 0 0 1-.644 1.188a7.2 7.2 0 0 1-.858 1.039a7.028 7.028 0 0 1-3.536 1.907a7.13 7.13 0 0 1-2.822 0a6.961 6.961 0 0 1-2.503-1.054a7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034a9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183a9.014 9.014 0 0 0 3.218-1.355a8.886 8.886 0 0 0 1.331-1.099a9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814" />
            </svg>
        </button>
        <button class="text-8xl" on:click={startPause}>
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
        <!-- INVISIBLE BUTTON ONLY FOR ALIGNMENT -->
        <button class="invisible">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"></svg>
        </button>
    </div>
</div>