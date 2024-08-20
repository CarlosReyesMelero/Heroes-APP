import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';
import { query } from '@angular/animations';

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

  addHero( hero: Hero ): Observable<Hero> {
    return this.httpClient.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if (!hero.id) throw Error ('Hero id is required');
    return this.httpClient.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id}`, hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {
    return this.httpClient.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map ( re => true),
        catchError(err => of (false)),
      );
  }
}


