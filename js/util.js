function ajax(url, method, callback, form = false, token = false) {
  let formData = form ? new FormData(form) : null;

  let request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open(method, url, true);
  if (token) {
    request.setRequestHeader('Authorization', `Bearer ${token}`)
  }
  request.onreadystatechange = () => {
    if (request.readyState == 4) {
      callback(request.responseText);
    }
  };
  request.send(formData);
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