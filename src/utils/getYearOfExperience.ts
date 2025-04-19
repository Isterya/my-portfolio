export const getYearsOfExperience = (startYear: number = 2023): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};
