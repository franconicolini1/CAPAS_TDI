import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoggingService } from './services/loggingService.service';
import { PersonaService } from './services/personasService.service';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { LoginGuard } from './services/loginGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    FormularioComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoggingService, PersonaService, LoginGuard], // Se agrega el servicio de manera global
  bootstrap: [AppComponent]
})
export class AppModule { }
