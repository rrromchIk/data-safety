import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const parametersFormValidator: ValidatorFn = (
    form: AbstractControl,
): ValidationErrors | null => {
    const a = form.get("a")?.value;
    const c = form.get("c")?.value;
    const X0 = form.get("X0")?.value;
    const m = form.get("m")?.value;

    if (!m) {
        return null;
    }

    // Check if a, c, X0 are within the range [0, m)
    const isALessThanM = a >= 0 && a < m;
    const isCLessThanM = c >= 0 && c < m;
    const isX0LessThanM = X0 >= 0 && X0 < m;

    if (isALessThanM && isCLessThanM && isX0LessThanM) {
        return null;
    }

    return {
        aOutOfRange: !isALessThanM,
        cOutOfRange: !isCLessThanM,
        X0OutOfRange: !isX0LessThanM,
    };
};
