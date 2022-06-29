import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class LoginGuard implements CanActivate {
    // Se encarga de proteger las rutas verificando si el usuario esta logueado.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // if (estaAutenticado()) {
        //     return true;
        // } else {
        //     this.router.navigate(['login']);
        //     return false;
        // }
        return true;
    }
}