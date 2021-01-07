import { Injectable } from '@angular/core';
import { Lista } from '../models/lista-model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  modificarLista(titulo: string, id: string | number) {

    this.listas.forEach(listaData => {
      if (listaData.id === id) {
        listaData.titulo = titulo;
      }
    });

    this.guardarStorage();
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);

    this.guardarStorage();
  }

  obtenerLista(id: string | number) {
    id = Number(id);

    return this.listas.find(listaData => {
      return listaData.id === id;
    });
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

}
