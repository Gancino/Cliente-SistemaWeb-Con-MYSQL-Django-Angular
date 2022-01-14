import { Injectable } from '@angular/core';
import { ERRORS_VALIDATIONS } from '@data/constants/errors/errors-validations.const';
import { ENUM_VALIDATION_OPTIONS } from '@data/enum';
import { IResponseValidation } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  /**
   * Method that validate each field
   * @param value any
   * @param type ENUM_VALIDATIONS_OPTIONS
   */
  validateField(value: any, type: ENUM_VALIDATION_OPTIONS){
    switch (type) {
      case ENUM_VALIDATION_OPTIONS.EMAIL:
        return this.validateEmail(value);
      case ENUM_VALIDATION_OPTIONS.PASSWORD:
        return this.validatePassword(value);
    }
  }

  /**
   * Vañidate email with pattern
   * @param v any
   */
  private validateEmail(v: any):IResponseValidation {
    const r: IResponseValidation = { msg: '', isValid: true};
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    r.isValid = pattern.test(v);
    r.msg = (v === '') ? ERRORS_VALIDATIONS.EMAIL_REQUIRED_FIELD : ERRORS_VALIDATIONS.EMAIL_INVALID;
    return r;
  }

  /**
   * Validate password with pattern
   * @param v any
   */
  private validatePassword(v: any):IResponseValidation {
    const r: IResponseValidation = { msg: '', isValid: true};
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$/;
    r.isValid = pattern.test(v);
    r.msg = ( v === '') ? ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD : ERRORS_VALIDATIONS.PASSWORD_REQUIRED_PATTERN;
    return r;
  }
}
