import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  termo: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onMidias() {
    this.router.navigateByUrl('midias');
  }

  onPesquisar() {

    this.router.navigate(['pesquisa', this.termo]);
  }

}
