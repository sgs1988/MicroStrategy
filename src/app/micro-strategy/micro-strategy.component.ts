import { Component, OnInit } from '@angular/core';
declare const microstrategy: any;
@Component({
  selector: 'app-micro-strategy',
  templateUrl: './micro-strategy.component.html',
  styleUrls: ['./micro-strategy.component.scss']
})
export class MicroStrategyComponent implements OnInit {
/* These are the parameters necessary for connecting to the Dossier ----------------------------- */
baseRestURL = "https://demo.microstrategy.com/MicroStrategyLibrary";
projectID   = "B7CA92F04B9FAE8D941C3E9B7E0CD754";
dossierID   = "43CDADC942EA17F40F7629BE9D48861B";
dossierUrl = this.baseRestURL + '/app/' + this.projectID + '/' + this.dossierID;
/* End of configuration parameters  ------------------------------------------------------------- */
  constructor() { }

  ngOnInit(): void {
    this.setDossier();
  }

  setDossier() {
    /* Populate div with Dossier: */
    console.log(microstrategy, '...microstrategy..');
    
    microstrategy.dossier.create({
      /* This is the document's <div> container where the Dossier should be placed. */
      placeholder: document.getElementById("dossierContainer"),
      url: this.dossierUrl,

      /* The following parameters define the appearance of the Dossier.
      E.g. is the navigation or collaboration bar displayed, do right-click actions work, etc. */
      disableNotification: true,
      enableResponsive: true,

      /* And parameters for the user authentication. */
      /* In case we didn't want the dossier to load automatically for everyone */
      /* and wanted the user to log in we would skip that part. */
      enableCustomAuthentication: true,
      customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
      getLoginToken: login

    }).then((dossier: any) => {
      /* Code to execute after the Dossier has finished loading... */
    });
  }
}

function login() {
  /* Prepare some parameters for login request */
  var baseRestURL = "https://demo.microstrategy.com/MicroStrategyLibrary";
  /* since in this case we want dossier to load automatically for everyone we will use a demo user */
  var username    = "demo";
  var password    = "";
  console.log('Login....');
  var options: any = {
    method: 'POST',
    credentials: 'include', /* include cookie */
    mode: 'cors', /* set as CORS mode for cross origin resource sharing */
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
     loginMode: 8, /* Login as guest user. */
    /* "loginMode": 1, */ /* standard login mode */
    "username": username,
    "password": password
    })
  };

  /* The actual login takes place here */
  return fetch(baseRestURL + '/api/auth/login', options).then((response: any) => {
    console.log(response, '..response..' + response.headers.get('x-mstr-authToken'));
    if (response.ok) {
    return response.headers.get('x-mstr-authToken');
    } else {
    response.json().then((json: any) => {
      console.log(json);
    });
    }
  }).catch((error: any) => {
    console.log(error);
  });
};