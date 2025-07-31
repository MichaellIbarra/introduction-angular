import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

    private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();  
    private _idUserEventEmitter: EventEmitter<number> = new EventEmitter();
    private _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();
    private _selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();
    private _errorUserFormEventEmitter: EventEmitter<any> = new EventEmitter();
    private _pageUsersEventEmitter: EventEmitter<any> = new EventEmitter();
    private _handlerLoginEventEmitter: EventEmitter<any> = new EventEmitter();


  constructor() { }

  get handlerLoginEventEmitter(): EventEmitter<any> {
    return this._handlerLoginEventEmitter;
  }

  get pageUsersEventEmitter(): EventEmitter<any> {
    return this._pageUsersEventEmitter;
  }

  get errorUserFormEventEmitter(): EventEmitter<any> {
    return this._errorUserFormEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(): EventEmitter<number>{
    return this._findUserByIdEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<User>{
    return this._selectedUserEventEmitter;
  }


}
