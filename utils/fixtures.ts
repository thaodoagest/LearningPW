import { test as base  } from '@playwright/test';
import { CONFIG } from 'utils/config';
import { LoginPage } from 'page-objects/login.page';
import { Common } from 'utils/common';



export const test = base.extend<{

    loggedInPage: void;

}>( {
    loggedInPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);
        await Common.navigateToPage(page);
        await loginPage.logIn(CONFIG.CREDENTIALS.USERNAME, CONFIG.CREDENTIALS.PASSWORD);
        await use();
    },
    
});
export { expect } from '@playwright/test';
