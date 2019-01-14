import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the CompHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comp-header',
  templateUrl: 'comp-header.html'
})
export class CompHeaderComponent {

  text: string;

  constructor(public store:Storage,public navCtrl:NavController) {
    console.log('Hello CompHeaderComponent Component');
    this.text = 'Hello World';
  }
  logout(){
    this.store.clear();
    this.navCtrl.setRoot(LoginPage);
  }
  changePasswd(){
    
  }
  
}
