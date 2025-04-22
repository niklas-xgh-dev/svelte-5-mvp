<!-- src/GradioComponent.svelte -->
<script lang="ts">
    import { Block } from "@gradio/atoms";
    import { StatusTracker } from "@gradio/statustracker";
    import type { LoadingStatus } from "@gradio/statustracker";
    import type { Gradio } from "@gradio/utils";
  
    // props that Gradio would normally pass in interactive mode,
    // but we'll just ignore them for our static MVP:
    export let gradio: Gradio<Record<string,never>> | undefined;
    export let elem_id = "";
    export let elem_classes: string[] = [];
    export let scale: number | null = null;
    export let min_width: number | undefined = undefined;
    export let loading_status: LoadingStatus | undefined = undefined;
    export let mode: "static" | "interactive" = "static";
  
    // your component‑specific prop:
    export let value = "Hello from Gradio!";
  </script>
  
  <Block
    visible={true}
    {elem_id}
    {elem_classes}
    {scale}
    {min_width}
    allow_overflow={false}
    padding={true}
  >
    {#if loading_status}
      <StatusTracker
        autoscroll={gradio?.autoscroll}
        i18n={gradio?.i18n}
        {...loading_status}
      />
    {/if}
  
    <!-- replace this with whatever your component actually does -->
    <p>{value}</p>
  </Block>
  