import { Persona } from "../personas.model";
import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./loggingService.service";

@Injectable() // Para usar service dentro de otro service, se pone en la que contiene al otro service
export class PersonaService {
    personas: Persona[] = [
        new Persona('Juan', 'Perez'),
        new Persona('Pedro', 'Perez')
    ];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService) { }

    agregarPersona(persona: Persona) {
        this.loggingService.log(persona.nombre + " " + persona.apellido);
        this.personas.push(persona);
    }
}