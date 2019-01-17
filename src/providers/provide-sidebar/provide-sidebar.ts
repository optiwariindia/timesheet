import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebapiProvider } from '../webapi/webapi';
import { ReportsProvider } from '../reports/reports';
/*
  Generated class for the ProvideSidebarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvideSidebarProvider {
  userinfo:any={
    id:0,
    name:"",
    role:"",
    sesskey:"",
    sidebarBtns:{}
  };
  data:any;
  comp={
    users:false,
    loader:false,
    reports:false,
    dashboard:false,
    report:{
      daily:false,
      weekly:false,
      monthly:false
    },
    form:{
      addUser:false,
      updateUser:false,
      changePasswd:false,
      chageUserInfo:false
    },
    timesheet:false
  };
  constructor(public store:Storage,public webapi:WebapiProvider,public report:ReportsProvider) {
    this.resetUserInfo();
  }
  resetUserInfo(){
    this.store.get("userinfo").then(resp=>{
      if(resp!==null){
        var r=JSON.parse(resp);
        console.log(r);
        this.userinfo.id=r.id;
        this.userinfo.name=r.name;
        this.userinfo.role=r.role;
        this.userinfo.sesskey=r.sesskey;
        this.showAdminMenu();
      }
    });
  }
  resetAll(){
    this.comp={
      users:false,
      loader:false,
      reports:false,
      dashboard:false,
      report:{
        daily:false,
        weekly:false,
        monthly:false
      },
      form:{
        addUser:false,
        updateUser:false,
        changePasswd:false,
        chageUserInfo:false
      },
      timesheet:false
    }; 
  }
  showAdminMenu(){
    if(this.userinfo.role==1){
      this.userinfo.sidebarBtns.user={addbtn:false,disp:true};
    }else{
      this.userinfo.sidebarBtns.user={addbtn:false,disp:false};
    }
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
      this.resetUserInfo();
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
  ShowReports(){
    this.resetAll();
    this.comp.reports=true;
    this.report.Name="Daily Report";
    this.report.Date=Date();
  }
  timesheet(){
    console.log(this.userinfo);
    this.resetAll();
    this.report.getReport();
    this.report.Name="Daily Report";
    this.report.Date=Date();
    this.comp.timesheet=true;
    console.log("Daily Report called");
    console.log(this);
  }
}
