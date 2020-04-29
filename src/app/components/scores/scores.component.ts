import { Component, OnInit } from '@angular/core';
import { OmegagitService } from '../../services/omegagit.service';
import { element } from 'protractor';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
  providers: [OmegagitService]
})
export class ScoresComponent implements OnInit {

  public user: any;
  public userId: any;

  public new_user: any;
  public usuario_guardado;

  private student: any;
  private usernameOrEmail: any;
  private password: any;

  constructor(
    private _omegagitService: OmegagitService
  ) { 
    this.userId = 1;
    this.new_user = {
        'name': '',
        'job': ''
      };
    this.student = 'IvanAAC';
    this.usernameOrEmail = 'd.a.alvarez.ramirez';
    this.password = 'qwertypoiu';
  }

  ngOnInit() {
    this.validateCode();
  }

  public validateCode() {
    this._omegagitService.getStudentCode(this.student).subscribe(
      response => {
        let urlStudentGit = this.findJavaCode(response);

        this._omegagitService.getCodeFromGit(urlStudentGit).subscribe(
          response => {
            let codigo = atob(response.content);
            
            this._omegagitService.startSessionOnOmegaup(this.usernameOrEmail, this.password).subscribe(
              response => {
                console.log(codigo); 
                console.log(response);  // AQUÍ DA EL ERROR
              }
            );
          }
        );
      }
    );
  }

  private findJavaCode(response) {
    let urlStudentGit;
    let extension;
    response.forEach(element => {
      extension = element.name.split('.').pop();
      if(extension == "java") {
        urlStudentGit = element.git_url;
      }
    });
    return urlStudentGit;
  }

}
