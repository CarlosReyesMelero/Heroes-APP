import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HereosService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById ( id: string ): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe (
        catchError ( error => of ( undefined )  )
         );
  };

  getSuggestion(query: string): Observable <Hero []> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
      map((heroes: Hero[]) => heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(query.toLocaleLowerCase())))
    );
  }

}


