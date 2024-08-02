<script lang="ts">
    import Header from "./Header.svelte";
    import Nav from "./Nav.svelte";
</script>

<main class="w-screen h-screen grid content-center bg-lbg text-lpm dark:bg-dbg dark:text-dpm font-primary">
    <Header />
    <div class="container mx-auto text-center">
        <div class=""><slot name="upper" /></div>
        <div class="font-clock text-[13vw] md:text-[12vw] 2xl:text-[13rem] "><slot name="clock" /></div>
        <div class="absolute left-1/2 -translate-x-1/2 text-4xl"><slot name="lower" /></div>
    </div>
    <Nav />
</main>