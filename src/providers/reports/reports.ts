import { Injectable } from '@angular/core';
import { WebapiProvider } from '../webapi/webapi';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ReportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportsProvider {
  Name='';
  error="";
  Date:any;
  retportType:Number;
  form:any={
    addActivity:false
  };
  display=false;
  months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  repYear:any;
  month:any;
  changeMonth=false;
  changeDate=false;
  activity={
    actDate:"",
    activity:"",
    remarks:"",
    module:"reports",
    action:"addActivity",
    sesskey:"",
    time:"",
    id:0
  };
  showLoader=false;
  userReport:any;
  report:any;
  usersList:any;
  constructor(public webapi:WebapiProvider,public store:Storage) {
    this.Date=Date();
    var d=new Date();
    d.setMonth(d.getMonth()+1);
    this.month=this.months[d.getMonth()-1]+" "+d.getFullYear();
    this.repYear=d.getFullYear();
    this.report=[];
    this.store.get("userinfo").then(resp=>{
      var r=JSON.parse(resp);
      this.activity.sesskey=r.sesskey;
    });
    this.retportType=1;
  }
  nextMonth(){
    var d=new Date(this.Date);
    d.setMonth(d.getMonth()+1);
    this.Date=d;
    this.showLoader=true;
    this.updateMonth();
  }
  updateMonth(){
    var d=new Date(this.Date);
    this.month=this.months[d.getMonth()]+" "+d.getFullYear();
  }
  changeRepMonthFormShow(){
    this.changeMonth=true;  
  }
  changeRepMonth(m,e){
    this.repYear=e;
    var d=new Date(this.Date);
    d.setMonth(m-1);
    d.setFullYear(e);
    this.Date=d;
    this.showLoader=true;this.changeMonth=false;
    this.updateMonth();
  }
  lastMonth(){
    var d=new Date(this.Date);
    d.setMonth(d.getMonth() - 1);
    this.Date=d;
    this.showLoader=true;
  }
  nextYear(){
    this.repYear=this.repYear+1;
  }
  lastYear(){
    this.repYear=this.repYear-1;
  }
  changeDateFormShow(){
    this.changeDate=true;
  }

  changeReportType(i){
    switch(i){
      case 1:
        this.Name="Daily Report";
        this.Date=Date();
        this.retportType=1;
      break;
      case 2:
        this.Name="Weekly Report";
        this.retportType=2;
      break;
      case 3:
        this.Name="Monthly Report";
        this.retportType=3;
      break;
    }
  }
  createUserReport(i){
    this.userReport=[];
    this.report.forEach(element => {
      this.userReport.push(element);
    });
  }
  getReport(){
    var data={
      sesskey:this.activity.sesskey,
      action:"getReport",
      reportType:this.retportType,
      module:"reports",
      repdate:this.Date
    };
    var apidata=this.webapi.getData(data);
    apidata.subscribe(resp=>{
      var r=JSON.parse(JSON.stringify(resp));
      if("reports" in r)
      this.report=r.reports;
      this.usersList=r.usersList;
      if("id" in r.login)
      this.createUserReport(r.login.id);
    });
  }
  next(){
    var d=new Date(this.Date);
    d.setDate(d.getDate()+1);
    this.Date=d;
    this.getReport();
  }
  back(){
    var d=new Date(this.Date);
    d.setDate(d.getDate()-1);
    this.Date=d;
    this.getReport();
  }
  showAddActivityForm(){
    this.activity.action="addActivity";
    this.form.addActivity=true;
  }
  
  hideForms(){
    this.form.addActivity=false;
  }
  addActivity(){
    this.activity.actDate=this.Date;
    var apiresp=this.webapi.getData(this.activity);
    apiresp.subscribe(resp=>{
      var r=JSON.parse(JSON.stringify(resp));
      if(r.status.result==false){
        this.error=r.error;
      }else{
        this.activity.activity="";
        this.activity.remarks="";
        this.hideForms();
        this.getReport();
      }
    });
  }
  editActivity(e){
    this.form.addActivity=true;
    this.activity.actDate=e.actDate;
    this.activity.activity=e.activity;
    this.activity.remarks=e.remarks;
    this.activity.action="updateActivity";
    this.activity.time=e.time;
    this.activity.id=e.id;
  }
  cancleActivity(e){
    this.activity.action="delete";
    this.activity.id=e.id;
    var apiresp=this.webapi.getData(this.activity);
    apiresp.subscribe(resp=>{
      var r=JSON.parse(JSON.stringify(resp));
      if(r.status.result==false){
        this.error="There is some issue. Please try latter";
      }else{
        this.activity.activity="";
        this.activity.remarks="";
        this.hideForms();
        this.getReport();
      }
    });
  }
}
