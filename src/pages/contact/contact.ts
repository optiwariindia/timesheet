import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvideSidebarProvider } from '../../providers/provide-sidebar/provide-sidebar';
import { WebapiProvider } from '../../providers/webapi/webapi';
import { HomePage } from '../home/home';

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
  action: "changeUserPasswd",
  sesskey: ""
};
error={
  show:false,
  msg:"Error Message"
};
  constructor(public navCtrl: NavController,public navParam:NavParams,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider) {
this.newUser.loginid= this.navParam.data.loginid;
this.newUser.name= this.navParam.data.name;
this.newUser.designation= this.navParam.data.designation;
this.newUser.sesskey= "";
  
}
changePasswd(){
  if(this.newUser.passwd!=this.newUser.cnfpass){
    console.log("Error");
      this.error.show=true;
      this.error.msg="Password must match with Confirm password. Please check!!!";
      setTimeout(()=>{
        this.error.show=false;
      },5000);
  }else{

    this.newUser.sesskey=this.sidebar.userinfo.sesskey;
    var apiresp=this.webapi.getData(this.newUser);
    apiresp.subscribe(r=>{
      var resp=JSON.parse(JSON.stringify(r));
      if("status" in resp){
        if(resp.status.type=="error"){
          this.error.show=true;
          this.error.msg="Your password is not changed due to some system error. Please re-login and try again.";
          setTimeout(()=>{
            this.error.show=false;
          },5000);
        }else{
          alert("Your password is changed successfully");
          this.navCtrl.pop();
        }
      }
    });
  }
  }
}

