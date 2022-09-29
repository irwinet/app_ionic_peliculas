import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): unknown {
    //https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

    if(!img){
      return './assets/no-image-banner.jpg';
    }

    const imgUrl = `${URL}/${size}${img}`;
    // console.log('URL', imgUrl)

    return imgUrl;
  }

}
