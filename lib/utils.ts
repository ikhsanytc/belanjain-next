import zxcvbn from "zxcvbn";

export function validatePassword(password: string) {
  const { score, feedback } = zxcvbn(password);
  if (score < 3) {
    return {
      valid: false,
      message: feedback.suggestions.join(" "),
    };
  }
  return { valid: true };
}
