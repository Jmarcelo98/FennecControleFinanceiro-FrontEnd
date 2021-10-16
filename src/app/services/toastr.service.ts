import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrServiceClasse {

  constructor(private toastr: ToastrService) { }

  public sucessoToastr(mensagem: string) {
    this.toastr.success(mensagem)
  }

  public atencaoToastr(mensagem: string) {
    this.toastr.warning(mensagem)
  }

}
