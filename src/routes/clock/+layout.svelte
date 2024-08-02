<script lang="ts">
    import { page } from '$app/stores';
    import { DateTime } from 'luxon'
    import PageStructure from '$lib/PageStructure.svelte';
    
    const geoip = $page.data
    const { timezone, city, country } = geoip
    
    let is12H:boolean = false
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

{#if timezone}

<PageStructure>    
    <div slot="upper">Time in <span class="font-bold">{city ? `${city}, ` : ''} {country}</span> now:</div>
    <button slot="clock" on:click={() => is12H = !is12H}>
        <div >
            {#if is12H}
                {now.toFormat('h:mm:ss')}<span class="font-clock text-[3vw]">{now.toFormat('a')}</span>
            {:else}
                {now.toFormat('HH:mm:ss')}
            {/if}
        </div>
    </button>
    <div slot="lower">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</PageStructure>

{:else}

    <div class="h-[90vh] grid place-content-center justify-self-center text-center">
        <h1 class="font-clock text-9xl">404</h1>
        <h2 class="text-6xl font-thin mb-10">Bad Timing</h2>
        <p>Something went wrong. Please try again later.</p>
    </div>

{/if}