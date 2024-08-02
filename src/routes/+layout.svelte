<script lang="ts">
    import "../app.css";
    import { page } from '$app/stores';
    import { DateTime } from 'luxon'
    import Header from "$lib/Header.svelte";
    
    const geoip = $page.data
    const { timezone, city, country } = geoip
    
    let is12H:boolean = true
    let now:any
    if (timezone) {
        now = DateTime.now().setZone(timezone)
        setInterval(() => {
            now = DateTime.now().setZone(timezone);
        })
    }
</script>

<svelte:head>
    <title>
        {timezone ? is12H ? now.toFormat('h:mm a') : now.toFormat('HH:mm') : 'Bigtime'}
    </title>
</svelte:head>

<main class="w-screen h-screen bg-lbg text-lpm dark:bg-dbg dark:text-dpm font-primary">

<Header />
    
{#if timezone}

<div class="h-[90vh] grid place-content-center text-center">
    <div class="mb-8 md:mb-2">Time in <span class="font-bold ">{city ? `${city}, ` : ''} {country}</span> now:</div>
    <button on:click={() => is12H = !is12H}>
        <div class="font-clock text-[13vw] md:text-[12vw] 2xl:text-[13rem]">
            {#if is12H}
                {now.toFormat('h:mm:ss')}<span class="font-clock text-[3vw]">{now.toFormat('a')}</span>
            {:else}
                {now.toFormat('HH:mm:ss')}
            {/if}
        </div>
    </button>
    <div class="mt-8 md:mt-2 text-2xl md:text-3xl">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</div>

{:else}

    <div class="h-[90vh] grid place-content-center justify-self-center text-center">
        <h1 class="font-clock text-9xl">404</h1>
        <h2 class="text-6xl font-thin mb-10">Bad Timing</h2>
        <p>Something went wrong. Please try again later.</p>
    </div>

{/if}
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>