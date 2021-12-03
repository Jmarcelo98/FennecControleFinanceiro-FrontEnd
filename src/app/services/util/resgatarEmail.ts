import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TransferirEmailParaComponenet {

  constructor(
  ) { }

  private email: string

  setEmail(email: string){
    this.email = email;
  }

  getEmail(){
    let temp = this.email;
    this.clearData();
    return temp;
  }

  clearData(){
    this.email != undefined;
  }

}