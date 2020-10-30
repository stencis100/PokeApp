import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, throwError } from 'rxjs';
import { Moves, PokemonDetails, Stats } from '../app.component';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  url: string = 'https://pokeapi.co/api/v2/';
  loadDetailsCard: boolean = false;
  id: string;
  pokemonDetails: PokemonDetails;
  pokemonMoves: Moves;
  pokemonStats: Stats;
  movesUnavailable: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.http.get(this.url+'pokemon/'+this.id).subscribe(result =>{
      this.pokemonStats = result;
      this.pokemonDetails ={
        stats: {},
        moves: {}
      };
      this.pokemonDetails.stats = this.pokemonStats;
        this.http.get(this.url+'move/'+this.id).subscribe(response =>{
        this.pokemonMoves = response;
        for(let i=0; i< this.pokemonMoves.flavor_text_entries.length; i++){

          if(this.pokemonMoves.flavor_text_entries[i].language.name === 'en'){
            this.pokemonMoves.attackMethod = this.pokemonMoves.flavor_text_entries[i].flavor_text.replace('\n', '');
            break;
        }}
        this.pokemonDetails.moves = this.pokemonMoves;
        this.loadDetailsCard = true;
        console.log(this.pokemonDetails);
      }, error =>{
        this.movesUnavailable = true;
        this.loadDetailsCard = true;
      });
    }, error =>{
      console.log('Error in calling pokemon service call');

    });

  }
}
