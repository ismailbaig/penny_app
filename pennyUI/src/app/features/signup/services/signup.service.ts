import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "pennyUI/src/environments/environment.dev";
import { Observable } from "rxjs";
import { SignupDTO } from "../models/signup.dto";
import { SignupResponse } from "../models/signup-response.model";


@Injectable({
    providedIn: 'root'
  })
export class SignupService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){
  }

  public addUser(signupDto: SignupDTO): Observable<SignupResponse> {
    var data = this.http.post<SignupResponse>(this._baseUrl + 'api/signup/adduser',  signupDto);
    return data;
  }
}


