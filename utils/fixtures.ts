import { CommonActions } from "./common-actions";
import { Page } from "@playwright/test";

export class FixtureActions {
    static async preCondition(page: Page) {
        await CommonActions.navigateToPage(page);

    }
}

