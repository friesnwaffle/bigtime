<script lang="ts">
    import { DateTime } from 'luxon'
    import { page } from '$app/stores'
    import { getTimezone } from '$lib'

    let timezone:string,
        city:string,
        country:string

    $: slug = $page.params.slug

    $: slug
        ? { timezone, city, country } = getTimezone(slug)
        : { timezone, city, country } = $page.data
</script>

<svelte:head>
    <meta property="og:title" content="Current time in {city ? city : country}">
    <meta property="og:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">

    <meta name="twitter:title" content="Current time in {city ? city : country}">
    <meta name="twitter:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">
</svelte:head>