import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = []
  oculto = 150
  estrella='star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService
    ) { }

  async ngOnInit() {
    // console.log('ID', this.id)

    this.dataLocalService.existePelicula(this.id)
      .then(existe => this.estrella = (existe) ? 'star': 'star-outline');
    //console.log('Detalle component existe', existe);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocalService.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star': 'star-outline';
  }
}
