import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fruitForm: Fruits = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
  };
  constructor(private route: ActivatedRoute, private router:Router, private fruitService: FruitsService) {}

  ngOnInit(): void {
      //Se lee el valor 'id' de la ruta usando el 'ActivatedRoute.paramMap.subscribe()', luego estamos invocando nuestra llamada get API.
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }

    //Invoca la llamada a la API por el valor 'id', si se realiza correctamente, la respuesta se asignará a la variable 'formFruit', de modo que los datos se representan en el formulario.
  getById(id: number) {
    this.fruitService.getById(id).subscribe((data) => {
      this.fruitForm = data;
    });
  }

    //Si se realiza correctamente, vuelva a 'HomeComponent'.
  update() {
    this.fruitService.update(this.fruitForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/fruits/home"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
