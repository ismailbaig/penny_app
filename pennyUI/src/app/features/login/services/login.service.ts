import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "pennyUI/src/environments/environment.dev";
import { Observable } from "rxjs";
import { LoginDTO } from "../models/login. dto";

@Injectable({
    providedIn: 'root'
  })
export class LoginService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){
  }

  public getLoginToken(logindto: LoginDTO): Observable<LoginDTO> {
    var data = this.http.post<LoginDTO>(this._baseUrl + 'api/login/tkn',  logindto);
    return data;
  }
}


