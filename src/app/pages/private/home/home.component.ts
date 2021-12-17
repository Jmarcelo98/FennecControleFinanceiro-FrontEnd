import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  contactForm:FormGroup;
 
  anos: any;

  carregar = false;

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario

  valorReceita: any
  valorDespesa: any
  resultado: any

  colorBorder = "green";

  constructor() { }

}