import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, throwError } from 'rxjs';
import { Moves, PokemonDetails, Stats } from '../app.component';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  
  loadDetailsCard: boolean = false;
  id: string;
  pokemonDetails: PokemonDetails;
  pokemonMoves: Moves;
  pokemonStats: Stats;
  movesUnavailable: boolean;

  constructor(private route: ActivatedRoute, private service: PokemonService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.spinner.show();
    this.service.getPokemon('pokemon/'+this.id).subscribe(result =>{
      this.pokemonStats = result;
      this.pokemonDetails ={
        stats: {},
        moves: {}
      };
      this.pokemonDetails.stats = this.pokemonStats;
      this.service.getPokemonMoves('move/'+this.id).subscribe(response =>{
        this.pokemonMoves = response;
        for(let i=0; i< this.pokemonMoves.flavor_text_entries.length; i++){

          if(this.pokemonMoves.flavor_text_entries[i].language.name === 'en'){
            this.pokemonMoves.attackMethod = this.pokemonMoves.flavor_text_entries[i].flavor_text.replace('\n', '');
            break;
        }}
        this.pokemonDetails.moves = this.pokemonMoves;
        this.loadDetailsCard = true;
        this.spinner.hide();
      }, error =>{
        this.spinner.hide();
        this.movesUnavailable = true;
        this.loadDetailsCard = true;
      });
    }, error =>{
      this.spinner.hide();
      console.log('Error in calling pokemon service call');

    });

  }
}
