import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AutenticacaoService } from "../services/autenticacao.service";

@Injectable({
    providedIn: 'root',
})

export class AuthGuardService implements CanActivate {

    constructor(public auth: AutenticacaoService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.auth.estaAutenticado()) {
            this.router.navigate(['login'], {
                queryParams: {
                    redirectUri: state.url.replace('/', ''),
                },
            });
            return false;
        }
        return true;
    }

}