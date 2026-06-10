import { Pipe, PipeTransform } from '@angular/core';
import { GroupEvent } from '../interfaces/group-event';

@Pipe({
  name: 'upcoming'
})
export class UpcomingPipe implements PipeTransform {

  transform(events: GroupEvent[]): GroupEvent[] {
    // filtra events futuros (fecha no ha llegado)
    return (events ?? []).filter(e => new Date(e.startTime) >= new Date());
  }

}
