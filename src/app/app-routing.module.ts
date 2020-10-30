import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonsHomeComponent } from './pokemons-home/pokemons-home.component';

const routes: Routes = [  
{ path: '', component: PokemonsHomeComponent },
{ path: 'details', component: PokemonDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
