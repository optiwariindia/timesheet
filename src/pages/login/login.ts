import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiProvider } from '../../providers/webapi/webapi';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login={user:"",
    passwd:"",
    module:"login"
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:WebapiProvider,public store:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(){
    console.log(this.login);
    var resp=this.api.getData(this.login);
    resp.subscribe(r=>{
      var resp=JSON.parse(JSON.stringify(r));
      if(resp.auth){
        this.store.set("userinfo",JSON.stringify(resp)).then(e=>{
          this.navCtrl.setRoot(HomePage);
        })
      }
    });
  }
}
