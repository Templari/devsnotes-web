const Validator = {
  handleSubmit: (event, form, callback, token) => {
    event.preventDefault()
    Validator.clearErrors()
    return runAjax(form, callback, token)
  },
  showError: (ipt, errorMessage) => {
    ipt.classList.add('is-invalid')

    if (errorMessage) {
      let eError = document.createElement('div')
      eError.classList.add('error')
      eError.classList.add('text-danger')
      eError.innerHTML = errorMessage

      ipt.parentElement.insertBefore(eError, ipt.nextElementSibling)
    }
  },
  clearErrors: () => {
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