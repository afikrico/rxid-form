import { ValidatorFN } from "./type/ValidationFN";
import { ValidatorError } from "./type/ValidationError";

export class FormControl {
  public errors: ValidatorError;
  public value: any;
  constructor(
    private props: [any] | [any, ValidatorFN | Array<ValidatorFN> | null]
  ) {
    this.value = props[0];
    this.errors = this.createErrors(props[0]);
  }

  public getIsValid(): boolean {
    return !this.errors
  }

  public getIsInvalid(): boolean {
    return !!this.errors
  }

  public patchValue(value: any): void {
    this.value = value
    this.errors = this.createErrors(value)
  }

  private createErrors(value: any): ValidatorError {
    if (!this.props[1]) return null;

    const validators = Array.isArray(this.props[1])
      ? this.props[1]
      : [this.props[1]];
    return validators
      .map((validator) => validator(value))
      .filter((error) => error)[0] || null;
  }
}
