import { TokenManager, type GetTokensOptions, type OAuth2Tokens } from '@forgerock/javascript-sdk';
import { writable, type Writable } from 'svelte/store';

import type { Maybe } from '$lib/interfaces';

export interface OAuthStore extends Pick<Writable<OAuthTokenStoreValue>, 'subscribe'> {
  get: (getOptions?: GetTokensOptions) => void;
  reset: () => void;
}
export interface OAuthTokenStoreValue {
  completed: boolean;
  error: Maybe<{
    code?: Maybe<number>;
    message: Maybe<string>;
  }>;
  loading: boolean;
  successful: boolean;
  response: Maybe<OAuth2Tokens> | void;
}

export const oauthStore: Writable<OAuthTokenStoreValue> = writable({
  completed: false,
  error: null,
  loading: false,
  successful: false,
  response: null,
});
export function initialize(initOptions?: GetTokensOptions) {
  async function get(getOptions?: GetTokensOptions) {
    /**
     * Create an options object with getOptions overriding anything from initOptions
     * TODO: Does this object merge need to be more granular?
     */
    const options = {
      ...{ query: { prompt: 'none' } },
      ...initOptions,
      ...getOptions,
    };

    let tokens: OAuth2Tokens | void;

    oauthStore.set({
      completed: false,
      error: null,
      loading: true,
      successful: false,
      response: null,
    });

    try {
      tokens = await TokenManager.getTokens(options);
    } catch (err: unknown) {
      if (err instanceof Error) {
        oauthStore.set({
          completed: true,
          error: {
            message: err.message,
          },
          loading: false,
          successful: false,
          response: null,
        });
      }
      return;
    }

    oauthStore.set({
      completed: true,
      error: null,
      loading: false,
      successful: true,
      response: tokens,
    });
  }

  function reset() {
    oauthStore.set({
      completed: false,
      error: null,
      loading: false,
      successful: false,
      response: null,
    });
  }

  return {
    get,
    reset,
    subscribe: oauthStore.subscribe,
  };
}
