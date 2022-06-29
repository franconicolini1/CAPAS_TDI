import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, size: string = 'w500'): string {
    if (!img) {
      return './assets/img/no-image.jpg';
    }

    return `${environment.imgPath}/${size}/${img}`;
  }
}
