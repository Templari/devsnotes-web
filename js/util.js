function runAjax (form, callback, token = false) {
  let method = form.method
  let submit = form.querySelector('*[type=submit]')

  method = method.value ? method.value : method
  
  if (submit) {
    submit.disabled = true
  }

  ajax(form.dataset.url, method, (json, status) => {
    if (submit) {
      submit.disabled = false
    }

    if (typeof callback === 'function' && callback(json, status) === false) {
      return false
    }

    if (status == 200) {
      window.location = form.action
    }
  }, form, token)

  return false
}

function ajax(url, method, callback, form = null, token = false, lang = 'pt_BR') {
  let request = new XMLHttpRequest()
  let formData = form ? new FormData(form) : null
  
  if (method == 'PUT' && form) {
    url += '?'
    let formInputs = form.querySelectorAll('input')
    let formTextAreas = form.querySelectorAll('textarea')

    for (let i of formInputs) {
      if (i.name == 'method') continue
      url = addDataToURL(url, i.name, i.value)
    }
  
    for (let i of formTextAreas) {
      url = addDataToURL(url, i.name, i.value)
    }
  }

  request.overrideMimeType("application/json");
  request.open(method, url, true);

  if (token) {
    request.setRequestHeader('Authorization', `Bearer ${token}`)
  }

  request.setRequestHeader('Accept-Language', lang)

  request.onreadystatechange = () => {
    let res = []

    if (request.readyState != 4) {
      return false
    }

    try {
      res = JSON.parse(request.responseText)
    } catch (e) {
      console.warn(e)
    }

    if (request.status != 200) {
      console.log(res, request.status)
    }

    callback(res, request.status)
  };
  request.send(formData);
}

function addDataToURL(url, name, value) {
  return url + '&' + name + '=' + value
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}