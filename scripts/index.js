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

window.onscroll = () => {
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
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        }
    });
};


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
        this.Activities = [];
    }

    /* un metodo que le permita retornar todas las actividades */   
    getallactivities(){
        return this.Activities;
    }; 

    /* un metodo que le permita filtrar las actividades */    
    createActivity(titulo, descripcion, url){
        const newActivity = new Activity(this.newid(),titulo, descripcion, url);
        this.Activities.push(newActivity)
    };

    /* método para generar ID a medida que se agregan actividades */
    newid(){    
        return this.Activities.length + 1;
    }
        

    /* método para eliminar */
    deleteid(id){
        this.Activities = this.Activities.filter(Activity => Activity.id !== id)
    };
}