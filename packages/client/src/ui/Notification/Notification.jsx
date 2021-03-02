import { toast } from 'react-toastify'

export const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  })
}

export const notifyError = (message) => {
  toast.error(message, {
    autoClose: 10000,
    position: toast.POSITION.TOP_CENTER
  })
}

export const notifyWarning = (message) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_LEFT
  })
}
