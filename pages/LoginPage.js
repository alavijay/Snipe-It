require('dotenv').config();
const url = process.env.URL;

class LoginPage {
  constructor(page) {
  this.page = page;
  this.usernameInput = page.getByRole('textbox', { name: 'Username' });
  this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goToSinpeIt() {
  await this.page.goto(url);
  expect(await this.page.title()).toContain('Snipe-IT Asset Management Demo');
  }

  async login() {
  await this.usernameInput.fill('admin');
  await this.passwordInput.fill('password');
  await this.loginButton.click();
  }
}

module.exports = LoginPage;
