import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private diaryDetailsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  diaryDetails$ = this.diaryDetailsSubject.asObservable();

  constructor(private http: HttpClient) { }

  processCheckout(data: any): Observable<any> {
    return this.http.post('/api/checkout', { ...data });
  }

  getDiaryCustomization() {
    return this.http.get('/api/diary');
  }

  setDiaryDetails(diaryDetails) {
    this.diaryDetailsSubject.next(diaryDetails);
  }

}
