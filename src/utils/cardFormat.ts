export function formatCardDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(.{4})(?=.)/g, "$1 ").trim();
}

export function formatExpiryDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function formatCvvInput(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 3);
}

export function cardDigits(pan: string): string {
  return pan.replace(/\D/g, "");
}

export function validateCardBasic(pan: string): string | null {
  const d = cardDigits(pan);
  if (d.length < 12 || d.length > 19) {
    return "Enter the card number.";
  }
  return null;
}

export function validateExpiryBasic(exp: string): string | null {
  if (!/^\d{2}\/\d{2}$/.test(exp.trim())) {
    return "Enter expiry as MM/YY.";
  }
  return null;
}

export function validateCvvThreeDigits(cvv: string): string | null {
  if (!/^\d{3}$/.test(cvv)) {
    return "CVV must be 3 digits.";
  }
  return null;
}
