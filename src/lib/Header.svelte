<script lang="ts">
    import search from "$lib/search";
    import { clickOutside } from "$lib/clickOutside";
    import { page } from "$app/stores";

    let query:string
    let inputElement:HTMLInputElement
    let resultsElement:HTMLUListElement
    let results: any[] = []

    function showInput() {
        inputElement.classList.remove('hidden')
        inputElement.focus()
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }
    function hideInput() {
        inputElement.classList.add('hidden')
        resultsElement.classList.add('hidden')
    }
    function showResults() {
        query === '' ? results = [] : results = search(query)
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }
    function divblur() {
        alert('blureed')
    }
</script>

<header class="fixed top-0 left-0 right-0">
    <div class="container mx-auto flex justify-between text-sm md:font-bold">
        <!-- LOGO -->
        <a href="/" class="uppercase tracking-widest font-bold px-5 py-3 bg-lsc dark:text-dbg">BigTime</a>
        
        <!-- CONTAINER INPUT AND BUTTON -->
        <!-- ONLY IF PAGE IS CLOCK -->
        {#if $page.url.pathname === '/clock'}
        <div class="flex items-center">

            <!-- CONTAINER INPUT AND RESULTS -->
            <div class="relative " use:clickOutside on:click_outside={hideInput}>

                <!-- SEARCH INPUT -->
                <input type="text" bind:value={query} bind:this={inputElement} on:input={showResults} class="hidden outline-none bg-transparent" placeholder="Search...">
    
                <!-- SEARCH RESULTS -->
                <ul bind:this={resultsElement} class="absolute hidden py-2 ">
                    {#each results as result}
                        <li class="py-1 my-1">
                            <a data-sveltekit-reload class="block w-full" href="/{result.slug}">{result.displayName}</a>
                        </li>
                    {/each}
                </ul>
            </div>
    
            <!-- SEARCH BUTTON -->
            <button class="text-xl" on:click={showInput}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" />
                    </g>
                </svg>
            </button>

        </div>
        {/if}

    </div>
</header>