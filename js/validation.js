const form = document.querySelector('form')
const Validator = {
  handleSubmit: (event) => {
    event.preventDefault()

    let inputs = form.querySelectorAll('input')
    let submit = form.querySelector('button[type=submit]')
    
    // Limpar mensagens de erro, se houver
    Validator.clearErrors()

    submit.disabled = true

    ajax(form.dataset.url, form.method, (res) => {
      res = JSON.parse(res)
      console.log(res)

      if (res['error']) {

        // Registro
        if (typeof(res['error']) == 'object') {
          for (let name in res['error']) {
            console.log(name)
            Validator.showError(form.querySelector(`#${name}`), res['error'][name])
          }
        }
        // Login
        else {
          Validator.showError(form.querySelector('#email'), res['error'])
        }
      }

      submit.disabled = false

      if (res['token']) {
        // TODO: salvar token em um cookie
        console.log(res['token'])
        form.submit()
      }
    })
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