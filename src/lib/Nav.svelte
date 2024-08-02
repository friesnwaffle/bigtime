<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="fixed bottom-0 w-full bg-lpm text-lbg dark:bg-dpm dark:text-dbg text-3xl md:text-4xl 2xl:text-5xl rounded-md">
    <div class="container mx-auto flex md:gap-10">
        <a href="/clock" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/clock' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Clock</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
                    <path d="M12 7v5l3 3" />
                </g>
            </svg>
        </a>
        <a href="/timer" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/timer' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Timer</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1.86a5 5 0 0 1-2.227 4.16L13.803 12l2.97 1.98A5 5 0 0 1 19 18.14V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1.86a5 5 0 0 1 2.226-4.16L10.198 12l-2.97-1.98A5 5 0 0 1 5 5.86zm7 6.798l3.664-2.443A3 3 0 0 0 17 5.86V4H7v1.86a3 3 0 0 0 1.336 2.495zm0 2.404l-3.664 2.443A3 3 0 0 0 7 18.14V20h10v-1.86a3 3 0 0 0-1.336-2.495z" />
                </g>
            </svg>
        </a>
        <a href="/stopwatch" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/stopwatch' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Stopwatch</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor" d="M12 2c.937 0 1.85.108 2.726.311a1 1 0 1 1-.452 1.948a9.982 9.982 0 0 0-1.499-.23l-.074-.002a8.95 8.95 0 0 1 4.341 1.517l.606-.606a1 1 0 1 1 1.415 1.414l-.495.495a9 9 0 1 1-7.16-2.827l-.136.006a9.948 9.948 0 0 0-1.546.233a1 1 0 0 1-.452-1.948C10.15 2.108 11.064 2 12 2m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14m0 2a1 1 0 0 1 .993.883L13 9v4a1 1 0 0 1-1.993.117L11 13V9a1 1 0 0 1 1-1" />
                </g>
            </svg>
        </a>
        <a href="/pomodoro" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/pomodoro' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Pomodoro</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                <path fill="currentColor" d="M16.99 6a1 1 0 1 0-2 0v2.99h-.938A5.646 5.646 0 0 0 9.74 7H3.98a5.64 5.64 0 0 0 1.663 4.01A10.987 10.987 0 0 0 1 19.99c0 6.083 4.928 11 11 11h7.96c6.083 0 11-4.928 11-11a10.967 10.967 0 0 0-4.647-8.986A5.642 5.642 0 0 0 27.97 7h-5.76a5.646 5.646 0 0 0-4.312 1.99h-.908zM6.054 13.232a5.666 5.666 0 0 0-.304 1.838h5.77a5.646 5.646 0 0 0 4.468-2.187a5.648 5.648 0 0 0 4.472 2.187h5.76c0-.642-.107-1.259-.305-1.835a8.957 8.957 0 0 1 3.045 6.753v.002c0 4.968-4.023 9-9 9H12c-4.968 0-9-4.023-9-9a8.98 8.98 0 0 1 3.054-6.758" />
            </svg>
        </a>
    </div>
</div>