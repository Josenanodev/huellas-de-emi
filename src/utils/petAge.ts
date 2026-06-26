import type { Pet } from '../types';

export function calculateAgeYears(approximateBirthDate?: Date | string | null): number | null {
  if (!approximateBirthDate) return null;

  const birthDate = new Date(approximateBirthDate);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const hasBirthdayPassed =
    monthDiff > 0 || (monthDiff === 0 && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return Math.max(age, 0);
}

export function getPetAgeYears(pet: Pet): number | null {
  return calculateAgeYears(pet.approximateBirthDate) ?? pet.age ?? null;
}

export function formatPetAge(pet: Pet): string {
  const age = getPetAgeYears(pet);
  if (age === null) return 'Edad por confirmar';

  return age === 1 ? '1 año' : `${age} años`;
}
