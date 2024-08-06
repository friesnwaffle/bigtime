<script lang="ts">
    import search from "$lib/search";
    import { clickOutside } from "$lib/clickOutside";
    import { page } from "$app/stores";
    import { afterUpdate, onMount } from "svelte";

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

    let notificationPermission = ""
    onMount(() => notificationPermission = Notification.permission)
    function askNotificationPermission() {
        if (!("Notification" in window))
        return

        Notification.requestPermission().then((permission) => {
            notificationPermission = permission
        })
    }
    
    let slugBeforeUpdate = $page.params.slug
    afterUpdate(() => {
        if ($page.params.slug !== slugBeforeUpdate) {
            query = ""
            results = []
            inputElement.classList.add('hidden')
        }
        slugBeforeUpdate = $page.params.slug
    })
  
</script>

<header class="">
    <div class="container mx-auto flex justify-between text-sm md:font-bold">
        <!-- LOGO -->
        <div class="uppercase tracking-widest font-bold py- flex items-center gap-5 ">
            <a href="/" class="px-5 py-3 bg-lsc dark:text-dbg">BigTime</a>
            {#if notificationPermission !== "granted"}
            <button on:click={askNotificationPermission} title="Allow Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                        <g>
                            <path stroke-dasharray="4" stroke-dashoffset="4" d="M12 3V5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;0" />
                            </path>
                            <path stroke-dasharray="28" stroke-dashoffset="28" d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.4s" values="28;0" />
                            </path>
                            <animateTransform attributeName="transform" begin="0.8s" dur="6s" keyTimes="0;0.05;0.15;0.2;1" repeatCount="indefinite" type="rotate" values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3" />
                        </g>
                        <path stroke-dasharray="8" stroke-dashoffset="8" d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
                            <animateTransform attributeName="transform" begin="1s" dur="6s" keyTimes="0;0.05;0.15;0.2;1" repeatCount="indefinite" type="rotate" values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8" />
                        </path>
                    </g>
                </svg>
            </button>
            {/if}
            
        </div>
        
        <!-- CONTAINER INPUT AND BUTTON -->
        <!-- ONLY IF PAGE IS CLOCK -->
        {#if $page.url.pathname.includes('/clock')}
        <div class="flex items-center">

            <!-- CONTAINER INPUT AND RESULTS -->
            <div class="relative " use:clickOutside on:click_outside={hideInput}>

                <!-- SEARCH INPUT -->
                <input type="text" bind:value={query} bind:this={inputElement} on:input={showResults} class="hidden outline-none bg-transparent" placeholder="Search timezones...">
    
                <!-- SEARCH RESULTS -->
                <ul bind:this={resultsElement} class="absolute hidden py-2 ">
                    {#each results as result}
                        <li class="py-1 my-1">
                            <a class="block w-full" href="/clock/{result.slug}">{result.displayName}</a>
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