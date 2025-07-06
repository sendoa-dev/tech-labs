export default class LoginPage {
  constructor (page) {
    this.page = page
  }

  get url () {
    // return `${process.env.BASE_URL}/auth/signin`
  }

  get emailInput () {
    return this.page.locator('#signinForm\\.form\\.username\\.value')
  }

  get passwordInput () {
    return this.page.locator('#signinForm\\.form\\.password\\.value')
  }

  get submitButton () {
    return this.page.locator('button[type="submit"]')
  }

  get errorMessage () {
    return this.page.locator('[data-test="core-notification"]')
  }
}
