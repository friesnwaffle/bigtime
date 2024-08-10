<script>
    import "../app.css";
    import { page } from "$app/stores";
</script>

<head:svelte>
    <meta property="og:image" content="/og-card.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content={$page.url.href}>

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="/og-card.png">
    <meta name="twitter:url" content={$page.url.href}>
</head:svelte>

<slot />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>