import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProvideSidebarProvider } from '../../providers/provide-sidebar/provide-sidebar';
import { WebapiProvider } from '../../providers/webapi/webapi';
import { ReportsProvider } from '../../providers/reports/reports';
import { Storage } from '@ionic/storage';

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
    color:"#ffffff",
    module:"users",
    action:"add",
    sesskey:""
  };
  act={
    popup:false,
    descr:false,
    edit:false,
    reports:[],
    details:[]
  }
  sesskey="";
  cal:any;
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
  constructor(public navCtrl: NavController,public store:Storage,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider,public report:ReportsProvider) {
    var d=new Date(this.report.Date);
    this.store.get("userinfo").then(resp=>{
      var r=JSON.parse(resp);
      this.sesskey=r.sesskey;
      this.createCal({month:d.getMonth()+1,year:d.getFullYear()});
    });    
  }
  createCal({month,year}){
    this.cal=[];
    var week=[];
    var date=new Date(year+"-"+month+"-1");
    console.log(date);
    var startd=date.getDay();
    for(var i=0;i<startd;i++){
      week.push("");
    }
    var acts=[];
    if(week.length<7)
    for(var j=0;j<5;j++){
    for(i=week.length;i<7;i++){
      acts=[];
      date.setDate(date.getDate()+1);
      week.push({date:date.getDate(),month:date.getMonth(),year:date.getFullYear(),acts:acts});
      var apidata=this.webapi.getData({module:'reports',action:'getRep',sesskey:this.sesskey,date:date,i:i,j:j});
      apidata.subscribe(r=>{
        var resp=JSON.parse(JSON.stringify(r));
        for(var k=0;k<resp.rep.length;k++){
          this.cal[resp.request.j][resp.request.i].acts.push({color:resp.rep[k].color,user:resp.rep[k].user,time:resp.rep[k].time,title:resp.rep[k].activity,descr:resp.rep[k].remarks});
        }
      });
    }
    this.cal.push(week);
    week=[];
  }
  
  //console.log(date.getMonth()==month);
  //console.log(this.cal);
  this.sidebar.comp.dashboard=true;
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
      color:"#ffffff",
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
      color:i.color,
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
  changeDetailsForm(i){
    this.sidebar.comp.users=false;
    this.sidebar.comp.form.updateUser=true;
    this.newUser.name=i.name;
    this.newUser.loginid=i.loginid;
    this.newUser.designation=i.designation;
    this.newUser.action="updateUserInfo";
  }
  changeDetails(){
    this.newUser.sesskey=this.sidebar.userinfo.sesskey;
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
  changeRole(i){
    var usr={loginid:i.loginid,module:"users",action:"changeRole",role:i.role,sesskey:this.sidebar.userinfo.sesskey};
    //Updating role
    usr.role=(usr.role==1)?2:1;
    var r=this.webapi.getData(usr);
    r.subscribe(resp=>{
      var rsp=JSON.parse(JSON.stringify(resp));
      if(rsp.status.result){
        this.sidebar.AdminUserList(0);
      }
    });
  }  
  openActsPopup(e){
    this.act.popup=true;
    this.act.reports=e;
    console.log(this.act);
  }
  OpenActivity(e){
    this.act.details=e;
    this.act.descr=true;
    this.closeActPopup();
    console.log(e);
  }
  closeActDescr(){
    this.act.descr=false;
    console.log("Description closed");
  }
  closeActPopup(){
    this.act.popup=false;
    console.log("Close Act popup");
  }
}
