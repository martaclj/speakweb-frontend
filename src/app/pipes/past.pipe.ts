import { Pipe, PipeTransform } from '@angular/core';
import { GroupEvent } from '../interfaces/group-event';

@Pipe({
  name: 'past'
})
export class PastPipe implements PipeTransform {

  transform(events: GroupEvent[]): GroupEvent[] {
    return (events ?? []).filter(e => new Date(e.startTime) < new Date());
  }

}
