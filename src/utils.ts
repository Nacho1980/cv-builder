import { languageLevels } from "./constants";

export const validInternationalPhoneNumber = (phone: string) => {
  const regex = /^\+?[1-9]\d{1,14}$/;

  // Check the regex and ensure at least 9 digits (ignoring non-numeric characters)
  const digitsOnly = phone.replace(/\D/g, ""); // Remove non-digit characters
  return regex.test(phone) && digitsOnly.length >= 9;
};

export const getLevelText = (level: number) => {
  return languageLevels.find((lng) => lng.value === level)?.label;
};

export const compareDatesMMYYYY = (date1: string, date2: string) => {
  // Split the dates into month and year
  const [month1, year1] = date1.split("-").map(Number);
  const [month2, year2] = date2.split("-").map(Number);

  // Compare years first
  if (year1 > year2) {
    return 1; // date1 is after date2
  } else if (year1 < year2) {
    return -1; // date1 is before date2
  } else {
    // If years are equal, compare months
    if (month1 > month2) {
      return 1; // date1 is after date2
    } else if (month1 < month2) {
      return -1; // date1 is before date2
    } else {
      return 0; // Both dates are the same
    }
  }
};
