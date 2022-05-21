const realmPath =
  import.meta.env.VITE_FR_REALM_PATH !== 'root'
    ? `realms/${import.meta.env.VITE_FR_REALM_PATH}`
    : '';

export const AM_COOKIE_NAME = import.meta.env.VITE_FR_AM_COOKIE_NAME;
export const AM_DOMAIN_PATH = import.meta.env.VITE_FR_AM_URL;
export const JSON_REALM_PATH = `/json/realms/root/${realmPath}`;
export const OAUTH_REALM_PATH = `/oauth2/realms/root/${realmPath}`;
