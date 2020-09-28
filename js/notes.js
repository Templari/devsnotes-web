if (token) {
  ajax('http://localhost:8000/api/notes', 'GET', listNotes, null, token)
}

function listNotes(res) {
  let notes = res['notes']
  
  if (! notes) {
    let div = document.querySelector('.notes')
    div.innerHTML += `<p>Você ainda não possui notas.</p>`
    return false
  }

  let list = document.querySelector('.notes ul.list')

  for (i in notes) {
    let note = notes[i]
    list.innerHTML += `
      <li>
        <a href="note.html?id=${note['id']}">${note['title']}</a>
      </li>
    `
  }
}