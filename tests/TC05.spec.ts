import { test, expect } from 'utils/fixtures';
import { HomePage } from 'page-objects/home.page';
import { MyAccountPage } from 'page-objects/myAccount.page';

test ('TC05 - orders appear in order history ', async ({page, loggedInPage}) => {

    const accountPage = new MyAccountPage (page);

    await accountPage.gotoRecentOrders();
    //await accountPage.verifyOrderS(2);
                                                  
    // Additional steps to complete the order and verify order history would go here    
});


