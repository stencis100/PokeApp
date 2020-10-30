import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsHomeComponent } from './pokemons-home.component';

describe('PokemonsHomeComponent', () => {
  let component: PokemonsHomeComponent;
  let fixture: ComponentFixture<PokemonsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
