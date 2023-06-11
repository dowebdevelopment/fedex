import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function namelessPasswordValidator(firstName: string, lastName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    
    const hasFirstName = value.toLowerCase().includes(firstName.toLowerCase());
    const hasLastName = value.toLowerCase().includes(lastName.toLowerCase());
    
    return hasFirstName || hasLastName ? { 'containsName': true } : null;
  };
}