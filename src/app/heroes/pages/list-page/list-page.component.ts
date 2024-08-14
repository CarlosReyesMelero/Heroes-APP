import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HereosService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  constructor (private hereosService: HereosService) {}

  ngOnInit(): void {
    this.hereosService.getHeroes()
      .subscribe( heroes => this.heroes = heroes);
  }

}
