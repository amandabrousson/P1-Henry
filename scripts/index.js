/* índice */

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

// Función para desplazamiento suave
function scrollToSection(id) {
    const targetSection = document.getElementById(id);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 50, // Ajusta el valor según sea necesario
            behavior: 'smooth'
        });
    }
}

// Función para manejar el desplazamiento al hacer clic en los enlaces
function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    scrollToSection(targetId);
}

// Asigna el evento de desplazamiento suave a cada enlace de navegación
navlinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

/* Formulario */

class Activity{
    constructor(id, titulo, descripcion, url){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }
}

class Repository{
    constructor(){
      this.activities = [];
    }

    /* un metodo que le permita retornar todas las actividades */   
    getallactivities(){
        return this.activities;
    }; 

    /* un metodo que le permita filtrar las actividades */    
    createActivity(titulo, descripcion, url){
        const id = this.getNextId();
        const activity = new Activity(id, titulo, descripcion, url);
        this.insertActivitySorted(activity);
        return activity;
    };

    /* método para eliminar */
    deleteActivity(idToDeleted){
        this.activities= this.activities.filter((activity) => activity.id !== idToDeleted)
    };

    getNextId() {
        if (this.activities.length === 0) {
          return 1;
        }
        return this.activities[this.activities.length - 1].id + 1;
      }

    insertActivitySorted(activity) {
    const index = this.activities.findIndex(existingActivity => existingActivity.id > activity.id);
    if (index === -1) {
        this.activities.push(activity);
    } else {
        this.activities.splice(index, 0, activity);
    }
      }
};

const activityToHTML = (activities) => {
    const {titulo, descripcion, url } = activities;   // Destructuring

    // Crear los elementos html.
    const cardtitulo = document.createElement("h3");
    const carddescripcion = document.createElement("p");
    const cardimagen = document.createElement("img");
    
    // Asignar los valores 
    cardtitulo.innerHTML = titulo;
    carddescripcion.innerHTML = descripcion;
    cardimagen.src = url;

    //vincular con CSS
    cardtitulo.classList.add('titulo');
    carddescripcion.classList.add('descripcion');
    cardimagen.classList.add('url');
    cardElement.classList.add('contenedoractividades');

    //vincular con card
    cardElement.appendChild(cardtitulo);
    cardElement.appendChild(carddescripcion);
    cardElement.appendChild(cardimagen);
    divgrande.append(cardElement);

    //retornar el div
    return cardElement;
}

const todoAlDOM = () => {
    const contenedorActividades = document.getElementById('div1');

    contenedorActividades.innerHTML = '';         

    //Listado completo de actividades
    const actividades = Repository.getallactivities();  

    //mapear lista de act
    const elementosHTML = actividades.map(activity => activityToHTML(activity));

    elementosHTML.forEach(elemento => {
        contenedorActividades.appendChild(elemento);
});
}

/* Boton */
const botonAgregar = document.getElementById("agregar")
const divgrande = document.getElementById('div1');
const mirepositorio = new Repository();

const handler = () => {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const url = document.getElementById('url').value
            
    if (!titulo || !descripcion || !url){
        alert("Por favor, completa todos los campos.");
    } else {      
        const activity = mirepositorio.createActivity(titulo, descripcion, url);
                
    displayActivity(activity);
            
    document.getElementById('titulo').value = ''
    document.getElementById('descripcion').value = ''
    document.getElementById('url').value = ''
    }
}

function displayActivity(activity) {
    const activityCard = document.createElement('div');
    activityCard.className = "cardElementStyle"
    activityCard.innerHTML = `
      
      <strong></strong> ${activity.titulo}<br>
      <strong></strong> ${activity.descripcion}<br>
      <img src=${activity.url} alt='foto' />
      <button onclick="deleteActivity(${activity.id})">Eliminar</button>
    `;
    
    divgrande.appendChild(activityCard);
  
    console.log('Actividades:', mirepositorio.getallactivities());

}

function deleteActivity(id) {
    mirepositorio.deleteActivity(id);
    refreshActivityDisplay();
}

function refreshActivityDisplay() {
    divgrande.innerHTML = '';
    mirepositorio.getallactivities().forEach(activity => displayActivity(activity));
}
        
botonAgregar.addEventListener("click", handler)  // Evento del boton. 

