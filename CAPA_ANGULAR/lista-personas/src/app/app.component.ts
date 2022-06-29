import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from './personas.model';
import { PersonaService } from './services/personasService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  personas: Persona[] = [];
  presupuestoTotal: number = 1000;
  error = false;
  // Inyeccion de dependencias, se creara variable con PersonaService()
  constructor(private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute) {
    // Tomo el i que emitio personaService.saludar y hago algo con el
    this.personaService.saludar.subscribe((i: number) => alert(i))
  }

  ngOnInit(): void {
    this.personas = this.personaService.personas;
  }

  titulo = 'Lista de Personas';

  agregarPersona(persona: Persona) {
    this.personaService.agregarPersona(persona);
  }

  cambiarRuta() {
    this.router.navigate(['personas/agregar']);
  }

  // Acceder a parametro de url
  // this.route.snapshot.params['id'];
  // Acceder a queryParams
  // this.route.snapshot.queryParams['nombre'];
}
