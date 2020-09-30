if (token) {
  ajax('http://localhost:8000/api/notes', 'GET', listNotes, null, token)
}

function listNotes(res) {
  let notes = res['notes']
  let div = document.querySelector('.notes')
  
  if (! notes) {
    div.innerHTML += `<p>Suas notas aparecerão aqui.</p>`
    return false
  }

  if (notes.length == 0) {
    div.innerHTML += `<p>Você ainda não possui notas.</p>`
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