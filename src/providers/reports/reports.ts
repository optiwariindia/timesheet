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
  Date:any;
  retportType:Number;
  form:any={
    addActivity:false
  };
  activity={
    start:"",
    end:"",
    activity:"",
    remarks:"",
    module:"reports",
    action:"addActivity",
    sesskey:""
  };
  constructor(public webapi:WebapiProvider,public store:Storage) {
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
  next(){
    var d=new Date(this.Date);
    d.setDate(d.getDate()+1);
    this.Date=d;
  }
  back(){
    var d=new Date(this.Date);
    d.setDate(d.getDate()-1);
    this.Date=d;
  }
  showAddActivityForm(){
    this.form.addActivity=true;
  }
  hideForms(){
    this.form.addActivity=false;
  }
  addActivity(){
    var apiresp=this.webapi.getData(this.activity);
    apiresp.subscribe(resp=>{
      console.log(resp);
    });
  }

}
