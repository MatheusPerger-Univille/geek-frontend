import { Component } from '@angular/core';
import { BlockUIComponent } from './core/components/blockui.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  blockTemplate = BlockUIComponent;
  
  constructor() {

  }
}
