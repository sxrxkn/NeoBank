export const validateEmail = (value: string) => {
  if (!value) {
    return "Required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      value
    )
  ) {
    return "Email invalid adress";
  }
};

export const validateAmount = (value: number) => {
  if (!value) {
    return "Required field";
  } else if (value < 15000 || value > 600000) {
    return "The amount should be from 15000 to 600000";
  }
};

export const validateRequiredFields = (value: string) => {
  if (!value) {
    return "Required field";
  }
};

export const validatePasportSeries = (value: number) => {
  if (!value) {
    return "Required field";
  } else if (String(value).length !== 4) {
    return "The series must be 4 digits";
  }
};

export const validatePasportNumber = (value: number) => {
  if (!value) {
    return "Required field";
  } else if (String(value).length !== 6) {
    return "The number must be 6 digits";
  }
};

export const validateBirthdate = (value: Date) => {
  if (!value) {
    return "Required field";
  }
  const parts = String(value).split("-");
  const day = parseInt(parts[2]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[0]);

  if (year < 1950 || year > 2023 || month === 0 || month > 12)
    return "Enter the correct date";

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;

  if (!(day > 0 && day <= monthLength[month - 1]))
    return "Enter the correct date";

  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return "User must be over 18 years old";
  }
};

export const validateEmployerINN = (value: string) => {
  if (!value) {
    return "Required field";
  } else if (String(value).length !== 12) {
    return "The employer INN must be 12 digits";
  }
};

export const validateDate = (value: Date) => {
  if (!value) {
    return "Required field";
  }
  const parts = String(value).split("-");
  const day = parseInt(parts[2]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[0]);

  if (year < 1950 || year > 2023 || month === 0 || month > 12)
    return "Enter the correct date";

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;

  if (!(day > 0 && day <= monthLength[month - 1]))
    return "Enter the correct date";
};
