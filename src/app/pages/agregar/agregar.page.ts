import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista-model';
import { TareasService } from '../../services/tareas.service';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private tareasService: TareasService,
    private route: ActivatedRoute) {

    const listaId = this.route.snapshot.paramMap.get('listaId');
    console.log(listaId);

    this.lista = tareasService.obtenerLista(listaId);

  }

  ngOnInit() {
  }

  agregarItem() {

    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.tareasService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completado = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completado = false;
    }

    this.tareasService.guardarStorage();

    console.log(this.tareasService.listas);
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.tareasService.guardarStorage();
  }

}
