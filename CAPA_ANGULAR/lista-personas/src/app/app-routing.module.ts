import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PersonaComponent } from './persona/persona.component';
import { LoginGuard } from './services/loginGuard.service';

const routes: Routes = [
  { path: '', canActivate: [LoginGuard], component: AppComponent }, // Para esa ruta se muestra ese componente
  {
    path: 'personas', component: PersonaComponent, canActivate: [LoginGuard], children: [
      { path: 'agregar', component: FormularioComponent },
      { path: ':id', component: FormularioComponent }
    ]// Las que estan en children sera lo mismo que poner personas/agregar
  }, // Se pone personas y angular interpreta /personas
  { path: '**', component: ErrorComponent } // Cualquier otra ruta
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
