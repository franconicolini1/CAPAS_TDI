import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../personas.model';
import { PersonaService } from '../services/personasService.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  // Asi se reciben parametros
  @Input() persona: Persona = new Persona("algo", "asd");
  @Input() i: number = 0;

  constructor(private personaService: PersonaService) { }

  emitirSaludo() {
    this.personaService.saludar.emit(this.i);
  }
}
