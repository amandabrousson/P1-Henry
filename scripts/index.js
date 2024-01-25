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

/* window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let title = sec.querySelector('h2');

        if (title) {
            let offset = title.offsetTop - 150;
            let height = title.offsetHeight;
            let id = title.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navlinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('div nav a[href*=' + id + ']').classList.add('active');
                });
            }
        }
    });
}; */


/* Formulario */

class Activity{
    constructor(id, titulo, descripcion, url){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }
}

/* Caja donde se guarda info formulario */

class Repository{
    constructor(){
    /* A esta clase repositorio le creamos un metodo que reciba las actividades del formulario, cree una actividad nueva y la guarde
    en su array. */
        this.activities = [];
        this.contador = 1;
    }

    /* un metodo que le permita retornar todas las actividades */   
    getallactivities(){
        return this.activities;
    }; 

    /* un metodo que le permita filtrar las actividades */    
    createActivity(titulo, descripcion, url){
        const newActivity = new Activity(this.contador,titulo, descripcion, url);
        this.activities.push(newActivity);
        this.contador++;
    };
    /* método para eliminar */
    deleteid(id){
        this.activities.filter((activity) => activity.id !== id)
    };
}

/* Instancia de activity */


function activityToHTML(activities) {
    
    const {titulo, descripcion, url } = activities;   // Destructuring

    // Crear los elementos html.
    const cardtitulo = document.createElement("h3");
    const carddescripcion = document.createElement("p");
    const cardimagen = document.createElement("img");
    // crear div para la carta 

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

function todoAlDOM(){
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


const handler = () => {
    const cardElement = document.createElement("div");
    
    const titulo = document.getElementById("titulo")
    const descripcion = document.getElementById("descripcion")
    const url = document.getElementById("url")

    let tituloIngresado = titulo.value;
    let descripcionIngresada = descripcion.value;
    let urlIngresada = url.value;


    if (!tituloIngresado || !descripcionIngresada || !urlIngresada) {
        alert("Por favor, completa todos los campos.");
    } else {

        cardElement.innerHTML = `
            <h1>${tituloIngresado}</h1>
            <p>${descripcionIngresada}</p>
            <img src=${urlIngresada} alt="foto" />
            <button id="delete"> Borrar </button>
        `
        cardElement.className = "cardElementStyle"
        divgrande.append(cardElement);
        
        const actividadCreada = new Repository();
        
        actividadCreada.createActivity(tituloIngresado,descripcionIngresada, urlIngresada);
        const array = Object.values(actividadCreada.getallactivities());
        console.log(array);
        
            
        }
    
    document.getElementById("titulo").value = ""
    document.getElementById("descripcion").value = ""
    document.getElementById("url").value = ""
    
    
}



botonAgregar.addEventListener("click", handler)  // Este es el evento que se le asigna a la const agregar.

const botonBorrar = document.getElementById("delete")

const deleteHandler = () => {

    
}

botonBorrar.addEventListener("click",deleteHandler)

// const agregar= document.getElementById("agregar");
// const body = document.getElementsByTagName("body")[0] 

// const cb = () =>{
// const newdiv = document.createElement("div");
// newdiv.className = "contenedoractividades";
// newdiv.style.display = "flex";
// newdiv.style.flexDirection = "row";
// body.appendChild(newdiv);
// return newdiv;
// }
