const { test, expect } = require('@playwright/test');
const exp = require('constants');

// test('First playwright test 1', async ({ browser }) => {
//     // chrome - plugins /cookies
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://staging.hughessignage.com")
// })

// test('Verify Title of the Page', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com")
//     await page.title();
//     await expect(page).toHaveTitle("MediaSignage");
// })



// test('Verify Login with invalid email', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com");
//     await page.locator("#user_email").fill("123");
//     await page.locator("[value='Next']").click();
//     await expect(page.locator(".error-form")).toHaveText("Invalid Email.");
// })

// test('Verify Login with invalid password', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com");
//     await page.locator("#user_email").fill("ipadhsg+5009@gmail.com");
//     await page.locator("[value='Next']").click();
//     await page.locator("#user_password").fill("12");
//     await page.locator("[value='Verify']").click();
//     await expect(page.locator(".error-form")).toHaveText("Invalid Email or password.");
// })

// test('Verify Login with email missing', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com");
//     await page.locator("#user_email").fill(" ");
//     await page.locator("[value='Next']").click();
//     await expect(page.locator(".error-form")).toHaveText("Email is missing.");
// })

// test('Verify Login with valid credentials', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com");
//     await page.locator("#user_email").fill("ipadhsg+5009@gmail.com");
//     await page.locator("[value='Next']").click();
//     await page.locator("#user_password").fill("hsgtest");
//     await page.locator("[value='Verify']").click();
//     await expect(page.locator(".centered")).toHaveText("Signed in successfully.");
//     await page.waitForLoadState('networkidle')
//     const allOrgs = await page.locator(".table-base-body").locator("[data-type='name']").allInnerTexts();
//     console.log(allOrgs);
// })

// test('Create Super Admin', async ({ page }) => {
//     await page.goto("https://staging.hughessignage.com");
//     await page.locator("#user_email").fill("ipadhsg+5009@gmail.com");
//     await page.locator("[value='Next']").click();
//     await page.locator("#user_password").fill("hsgtest");
//     await page.locator("[value='Verify']").click();
//     await expect(page.locator(".centered")).toHaveText("Signed in successfully.");
//     await page.waitForLoadState('networkidle');
//     await page.locator("[data-tooltip-text='Users']").click();
//     await page.waitForLoadState('networkidle');
//     await page.locator("[data-tooltip-text='Add User']").click();
//     await page.locator("#user_first_name").fill("MSS1");
//     await page.locator("#user_last_name").fill("Test1");
//     await page.locator("#user_email").fill("msstesthsg+6666@gmail.com");
//     await page.locator("[value='Save']").click();
// })

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