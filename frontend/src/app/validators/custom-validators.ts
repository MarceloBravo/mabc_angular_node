import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  // ----------------   Valida Rut   ----------------
  static validaRut(rutControl: AbstractControl) {
    if(rutControl.value === null || rutControl.value === "")return null;
    if(!CustomValidators.evaluar(rutControl.value.split('.').join(''))){
       return { validaRut: true};   //Rut no valido (utilizar el nombre validaRut en el código html: *ngIf ...hasError('validaRut'))
    }
    return null; //Rut Ok
  }

  private static evaluar(rutCompleto: string){
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
    var tmp 	= rutCompleto.split('-');
    var digv	= tmp[1];
    var rut 	= tmp[0];
    if ( digv === 'K' ) digv = 'k' ;
    return (CustomValidators.dv(rut).toString() === digv );
  }

  private static dv(T: any){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
  }
  // ----------------   /Valida Rut   ----------------


  // ----------------   Confirmar contraseña   ----------------
    static confirmPassword(control1: string, control2: string){
      return (control: AbstractControl): {[key: string]: boolean} | null => {
        let value1 = control.parent?.get(control1)?.value
        let value2 = control.parent?.get(control2)?.value
        if(value1 !== value2 ){
          return {confirmPassword: true}
        }
        return null;
      }
    }
  // ----------------   /Confirmar contraseña   ----------------
}
