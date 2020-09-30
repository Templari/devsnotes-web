const Validator = {
  handleSubmit: (event, form = null, callback = false, token = false) => {
    event.preventDefault()
    Validator.clearErrors(form)
    return form ? runAjax(form, callback, token) : false
  },
  showError: (ipt, errorMessage) => {
    if (! ipt) {
      return false
    }

    ipt.classList.add('is-invalid')

    let eError = document.createElement('div')
    eError.classList.add('error')
    eError.classList.add('text-danger')
    eError.innerHTML = errorMessage ?? ''

    ipt.parentElement.insertBefore(eError, ipt.nextElementSibling)
  },
  clearErrors: (form) => {
    if (! form) {
      return false
    }

    let inputs = form.querySelectorAll('input')
    let errors = form.querySelectorAll('.error')

    for (let i of inputs) {
      i.classList.remove('is-invalid')
    }

    for (let e of errors) {
      e.remove()
    }
  }
}