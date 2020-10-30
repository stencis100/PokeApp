import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  public getPokemons(url: string): Observable<Object>{
    return this.http.get(url);
  }

  public getPokemon(url: string): Observable<Object>{
   return this.http.get(this.baseUrl + url);
  }

  public getPokemonMoves(url: string): Observable<Object>{
    return this.http.get(this.baseUrl + url);
  }
}
