import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

/*
  Generated class for the WebapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebapiProvider {
  webapi={
    path:"http://192.168.1.230:8080/"
  };
  constructor(public http: HttpClient) {
    console.log('Hello WebapiProvider Provider');
  }
    /*
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
    */

  getData(request){
    var frmData=new FormData();
    Object.keys(request).forEach(key=>frmData.append(key,request[key]));
    //frmData.append(key,value);
    return this.http.post(this.webapi.path,frmData);
  }

}
