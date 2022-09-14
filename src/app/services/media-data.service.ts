import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const apiUrl = "media/netflix"
@Injectable({
  providedIn: 'root'
})
export class MediaDataService {
  //Creating an observable for downstream consumption, we don't expect to push to the stream from those consumers
  tvShowDataSubject = new Subject();
  tvShowData$ = this.tvShowDataSubject.asObservable();

  movieDataSubject = new Subject();
  movieData$ = this.movieDataSubject.asObservable();

  allDataSubject = new Subject();
  allData$ = this.allDataSubject.asObservable();

  constructor(private http:HttpClient) {}

  getTvShows(){
    this.http.get<any[]>(apiUrl).subscribe(next =>{
      this.tvShowDataSubject.next(next.filter(r => {return r.type === 'TV Show'}));
    })
  }

  getMovies(){
    this.http.get<any[]>(apiUrl).subscribe(next =>{
      this.movieDataSubject.next(next.filter(r => {return r.type === 'Movie'}));
    })
  }

  getAll(){
    this.http.get<any[]>(apiUrl).subscribe(next =>{
      this.allDataSubject.next(next);
    })
  }
}

