<script lang="ts">
    import { icons } from "$lib/icons";
    import PageStructure from "$lib/PageStructure.svelte";
    import { ps } from "$lib/stores/pomodoro";

    let pomodoro:any
    $: pomodoro = $ps
</script>

<svelte:head>
    <link rel="icon" href="/icons/pomodoro.svg" />
    <title>
        { !pomodoro.running
            ? 'Pomodoro'
            : `${pomodoro.isFocus ? 'Focus' : 'Break'} ${pomodoro.current.toFormat('mm:ss')}` }
    </title> 
</svelte:head>

<PageStructure>

    <div slot="upper">
        {!pomodoro.started ? 'Hit Play to Start Pomodoro Cycle'
                : pomodoro.isFocus ? (pomodoro.running ? 'Focus Session...' : 'Start Focus Session')
                : (pomodoro.running ? 'Break Session...' : 'Start Break Session')}
    </div>

    <div slot="clock">{pomodoro.current.toFormat('hh:mm:ss')}</div>

    <div slot="lower" class="flex justify-center align-center gap-10">
        <button on:click={() => ps.reset()}>
            {@html icons.reset}
        </button>
        <button class="text-8xl" on:click={() => pomodoro.running ? ps.pause() : ps.run()}>
            {@html pomodoro.running ? icons.pause : icons.play}
        </button>
        <!-- INVISIBLE BUTTON ONLY FOR ALIGNMENT -->
        <button class="invisible">
            {@html icons.empty}
        </button>
        
    </div>
</PageStructure>