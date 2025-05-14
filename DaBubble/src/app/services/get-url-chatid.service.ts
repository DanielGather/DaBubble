import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUrlChatidService {
  public currentChatID: string = '';

  constructor() {}
}