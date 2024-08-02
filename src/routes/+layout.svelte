<script>
    import "../app.css";
    import Header from "$lib/Header.svelte";
    import Nav from "$lib/Nav.svelte";
</script>

<main class="w-screen h-screen bg-lbg text-lpm dark:bg-dbg dark:text-dpm font-primary">
    <Header />
    <slot />
    <!-- <slot name="clocktype" /> -->
    <Nav />
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>