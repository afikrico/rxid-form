import { ValidatorError } from "../../core/form/type/ValidationError";
import { ValidatorFN } from "../../core/form/type/ValidationFN";

export const requiredValidator = (
    message: string = "Data wajib diisi"
):ValidatorFN => {
    return (value): ValidatorError => {
        if (
            typeof value === undefined ||
            value === null ||
            value === "" ||
            value === '' ||
            value === false
        ) {
            return {message}
        }
        return null;
    }
}