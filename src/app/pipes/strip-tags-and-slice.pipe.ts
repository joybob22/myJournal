import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripTagsAndSlice'
})
export class StripTagsAndSlicePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    value = value.replace(/(<([^>]+)>)/gi, "");
    return value.slice(0,20);
  }

}
