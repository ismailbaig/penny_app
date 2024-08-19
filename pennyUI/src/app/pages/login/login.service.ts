import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.dev";
import { LoginDTO } from "./login. dto";


@Injectable({
    providedIn: 'root'
  })
export class LoginService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){
  }

  public getLoginToken(logindto: LoginDTO): Observable<any> {
    var data = this.http.post(this._baseUrl + 'api/login/tkn',  logindto);
    return data;
  }
}


