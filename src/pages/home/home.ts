import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProvideSidebarProvider } from '../../providers/provide-sidebar/provide-sidebar';
import { WebapiProvider } from '../../providers/webapi/webapi';
import { CompSidebarComponent } from '../../components/comp-sidebar/comp-sidebar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newUser={
    loginid:"",
    name:"",
    designation:"",
    passwd:"",
    cnfpass:"",
    module:"users",
    action:"add",
    sesskey:""
  };
  frmError={
    loginid:"",
    cnfpass:""
  };
  constructor(public navCtrl: NavController,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider) {
  }
  errorReset(){
    this.frmError.loginid="";
    this.frmError.cnfpass="";
  }
  formReset(){
    this.newUser={
      loginid:"",
      name:"",
      designation:"",
      passwd:"",
      cnfpass:"",
      module:"users",
      action:"add",
      sesskey:""
    };
  }
  createUser(){
    this.newUser.sesskey=this.sidebar.userinfo.sesskey;
    this.errorReset();
    if(this.newUser.passwd!=this.newUser.cnfpass){
      this.frmError.cnfpass="Your password is not matching";
    }else{
      var apiresp=this.webapi.getData(this.newUser);
      apiresp.subscribe(r=>{
        var resp=JSON.parse(JSON.stringify(r));
        if(resp.status.type=="error"){
          switch(resp.status.error.type){
            case "loginid":
              this.frmError.loginid=resp.status.error.msg;
            break;
          }
        }else{
          this.formReset();
          this.sidebar.AdminUserList(0);
        }
      });
    }
  }

}
