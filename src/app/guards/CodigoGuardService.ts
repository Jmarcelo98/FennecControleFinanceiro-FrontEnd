import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

@Injectable({
    providedIn: 'root',
})

export class CodigoGuardService implements CanActivate {

    constructor(public codigoFoiDigitado: UsuarioService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.codigoFoiDigitado.getCodigoDigitado()) {
            this.router.navigate(['digitar-email'], {
                queryParams: {
                    redirectUri: state.url.replace('/', ''),
                },
            });
            return false;
        }
        return true;
    }

}
