<script lang="ts">
  import { onMount } from 'svelte';
  import type { JourneyOptionsStart } from '$lib/widget/types';
  import type { PingOneProtectEvaluationCallback } from '@forgerock/javascript-sdk';
  import { PIProtect } from '@forgerock/ping-protect';
  import Spinner from '$components/primitives/spinner/spinner.svelte';
  import type { SelfSubmitFunction } from '$journey/journey.interfaces';
  import type { Maybe } from '$lib/interfaces';

  export let callback: PingOneProtectEvaluationCallback;
  export let selfSubmitFunction: Maybe<SelfSubmitFunction> = null;
  export let pingProtect: JourneyOptionsStart['pingProtect'] = {
    envId: '',
    consoleLogEnabled: false,
  };

  let pauseBehavioralData = false;

  onMount(() => {
    async function handleGetData() {
      try {
        await PIProtect.getData();
      } catch (error) {
        if (error instanceof Error) {
          callback.setClientError(error.message);
        } else {
          callback.setClientError('An error occurred while initializing PingProtect');
        }
      }
      return selfSubmitFunction && selfSubmitFunction();
    }
    handleGetData();
  });

  $: {
    pauseBehavioralData = pingProtect?.behavioralDataCollection ?? false;
    if (typeof window !== 'undefined') {
      if (pauseBehavioralData === true) {
        PIProtect.pauseBehavioralData();
      } else {
        PIProtect.resumeBehavioralData();
      }
    }
  }
</script>

<div>
  <Spinner colorClass="tw_text-primary-light" layoutClasses="tw_h-24 tw_mb-6 tw_w-24" />
</div>
