<script lang="ts">
    import Header from "./Header.svelte";
    import Nav from "./Nav.svelte";
</script>

<main class="w-screen h-screen overflow-hidden bg-lbg text-lpm dark:bg-dbg dark:text-dpm font-primary flex flex-col">
    <Header />
    <div class="container mx-auto text-center flex-1 grid content-center">
        <div class=""><slot name="upper" /></div>
        <div class="font-clock text-[13vw] md:text-[12vw] 2xl:text-[13rem] "><slot name="clock" /></div>
        <div class="h-20"><slot name="lower" /></div>
    </div>
    <Nav />
</main>