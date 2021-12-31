import {NetworkServiceBase} from '../services';
import {makeObservable, observable} from 'mobx';

export class AppState extends NetworkServiceBase {
  isSkipGuideTour?: boolean = false;
  isSkipWelcome?: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      isSkipGuideTour: observable,
      isSkipWelcome: observable,
    });
  }
}

export type AppStateType = AppState;
