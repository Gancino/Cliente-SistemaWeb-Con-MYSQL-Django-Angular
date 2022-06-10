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
    },
    MSG_LISTA_OBTENIDA: 'Datos obtenidos correctamente!',
    MSG_LISTA_VACIA: 'No existen registros!',
    MSG_TITLE_DELETE: 'Eliminar registro!',
    MSG_TITLE_DELETE_ARCHIVO: 'Eliminar archivo!',
    MSG_TITLE_SUCCESS: 'Buen trabajo!',
    MSG_TITLE_ERROR: 'Error!',
    MSG_DELETE: '¿Esta seguro de eliminar este registro?',
    MSG_DELETE_ARCHIVO: '¿Esta seguro de eliminar este archivo?',
    MSG_CONFIRM_DELETE: 'Si, eliminar!',
    MSG_CANCEL_DELETE: 'Cancelar',
    MSG_ADD_SUCCESS: 'Registro agregado correctamente en el sistema.',
    MSG_ADD_ERROR: '¡Error al agregar el registro, intentalo de nuevo!',
    MSG_EDIT_SUCCESS: 'Registro actualizado correctamente.',
    MSG_EDIT_ERROR: '¡Error al actualizar el registro, intentalo de nuevo!'
}