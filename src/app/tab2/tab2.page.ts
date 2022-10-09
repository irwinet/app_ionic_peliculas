import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = []
  ideas: string[] = ['Spiderman', 'Avengers', 'One Piece']
  loading = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar(event){
    const valor =  event.detail.value;
    this.loading = true;
    console.log(valor)

    if(valor.length != 0){
      this.moviesService.buscarPeliculas(valor).subscribe(resp => {
        console.log(resp)
        this.peliculas = resp.results;
        this.loading = false;
      })
    }
    else{
      this.loading = false;
      this.peliculas = [];
    }
  }

  async verDetalle(id:number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();

  }
}
