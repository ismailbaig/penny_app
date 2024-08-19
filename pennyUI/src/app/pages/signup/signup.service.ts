import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.dev";
import { SignupDTO } from "./signup.dto";


@Injectable({
    providedIn: 'root'
  })
export class SignupService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){
  }

  public addUser(signupDto: SignupDTO): Observable<any> {
    var data = this.http.post(this._baseUrl + 'api/signup/adduser',  signupDto);
    return data;
  }
}


