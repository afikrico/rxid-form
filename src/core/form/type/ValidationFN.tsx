import { ValidatorError } from "./ValidationError";

export type ValidatorFN = (value: any) => ValidatorError