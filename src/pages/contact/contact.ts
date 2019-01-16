import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvideSidebarProvider } from '../../providers/provide-sidebar/provide-sidebar';
import { WebapiProvider } from '../../providers/webapi/webapi';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  newUser={loginid:"",
  name:"",
  designation:"",
  passwd: "",
  cnfpass: "",
  module: "users",
  action: "changePasswd",
  sesskey: ""
};
  constructor(public navCtrl: NavController,public navParam:NavParams,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider) {
this.newUser.loginid= this.navParam.data.loginid;
this.newUser.name= this.navParam.data.name;
this.newUser.designation= this.navParam.data.designation;
this.newUser.sesskey= "";
  
}
changePasswd(){
  this.newUser.sesskey=this.sidebar.userinfo.sesskey;
  var apiresp=this.webapi.getData(this.newUser);
    apiresp.subscribe(r=>{
      var resp=JSON.parse(JSON.stringify(r));
      if("status" in resp){
        if(resp.status.type=="error"){

        }else{
          this.navCtrl.pop();
        }
      }
    });
  }
}

