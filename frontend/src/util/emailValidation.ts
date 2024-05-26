/**
 * Validates an email address.
 *
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email is valid.
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default validateEmail;
