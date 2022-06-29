import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Persona } from '../personas.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  // Asi es como se devuelve un valor al componente padre
  @Output() personaCreada = new EventEmitter<Persona>();
  // @ViewChild('nombreInput') nombreInput: ElementRef; // Se obtiene el elemento html con esa referencia
  // Luego para acceder se hara this.nombreInput.nativeElement.value

  nombre = "";
  apellido = "";

  agregarPersona() {
    const persona = (new Persona(this.nombre, this.apellido));
    this.nombre = "";
    this.apellido = "";

    this.personaCreada.emit(persona);
  }
}
