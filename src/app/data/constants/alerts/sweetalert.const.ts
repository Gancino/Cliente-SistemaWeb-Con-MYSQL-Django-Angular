import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

export const Alertas = {
    mostrarAlert(titlemsg: string, msg: string, ico: any){
        Swal.fire({
          title: titlemsg, 
          text: msg,
          width: '40%',
          padding: '1rem',
          backdrop: true,
          timer: 4000,
          timerProgressBar: true,
          //toast: true,
          position: 'center',
          allowOutsideClick: true,
          allowEscapeKey: false,
          allowEnterKey: false, 
          stopKeydownPropagation: false,
          confirmButtonColor: '#3f51b5',
          icon: ico
        });
    },
    mostrarToast(msg : string, _snackBar: MatSnackBar){
        _snackBar.open(msg, '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
    }
}