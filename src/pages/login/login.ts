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
  error={disp:false,msg:"Your username and password does not match with our records"};
  comp={form:true,loading:false};
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:WebapiProvider,public store:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(){
    this.comp={form:false,loading:true};
    var resp=this.api.getData(this.login);
    resp.subscribe(r=>{
      var resp=JSON.parse(JSON.stringify(r));
      if(resp.auth){
        this.store.set("userinfo",JSON.stringify(resp.user)).then(e=>{
          this.navCtrl.setRoot(HomePage);
        });
      }else{ 
        this.comp={form:true,loading:false};
        this.error.disp=true;
        this.login.passwd="";
      }
    });
  }
}
