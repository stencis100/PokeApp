import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

export interface PokemonResult{
  pokemonId: Number;
  name: String;
  detailsUrl: String;
 }

 export interface PokemonDetails{
   moves: Moves;
   stats: Stats;
 }
 //from moves
 export interface Moves{
   accuracy?: Number;
   name?: String;
   pp?: string;
   priority?:string;
   power?: string;
   contest_type?: any;
   damage_class?: any;
   flavor_text_entries?: any;
   attackMethod ?: string;

 }
//from pokemon
export interface Stats{
  height?: number;
  weight?: number;
  base_experience?: number;
  order?: number
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {}
