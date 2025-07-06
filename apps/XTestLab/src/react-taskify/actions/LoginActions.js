import LoginPage from '../pages/LoginPage.js'

export default class LoginActions {
  constructor (page) {
    this.loginPage = new LoginPage(page)
  }

  async navigateToLoginPage () {
    await this.loginPage.page.goto(this.loginPage.url)
  }

  async login (user) {
    await this.loginPage.emailInput.fill(user.email)
    await this.loginPage.passwordInput.fill(user.password)
    await this.loginPage.submitButton.click()
  }

  async getErrorMessage () {
    return this.loginPage.errorMessage
  }

  async isLoginSuccessful () {
    return this.page.url().includes('/onboarding')
  }
}
