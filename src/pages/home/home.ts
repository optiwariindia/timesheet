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
    action:"add"
  };
  frmError={
    comp:"",
    msg:""
  };
  constructor(public navCtrl: NavController,public sidebar:ProvideSidebarProvider,public webapi:WebapiProvider) {
  }
  createUser(){
    var apiresp=this.webapi.getData(this.newUser);
    apiresp.subscribe(r=>{
      var resp=JSON.parse(JSON.stringify(r));
      console.log(resp);
      switch(resp.status.type){
        case 'error':
          this.frmError={
            comp:resp.status.error.type,
            msg:resp.status.error.msg
          };
          console.log(this.frmError);
        break;
      }
    });
  }

}
