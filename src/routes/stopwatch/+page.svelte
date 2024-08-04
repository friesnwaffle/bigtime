<script lang="ts">
    import PageStructure from "$lib/PageStructure.svelte";
    import { sws } from "$lib/stores/stopwatch";

    let sw:any
    $: sw = $sws

    let ol:HTMLOListElement
    let message:HTMLDivElement

    function startPause() {
        if (!sw.running) {
            sws.run()
            message.innerHTML = 'Stopwatch running...'
        } 
        else {
            sws.pause()
            message.innerHTML = 'Stopwatch paused...'
        }
    }

    function createTimestamp() {
        if (sw.running) {
            sw.timestamps = [...sw.timestamps, sw.timeLapsed.toFormat('mm:ss.SSS')]
            ol.scroll({ top: ol.scrollHeight, behavior: 'smooth' })
        }
    }
</script>

<svelte:head>
    <link rel="icon" href="/icons/stopwatch.svg" />
    <title>{ !sw.running ? 'Stopwatch' : sw.timeLapsed.toFormat('hh:mm:ss') }</title> 
</svelte:head>

<PageStructure>
    <div slot="upper" bind:this={message}>Hit Play Button to Start Stopwatch</div>

    <div slot="clock">
        {sw.timeLapsed.hours > 0 ? sw.timeLapsed.get('hour') : ''}<!--
        --><span>{sw.timeLapsed.toFormat('mm:ss')}</span><!--
        --><span class="text-[5vw] ml-3">{sw.timeLapsed.toFormat('ss SSS').split(' ')[1]}</span>
    </div>
    
    <div slot="lower" class="flex justify-center align-center gap-10">
        <button on:click={() => sws.reset()} class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M10 2h4m-2 12v-4m-8 3a8 8 0 0 1 8-7a8 8 0 1 1-5.3 14L4 17.6" />
                    <path d="M9 17H4v5" />
                </g>
            </svg>
        </button>
        <button on:click={startPause} class="text-8xl">
            {#if sw.running}
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M5.5 5.5A.5.5 0 0 1 6 5h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5zm4-.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5A.5.5 0 0 0 10 5z" clip-rule="evenodd" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m-.847-9.766A.75.75 0 0 0 6 5.866v4.268a.75.75 0 0 0 1.153.633l3.353-2.134a.75.75 0 0 0 0-1.266z" clip-rule="evenodd" />
                </svg>
            {/if}
        </button>
        <button on:click={createTimestamp}>
            <svg class={sw.running ? 'opcity-100' : 'opacity-50 cursor-not-allowed'} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                <path fill="currentColor" fill-rule="evenodd" d="M5.5.5A.5.5 0 0 1 6 0h3a.5.5 0 0 1 0 1H8v1.12a6.363 6.363 0 0 1 2.992 1.016a.638.638 0 0 1 .066-.078l1-1a.625.625 0 0 1 .884.884l-.975.975A6.4 6.4 0 1 1 7 2.119V1H6a.5.5 0 0 1-.5-.5m-3.4 8a5.4 5.4 0 1 1 10.8 0a5.4 5.4 0 0 1-10.8 0m5.4 0V4.1a4.4 4.4 0 1 0 3.111 7.511z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</PageStructure>

{#if sw.timestamps.length > 0}
    <div class="absolute top-4 right-4 text-sm dark:text-dpm">
        <p class="mb-2 text-center">Timestamps</p>
        <ol class="max-h-40 overflow-y-scroll no-scrollbar italic" bind:this={ol}>
            {#each sw.timestamps as stamp, i}
                <li class="list-none font-mono">#{(i+1).toLocaleString('en-US', {minimumIntegerDigits: 2})}&nbsp;&nbsp;&nbsp;&nbsp;{stamp}</li>
            {/each}
        </ol>
    </div>
{/if}