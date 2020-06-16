import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  
  public _subject = new Subject<any>();
  
  constructor() { }

  updateEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }
}
