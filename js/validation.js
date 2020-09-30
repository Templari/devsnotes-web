const Validator = {
  handleSubmit: (event, form = null, callback = false, token = false) => {
    event.preventDefault()
    Validator.clearErrors()
    return form ? runAjax(form, callback, token) : false
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