import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonResult } from '../app.component';

@Component({
  selector: 'app-pokemons-home',
  templateUrl: './pokemons-home.component.html',
  styleUrls: ['./pokemons-home.component.scss']
})
export class PokemonsHomeComponent implements OnInit {

  previousUrl: string;
  nextUrl: string;
  totalResults: number;
  title = 'pokemonApp';
  lastIndex : number;
  searchQuery: string;
  listofPokemons : Array<PokemonResult>;
  filteredList : Array<PokemonResult>;
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon-species/';
  isSearchTriggered: boolean = false;
  noPokemonFound: boolean = false;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(){
    this.http.get(this.baseUrl).subscribe((response: any )=>{
        console.log(response);
        this.listofPokemons = new Array<PokemonResult>();
        this.filteredList = new Array<PokemonResult>();
        this.totalResults = response.count;
        this.nextUrl = response.next;
        this.previousUrl = response.previous;
        response.results.forEach(resp =>{
          this.listofPokemons.push({
            pokemonId: resp.url.substring(42).replace('/', ''),
            name: resp.name,
            detailsUrl: resp.url
          });
          });
          this.lastIndex = this.listofPokemons.length;
          this.filteredList = this.listofPokemons;
       });
       
  }

  onScroll(){
    console.log('scroll event tirggered');
    if(this.nextUrl && this.nextUrl !== undefined){
    this.http.get(this.nextUrl).subscribe((response: any )=>{
      console.log(response);
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      response.results.forEach(resp =>{
        this.listofPokemons.push({
          pokemonId: response.results.indexOf(resp)+this.lastIndex+1,
          name: resp.name,
          detailsUrl: resp.url
        });
        });
        this.lastIndex = this.listofPokemons.length;
       console.log('result is :');
       console.log(this.listofPokemons);
     });
    }
  }

public searchPokemon(){
  this.isSearchTriggered = true;
  this.noPokemonFound = false;
  this.filteredList =[];
  if(isNaN(Number(this.searchQuery))){
   this.listofPokemons.forEach(pokemon =>{
    if(pokemon.name.startsWith(this.searchQuery.toLocaleLowerCase())){
      this.filteredList.push(pokemon);
    }  
   });
  } else {
    this.listofPokemons.forEach(pokemon =>{
      if(pokemon.pokemonId === parseInt(this.searchQuery)){
        this.filteredList.push(pokemon);
      }
     });
  }
  if(this.filteredList.length === 0){
    this.searchOnePokemon(this.searchQuery);
  }
  
}

public searchOnePokemon(searchQuery: any){
  this.http.get(this.baseUrl+searchQuery).subscribe((response: any )=>{
    if(response){
    this.filteredList = new Array<PokemonResult>();
      this.filteredList.push({
        pokemonId: response.id,
        name: response.name,
        detailsUrl: this.baseUrl+response.id
      });
      if(this.filteredList.length === 0){
        this.noPokemonFound = true;
      }
    }
},  error => {
  this.noPokemonFound = true;
});
}

public clearSearch(){
  this.searchQuery = '';
  this.filteredList = this.listofPokemons;
  this.isSearchTriggered = false;
  this.noPokemonFound = false;
}


}
