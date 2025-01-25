import { languageLevels } from "./constants";

export const validateInternationalPhoneNumber = (phone: string) => {
  const regex = /^\+?[1-9]\d{1,14}$/;

  // Check the regex and ensure at least 9 digits (ignoring non-numeric characters)
  const digitsOnly = phone.replace(/\D/g, ""); // Remove non-digit characters
  return regex.test(phone) && digitsOnly.length >= 9;
};

export const getLevelText = (level: number) => {
  return languageLevels.find((lng) => lng.value === level)?.label;
};
