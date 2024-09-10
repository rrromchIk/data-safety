import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private readonly showSpinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showSpinner$: Observable<boolean> = this.showSpinnerSubject.asObservable();

  public showSpinner(): void {
    this.showSpinnerSubject.next(true);
  }

  public hideSpinner(): void {
    this.showSpinnerSubject.next(false);
  }
}
