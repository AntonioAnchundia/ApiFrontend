import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
    //'fruitForm' para almacenar los datos del formulario introducidos por el usuario.
  fruitForm: Fruits = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
  };

    //Inyecta el 'FruitsService' y 'Router'
  constructor(private fruitService:FruitsService, private router:Router) {}

  ngOnInit(): void {}

    //Invoca la llamada a la API para publicar los datos.
  create(){
    this.fruitService.create(this.fruitForm)
    .subscribe({
      next:(data) => {
          //Al guardar datos con éxito en el servidor, navegamos a la página de inicio.
        this.router.navigate(["/fruits/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
