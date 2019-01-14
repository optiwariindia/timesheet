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
  form={
    pwchange:false,
    heading:["",""],
    blockUser:false,
  };
  target:any;
  constructor(public navCtrl: NavController,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider) {
    this.target={};
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
  changePasswd(){
    this.newUser.sesskey=this.sidebar.userinfo.sesskey;
    this.errorReset();
    if(this.newUser.passwd!=this.newUser.cnfpass){
      this.frmError.cnfpass="Your password is not matching";
    }else{
      var apiresp=this.webapi.getData(this.newUser);
      apiresp.subscribe(r=>{
        var resp=JSON.parse(JSON.stringify(r));
        if("status" in resp){
          if(resp.status.type=="error"){

          }else{
            this.formReset();
            this.hideForms();
            this.sidebar.AdminUserList(0);
          }
        }
      });
    }
  }
  changePasswdForm(i){
    this.form.heading=["Change password of "+i.loginid];
    this.form.pwchange=true;
    this.newUser={
      loginid:i.loginid,
      name:i.name,
      designation:i.designation,
      passwd:"",
      cnfpass:"",
      module:"users",
      action:"changePasswd",
      sesskey:""
    }
  }
  hideForms(){
    this.form={
      pwchange:false,
      heading:["",""],
      blockUser:false
    }
  }
  changeDetails(i){
    console.log(i);
  }
  blockUserForm(i){
    this.form.blockUser=true;
    this.form.heading=["Block User","Do you really want to block "+i.loginid];
    this.target=i;
  }
  activateUserForm(i){
    this.form.blockUser=true;
    this.form.heading=["Activate User","Do you want to activate " + i.loginid];
    this.target=i;
  }
  blockUser(i){
    var usr={};
    if(i.active==1){
      usr={loginid:i.loginid,module:"users",action:"block",sesskey:this.sidebar.userinfo.sesskey};
    }else{
      usr={loginid:i.loginid,module:"users",action:"active",sesskey:this.sidebar.userinfo.sesskey};
    }
    var r=this.webapi.getData(usr);
    r.subscribe(resp=>{
      var rsp=JSON.parse(JSON.stringify(resp));
      if(rsp.status.result){
        this.hideForms();
        this.sidebar.AdminUserList(0);
      }
    });
  }

}
