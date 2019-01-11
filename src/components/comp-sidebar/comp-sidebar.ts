import { Component } from '@angular/core';
import { ProvideSidebarProvider } from '../../providers/provide-sidebar/provide-sidebar';

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

  constructor(public sidelinks:ProvideSidebarProvider) {
    
  }

}
