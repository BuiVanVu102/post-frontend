import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export class ToastifyInfo {
  static info(message: string) {
    return Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#03a9f4',
      },
    }).showToast()
  }
  static success(message: string) {
    return Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#4caf50',
      },
    }).showToast()
  }
  static error(message: string) {
    return Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#d32f2f',
      },
    }).showToast()
  }
}
