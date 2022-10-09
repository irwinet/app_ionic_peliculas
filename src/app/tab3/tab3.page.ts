import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = []
  generos: Genre[] = []
  favoritoGenero: any[] = []

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
    ) {}

  async ngOnInit() {

  }

  async ionViewWillEnter(){
    this.generos = await this.moviesService.cargarGeneros();
    this.peliculas = await this.dataLocalService.getLocalPeliculas;
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritoGenero = [];

    for(const genero of generos){
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id)
        })
      });
    }

    console.log(this.favoritoGenero)
  }


}
