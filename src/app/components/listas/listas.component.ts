import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista-model';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public tareasService: TareasService,
    private router: Router,
    public alertCtrl: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {

    if (this.terminada === true) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.tareasService.borrarLista(lista);
  }

  async modificarNombreLista(lista: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {

            if (data.titulo.length === 0) {
              return;
            }

            this.tareasService.modificarLista(data.titulo, lista.id);
            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();

  }

}
