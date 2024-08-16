import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HereosService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor (private heroService: HereosService, private router: Router) {}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestion( value )
      .subscribe( heroes => this.heroes = heroes );

  }

  onSelectedOption( event: MatAutocompleteSelectedEvent  ):void {

    if( !event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue (hero.superhero);

    this.heroService.getHeroById(hero.id)
    .subscribe ( hero => {
      this.selectedHero = hero;
      if (this.selectedHero) {
        this.router.navigate([ '/heroes', this.selectedHero.id ]);
      }
    });
  }
}
