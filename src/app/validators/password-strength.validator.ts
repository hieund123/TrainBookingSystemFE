// imports cần thiết
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Validator factory
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) return null; // let required validator handle empty

    const errors: ValidationErrors = {};

    if (value.length < 6) {
      errors['minLength'] = { requiredLength: 6, actualLength: value.length };
    }
    if (!/[A-Z]/.test(value)) {
      errors['upperCase'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['lowerCase'] = true;
    }
    if (!/\d/.test(value)) {
      errors['number'] = true;
    }
    // ký tự không phải chữ hoặc số => ký tự đặc biệt
    if (!/[^A-Za-z0-9]/.test(value)) {
      errors['specialChar'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
