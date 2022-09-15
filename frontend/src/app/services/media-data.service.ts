import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const apiUrl = "/api/media/netflix"
@Injectable({
  providedIn: 'root'
})
export class MediaDataService {
  //Creating an observable for downstream consumption, we don't expect to push to the stream from those consumers
  mediaDataSubject = new Subject();
  mediaData$ = this.mediaDataSubject.asObservable();

  movieDataSubject = new Subject();
  movieData$ = this.movieDataSubject.asObservable();

  allDataSubject = new Subject();
  allData$ = this.allDataSubject.asObservable();

  constructor(private http:HttpClient) {}

  getMediaByType(type:string){
    this.http.get<any[]>(apiUrl).subscribe(next =>{
      this.mediaDataSubject.next(next.filter(r => {return r.type === type}))
    })
  }
}
