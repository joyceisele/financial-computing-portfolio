const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email =
      document.getElementById('email').value;

    const password =
      document.getElementById('password').value;

    const message =
      document.getElementById('login-message');

    try {
      await apiRequest('/auth/login', {
        method: 'POST',

        body: JSON.stringify({
          email,
          password
        })
      });

      sessionStorage.setItem(
        'financialPortfolioLoggedIn',
        'true'
      );

      window.location.href = 'dashboard/';
    } catch (error) {
      message.textContent =
        'Unable to sign in. Please check your details.';

      message.className = 'message error';
    }
  });
}

const registerForm =
  document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      const name =
        document.getElementById('name').value;

      const email =
        document.getElementById('email').value;

      const password =
        document.getElementById('password').value;

      const message =
        document.getElementById('register-message');

      try {
        await apiRequest('/auth/register', {
          method: 'POST',

          body: JSON.stringify({
            name,
            email,
            password
          })
        });

        message.textContent =
          'Account created successfully.';

        message.className =
          'message success';
      } catch (error) {
        message.textContent =
          'Unable to create account.';

        message.className =
          'message error';
      }
    }
  );
}