<svelte:head>
    <title>Timer</title> 
</svelte:head>

<script lang="ts">
    // import { Duration } from "luxon";
    import PageStructure from "$lib/PageStructure.svelte";
    import { ts } from "$lib/stores/timer";

    let timer:any
    $: timer = $ts

    // const timer = $ts
    // let message:HTMLDivElement,
    //     intervalId:number

    function addMinute() {
        timer.durObj = timer.durObj.plus({minutes: 1})
    }

    function playPause() {
        if (!$ts.running) {
            ts.run()
        }
        else {
            ts.pause()
        }
    }

</script>

<PageStructure>

    <div slot="clock">{timer.durObj.toFormat('hh:mm:ss')}</div>

    <div slot="lower">
        <button on:click={addMinute}>+1</button>
        <br> <br>
        <button on:click={playPause}>Play/Pause</button>
    </div>

</PageStructure>