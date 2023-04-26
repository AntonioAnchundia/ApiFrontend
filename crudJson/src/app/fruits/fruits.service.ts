// Aqui se implementa la lógica para las llamadas API 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fruits } from './fruits';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {

    //'HttpClient' -> Proporciona métodos incorporados para invocar la API
  constructor(private http: HttpClient) { }

  get() {
      //'HttpClient.get<T>()' es invocar el extremo HTTP Get.
    return this.http.get<Fruits[]>('http://localhost:3000/fruits');
  }

  create(payload: Fruits) {
      // 'HttpClient.post<T>(payload)' es invocar el extremo HTTP Post para guardar en el servidor.
    return this.http.post<Fruits>('http://localhost:3000/fruits', payload);
  }

    //Obtiene elemento por id
    //Invoca el extremo HTTP Get por el valor 'id' como parámetro de filtrado.
  getById(id: number) {
    return this.http.get<Fruits>(`http://localhost:3000/fruits/${id}`);
  }
    
    //Invoca el extremo HTTP Put para actualizar el elemento. Aquí el valor 'id' debe pasarse en la URL y editar los datos como una carga útil.
  update(payload:Fruits){
    return this.http.put(`http://localhost:3000/fruits/${payload.id}`,payload);
  }


  delete(id:number){
    return this.http.delete<Fruits>(`http://localhost:3000/fruits/${id}`);
 }
}
