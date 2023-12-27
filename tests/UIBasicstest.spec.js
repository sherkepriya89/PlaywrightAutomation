const { test, expect } = require('@playwright/test');
const exp = require('constants');
// test('Login with valid credentials', async ({ page }) => {
//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
//     await page.locator("[name='username']").fill("Admin");
//     await page.locator("[name='password']").fill("admin123");
//     await page.locator("[type='Submit']").click();
//     await expect(page).toHaveTitle("OrangeHRM");
// })

// test('Search for a section in the sidebar', async ({ page }) => {
//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
//     await page.locator("[name='username']").fill("Admin");
//     await page.locator("[name='password']").fill("admin123");
//     await page.locator("[type='Submit']").click();
//     await page.locator("[placeholder='Search']").fill("Admin");
//     await page.locator("[href *= 'viewAdminModule']").click();
//     await expect(page.locator("[class*='module']")).toHaveText("Admin")
// })

test('Verify Help link in Admin section (Child Page)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("[name='username']").fill("Admin");
    await page.locator("[name='password']").fill("admin123");
    await page.locator("[type='Submit']").click();
    await page.locator("[placeholder='Search']").fill("Admin");
    await page.locator("[href *= 'viewAdminModule']").click();
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("[title='Help']").click(),
        ]
    )
    await expect(newPage).toHaveTitle("How to Add a User Account – OrangeHRM");
    await page.locator("[placeholder='Search']").fill("Admin");
    await page.locator("[href *= 'viewAdminModule']").click();
    await expect(page.locator("[class*='module']")).toHaveText("Admin")
});