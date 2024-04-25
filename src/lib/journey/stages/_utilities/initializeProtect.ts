import { journeyStore } from '$journey/journey.store';
import { PIProtect } from '@forgerock/ping-protect';
import { get } from 'svelte/store';

async function initializeProtect() {
  const store = get(journeyStore);
  /**
   * At the very least we need an env id. So lets check if we have one.
   * If we do, we can initialize PingProtect. If we do, we can initialize PingProtect.
   * We are going to use these defaults
   * and overwrite them with whatever we have from the
   * start config call. If we have initialized set to false we can proceed
   */
  if (store?.pingProtect?.envId) {
    try {
      await PIProtect.start({
        envId: store.pingProtect?.envId,
        consoleLogEnabled: store.pingProtect?.consoleLogEnabled,
      });
    } catch (error) {
      console.error(error);
      /*
       * For whatever reason - we have failed to initialize PingProtect
       * lets not break the widget over this and continue;
       */
    }
  }
}

export { initializeProtect };
