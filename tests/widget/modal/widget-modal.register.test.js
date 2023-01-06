import { expect, test } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { asyncEvents, verifyUserInfo } from '../../utilities/async-events.js';

test('Modal widget with user registration', async ({ page }) => {
  const { clickButton, navigate } = asyncEvents(page);

  await navigate('widget/modal?journey=Registration');

  await clickButton('Open Login Modal', '/authenticate');

  await page.getByLabel('Username').fill(uuid());
  await page.getByLabel('First Name').fill('Demo');
  await page.getByLabel('Last Name').fill('User');
  await page.getByLabel('Email Address').fill('test@auto.com');
  await page.getByLabel('Password').fill('j56eKtae*1');
  await page
    .getByLabel('Select a security question')
    .selectOption({ label: `What's your favorite color?` });
  await page.getByLabel('Security Answer').fill('Red');

  const termsLink = page.getByRole('link', { name: 'View full Terms & Conditions' });
  const termsUrl = await termsLink.getAttribute('href');
  const termsTarget = await termsLink.getAttribute('target');

  expect(termsUrl).toBe('https://www.forgerock.com/terms');
  expect(termsTarget).toBe('_blank');

  // `getByLabel()` does not work, likely due to the `<span>` elements (?)
  await page.getByText('Please accept our Terms & Conditions').click();

  await clickButton('Register', '/authenticate');

  await verifyUserInfo(page, expect, 'register');
});
