import { Component } from '@angular/core';

/**
 * Generated class for the CompSidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comp-sidebar',
  templateUrl: 'comp-sidebar.html'
})
export class CompSidebarComponent {

  text: string;

  constructor() {
    console.log('Hello CompSidebarComponent Component');
    this.text = 'Hello World';
  }

}
