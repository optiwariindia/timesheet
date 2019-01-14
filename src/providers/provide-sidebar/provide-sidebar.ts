import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebapiProvider } from '../webapi/webapi';
/*
  Generated class for the ProvideSidebarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvideSidebarProvider {
  userinfo:any={
    name:"",
    role:"",
    sesskey:"",
    sidebarBtns:{}
  };
  data:any;
  comp:any={
    users:false,
    loader:false,
    report:{
      daily:false,
      weekly:false,
      monthly:false
    },
    form:{
      addUser:false,
      changePasswd:false,
      chageUserInfo:false
    }
  }
  constructor(public store:Storage,public webapi:WebapiProvider) {
    this.store.get("userinfo").then(resp=>{
      var r=JSON.parse(resp);
      this.userinfo.name=r.name;
      this.userinfo.role=r.role;
      this.userinfo.sesskey=r.sesskey;
      this.showAdminMenu();
    });
  }
  resetAll(){
    this.comp={
      users:false,
      loader:true,
      report:{
        daily:false,
        weekly:false,
        monthly:false
      },
      form:{
        addUser:false,
        changePasswd:false,
        chageUserInfo:false
      }
    } 
  }
  showAdminMenu(){
    this.userinfo.sidebarBtns.user={addbtn:false,disp:true};
    this.userinfo.sidebarBtns.report={disp:true,daily:false,weekly:false,monthly:false};
    this.userinfo.sidebarBtns.timesheet={disp:true,others:false}
  }
  AdminUserList(p){
    this.resetAll();
    var userlist={
      sesskey:this.userinfo.sesskey,
      module:"users",
      action:"list",
      limit:10,
      page:p
    };
    var resp=this.webapi.getData(userlist);
    resp.subscribe(r=>{
      this.data=r;
      this.comp.users=true;
      this.userinfo.sidebarBtns.user.addbtn=true;
      this.comp.loader=false;
    });
    
  }
  AdminUserAdd(){
    this.resetAll();
    this.comp.form.addUser=true;
    this.comp.loader=false;
  }
  AdminUserChangePasswd(u){

  }
  AdminUserChangeInfo(u){

  }
  AdminUserDisable(u){

  }
}
