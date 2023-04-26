import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

//Declaración al tipo de ventana
declare var window: any;

//NOTA: Todo componente debe tener su decorador '@Component' esto hace que se cargue desde el @amgular/core
@Component({
    //selector: Sirve para definir la etiqueta Html del componente
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    // La variable 'allFruits' es del tipo de matriz 'Fruits'. Esta variable es para almacenar todos los datos de respuesta de la API en esta variable.
  allFruits: Fruits[] = [];

    // 'deleteModal' -> para almacenar la instancia del modal botstrap.
  deleteModal: any;
    //'idToDelete' -> para almacenar el valor 'id' del elemento que se va a eliminar.
  idTodelete: number = 0;

  constructor(private fruitService: FruitsService) {}

    //ngOnInit -> Método de ciclo de vida de componentes angulares. Este método se ejecuta automáticamente al invocar nuestro 'HomeComponent'.
  ngOnInit(): void {
    // Asignación de la instancia modal de arranque a nuestra variable 'deleteModal'.
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.get();
  }

    //Metodo get: Invoca la llamada get API en el archivo de servicio.
  get() {
      //subcribe: se ejecuta después de completar la llamada a la API. Al recibir la respuesta, se asigna a la variable "allFruits"
    this.fruitService.get().subscribe((data) => {
      this.allFruits = data;
    });
  }

    //'openDeleteModal()' se invoca haciendo clic en el botón eliminar. Aquí abrimos el modal de confirmación de eliminación.
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }

  //'delete()' invoca la llamada a la API de eliminación en el éxito ocultaremos nuestro modal bootstrap y también excluiremos el elemento de la variable 'allFruits'.
  delete() {
    this.fruitService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allFruits = this.allFruits.filter(_ => _.id != this.idTodelete)
        this.deleteModal.hide();
      },
    });
  }

}
