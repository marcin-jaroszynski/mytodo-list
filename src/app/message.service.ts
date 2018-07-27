import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  speak(message: string) {
    alert(message);
  }
}
