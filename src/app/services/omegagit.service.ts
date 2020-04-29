import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OmegagitService {

    private proxy: string;
    private urlStudentRep: string;
    private urlUserLogin: string;

    constructor(
        private _http: HttpClient
    ){
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.urlStudentRep = 'https://api.github.com/repos/servicioSocialUady/sample-assignment-individual-';
        this.urlUserLogin = 'https://omegaup.com/api/user/login'
    }

    // GITHUB REQUESTS
    getStudentCode(student): Observable<any> {
        return this._http.get(this.urlStudentRep + student + '/contents');
    }

    getCodeFromGit(urlStudentGit): Observable<any> {
        return this._http.get(urlStudentGit);
    }

    // OMEGAUP REQUESTS
    startSessionOnOmegaup(usernameOrEmail, password): Observable<any> {
        const user = {
            'usernameOrEmail': usernameOrEmail,
            'password': password
        };
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.proxy + this.urlUserLogin, params, {headers: headers});
    }

}