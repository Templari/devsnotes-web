function runAjax (form, callback, token = false) {
  let method = form.method
  let submit = form.querySelector('*[type=submit]')

  method = method.value ? method.value : method
  submit.disabled = true

  ajax(form.dataset.url, method, (json, status) => {
    if (typeof callback === 'function') {
      if (callback(json, status) === false) {
        return false
      }
    }

    window.location = form.action
  }, form, token)

  return false
}

function ajax(url, method, callback, form = null, token = false, lang = 'pt_BR') {
  let formData = form ? new FormData(form) : null;

  let request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open(method, url, true);

  if (token) {
    request.setRequestHeader('Authorization', `Bearer ${token}`)
  }

  request.setRequestHeader('Accept-Language', lang)

  request.onreadystatechange = () => {
    if (request.readyState == 4) {
      let res = []

      try {
        res = JSON.parse(request.responseText)
      } catch (e) {
        console.warn(e)
      }

      callback(res, request.status)
    }
  };
  request.send(formData);
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