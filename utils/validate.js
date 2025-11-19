function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateSignup({ name, email, password }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || !validateEmail(email)) errors.email = 'Valid email required';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
  return { valid: Object.keys(errors).length === 0, errors };
}

function validateLogin({ email, password }) {
  const errors = {};
  if (!email || !validateEmail(email)) errors.email = 'Valid email required';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateSignup, validateLogin };
