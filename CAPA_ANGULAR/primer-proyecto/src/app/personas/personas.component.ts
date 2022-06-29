import { Component } from "@angular/core";

@Component({
    selector: 'app-personas',
    templateUrl: './personas.component.html'
})
export class PersonasComponent {
    deshabilitar = false
    mensaje = "No hay nadie"
    titulo = ""
    mostrar = true

    agregarPersona() {
        this.mensaje = "Persona agregada"
    }

    // modificarTitulo(event: Event) {
    //     this.titulo = (<HTMLInputElement>event.target).value
    // }
}