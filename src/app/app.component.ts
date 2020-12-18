import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public index: number = 0;
  public tabs = [
    { path: '/form', name: 'Forma' },
    { path: '/pattern', name: 'Motivo' },
    { path: '/symbol', name: 'Símbolo' },
    { path: '/color', name: 'Color' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
