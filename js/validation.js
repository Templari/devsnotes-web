const form = document.querySelector('form')
const Validator = {
  handleSubmit: (event) => {
    event.preventDefault()
    let method = form.method
    method = method.value ? method.value : method
    let submit = form.querySelector('button[type=submit]')
    
    // Limpar mensagens de erro, se houver
    Validator.clearErrors()

    submit.disabled = true

    ajax(form.dataset.url, method, (res) => {
      submit.disabled = false
      console.log(res)
      res = JSON.parse(res)
      console.log(res)

      if (res['error']) {

        // Registro
        if (typeof(res['error']) == 'object') {
          for (let name in res['error']) {
            let error = res['error'][name][0]
            Validator.showError(form.querySelector(`#${name}`), error)
          }
        }
        // Login
        else {
          Validator.showError(form.querySelector('#email'), res['error'])
        }
      }

      if (res['token']) {
        console.log(res['token'])
        // TODO: salvar token em um cookie
        setCookie('token', res['token'], 1)
        // form.submit()
        window.location = form.action
      }

      return false
    }, form)
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

form.addEventListener('submit', Validator.handleSubmit)