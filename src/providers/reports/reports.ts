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
  activity={
    actDate:"",
    activity:"",
    remarks:"",
    module:"reports",
    action:"addActivity",
    sesskey:""
  };
  userReport:any;
  report:any;
  usersList:any;
  constructor(public webapi:WebapiProvider,public store:Storage) {
    this.Date=Date();
    console.log('Hello ReportsProvider Provider');
    this.store.get("userinfo").then(resp=>{
      var r=JSON.parse(resp);
      this.activity.sesskey=r.sesskey;
    });
    this.retportType=1;
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
      this.userReport.push({activity:element.activity,remarks:element.remarks,user:this.usersList[i].loginid});
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
      this.report=r.reports;
      console.log(r);
      this.usersList=r.usersList;
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
