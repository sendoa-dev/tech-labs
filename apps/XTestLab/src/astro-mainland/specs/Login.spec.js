import { test, expect } from '@playwright/test'

import AuthActions from '../actions/LoginActions.js'
import applicantData from '../fixtures/ApplicantData.js'
import ApplicantModel from '../models/ApplicantModel.js'

test.describe('Login Page Tests', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {
    const authActions = new AuthActions(page)
    const validUser = new ApplicantModel(applicantData.validUser.email, applicantData.validUser.password)

    await authActions.navigateToLoginPage()

    await authActions.login(validUser)

    expect(await authActions.isLoginSuccessful()).toBe(true)
  })

  test('should display an error with invalid credentials', async ({ page }) => {
    const authActions = new AuthActions(page)
    const invalidUser = new ApplicantModel(applicantData.invalidUser.email, applicantData.invalidUser.password)

    await authActions.navigateToLoginPage()

    await authActions.login(invalidUser)

    await expect(await authActions.getErrorMessage()).toBeVisible()
  })
})
