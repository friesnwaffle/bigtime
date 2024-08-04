<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="fixed bottom-0 w-full bg-lpm text-lbg dark:bg-dpm dark:text-dbg text-3xl md:text-4xl 2xl:text-5xl rounded-md">
    <div class="container mx-auto flex md:gap-10">
        <a href="/clock" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/clock' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Clock</span>
            <img src="/icons/clock.svg" alt="clock" class="w-10">
        </a>
        <a href="/timer" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/timer' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Timer</span>
            <img src="/icons/timer.svg" alt="clock" class="w-10">
        </a>
        <a href="/stopwatch" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/stopwatch' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Stopwatch</span>
            <img src="/icons/stopwatch.svg" alt="clock" class="w-10">
        </a>
        <a href="/pomodoro" class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname === '/pomodoro' ? 'bg-lsc dark:bg-dsc rounded-md shadow-md' : ''}">
            <span class="text-sm">Pomodoro</span>
            <img src="/icons/pomodoro.svg" alt="clock" class="w-10">
        </a>
    </div>
</div>