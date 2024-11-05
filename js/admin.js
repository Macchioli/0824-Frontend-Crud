const users = [{
    fullname: 'John Doe',
    age: 30,
    email: 'admin@admin.com',
    id: 1,
    active: true,
    password: 'admin',
    bornDate: 725846400000,
    location: 'La Luna',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280',
    role: 'ADMIN_ROLE'
  },
  {
    fullname: 'Jane Doe',
    age: 25,
    email: 'jane.doe@example.com',
    id: 2,
    active: false,
    password: 'password456',
    bornDate: new Date('1998-05-05').getTime(),
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280',
    role: 'CLIENT_ROLE'
  },
  {
    fullname: 'Alice Johnson',
    age: 35,
    email: 'alice.johnson@example.com',
    id: 3,
    active: true,
    password: 'password789',
    bornDate: new Date('1988-08-08').getTime(),
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
  },
  {
    fullname: 'Michael Smith',
    age: 40,
    email: 'michael.smith@example.com',
    id: 4,
    active: false,
    password: 'password101',
    bornDate: new Date('1983-04-10').getTime(),
    location: 'San Luis',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
  },
  {
    fullname: 'Emily Johnson',
    age: 28,
    email: 'emily.johnson@example.com',
    id: 5,
    active: true,
    password: 'password202',
    bornDate: new Date('1995-02-15').getTime(),
    location: 'Córdoba',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
  },
  {
    fullname: 'Daniel Lee',
    age: 34,
    email: 'daniel.lee@example.com',
    id: 6,
    active: false,
    password: 'password303',
    bornDate: new Date('1989-07-07').getTime(),
    location: 'Buenos Aires',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
  },
];

let isEditing;
let userButtonsEdit;

const tableHTML = document.getElementById('table-container')

/* Obtengo el body de la tabla */
const tableBodyHTML = document.getElementById('table-body')

/* Obtener formulario del HTML */
const userFormHTML = document.getElementById("user-form")


function renderUsers(arrayUsers){

  tableBodyHTML.innerHTML = '';

  arrayUsers.forEach( (user) => {
  
      tableBodyHTML.innerHTML += `<tr>
                                      <td class='user-image'>
                                          <img src="${user.image}" alt="${user.fullname}"
                                      </td>
                                      <td class="user-name"> ${user.fullname} </td>
                                      <td class="user-mail"> ${user.email} </td>
                                      <td class="user-location"> ${user.location} </td>
                                      <td class="user-actions">

                                        
                                        <button class="btn btn-primary btn-sm" data-edit="${user.id}" title="Editar usuario">
                                          <i class="fa-solid fa-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" title="Eliminar usuario" onclick="deleteUser(${user.id})">
                                          <i class="fa-regular fa-trash-can"></i>
                                        </button>

                                      </td>
                                  </tr>`
  
  
  } )

}

renderUsers(users);

updateEditButtons();

function updateEditButtons(){

  userButtonsEdit = document.querySelectorAll('button[data-edit]')
  
  userButtonsEdit.forEach((btn) => {

    btn.addEventListener('click', (evt) => {

      const id = evt.currentTarget.dataset.edit

      completeUserForm(id)

    })


  })

}


userFormHTML.addEventListener("submit", (evento) => {

  evento.preventDefault()

  console.log(evento.target.elements)

  const el = evento.target.elements

  if(el["password-repeat"].value !== el.password.value){

    Swal.fire("Error", "Las contraseñas no coinciden", "warning")
    return //Evito que se ejecuten las siguientes lineas si ingreso a este if

  }

  const nuevoUsuario = {

    id: crypto.randomUUID(),
    fullname: el.fullname.value,
    email: el.email.value,
    password: el.password.value,
    location: el.location.value,
    image: el.image.value,

    bornDate: new Date(el.bornDate.value).getTime(),
    active: el.active.checked
  
  
  }

  users.push(nuevoUsuario)

  renderUsers(users)

  userFormHTML.reset()
  el.fullname.focus()


})


function inputSearch(evt){

  console.log(evt.target.value)

  const search = evt.target.value.toLowerCase();

  const filteredUsers = users.filter( (usr) => {

      if(usr.fullname.toLowerCase().includes(search)){
        return true;
      }

      return false;

  } )

  renderUsers(filteredUsers)

}

function sortDesc(){

  //* Método 1

  users.sort((a,b) => {

    if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){

      return 1;

    }

    if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){

      return -1;

    }

    return 0;

  })

  renderUsers(users)
}


function sortAsc(){
  
  //*Método 2
  const collator = new Intl.Collator(undefined, {sensitivity: 'base'})

  users.sort((a,b) => {

    return collator.compare(a.fullname, b.fullname)

  } )

  renderUsers(users)


}

function deleteUser(id){


  const indice = users.findIndex( (usr) => {


    if(usr.id === id){

      return true

    }

  } )
  console.log(indice)
  if(indice === -1){

    Swal.fire({

      title: "Alerta! 👀",
      text: "No se encontró el usuario",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: 'De acuerdo 😢',
      confirmButtonColor: '#2b285b'
    })

    return
  }

  Swal.fire({
    title: "¿Estás seguro que quieres eliminar?",
    text: "Esta acción no es reversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar registro"
  }).then( (result) => {

    if(result.isConfirmed){

      Swal.fire({
        title: 'Eliminado 😱',
        text: "Fue eliminado el usuario",
        icon: "success"
      })

      users.splice(indice, 1)
      renderUsers(users)

    }

  } )


}

function completeUserForm(idUser){

    isEditing = idUser;

    const user = users.find( (usr) => {

      if(usr.id === idUser){
        return true
      }

    } )

    if(!user){
      alert("No se encontró el usuario")
      return
    }

    const el = userFormHTML.elements;

    el.fullname.value = user.fullname;
    el.email.value = user.email;
    el.password.value = user.password;
    el["password-repeat"].value = user.password;
    el.image.value = user.image;
    el.active.checked = user.active;
    el.bornDate.valueAsNumber = user.bornDate


}