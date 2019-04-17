import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from "../../services/http.service";
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var CryptoJS: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public step: number = 1;
  public register: any = { IdCountry: 142, IsActive: 0, Profile: {} };

  public states: Array<any> = [];
  public cities: Array<any> = [];
  public zones: Array<any> = [];//['Polanco', 'Reforma', 'Revolucion', 'Tlalpan', 'Naucalpan', 'Condesa', 'Santa fe', 'Cuautitlan Izcalli', 'Lindavista', 'Buenavista'];

  public showPassword: boolean = false;

  public textPattern: any = /^[a-z\s0-9Ññ]+$/i;
  public emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,
              private router: Router) { }

  ngOnInit() { 
    this.getStates();
  }

  nextStep(){
    this.register.Profile.IdPackage = 2;
    this.step = 2;
  }

  createUser(){
    if(!this.register.Profile.IdPackage) return;

    this.swa.loading('Creando cuenta ...');

    this.register.Profile.Areas = [];
    for(let i = 0; i < this.register.Profile.Zones.length; i++){
      this.register.Profile.Areas.push({ Description: this.register.Profile.Zones[i].value });
    }

    this.register.Password = CryptoJS.SHA1(this.register.PasswordEncrypt);
    this.register.Password = CryptoJS.enc.Hex.stringify(this.register.Password);

    console.log(this.register);

    this.httpService.buildPostRequest('user/Add', this.register)
      .subscribe((data) => {
        this.swa.success('Cuenta creada', 'La cuenta se creó correctamente.', () => {
          this.step = 3;
        });
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getStates(){
    let filter = { Filtering: { IdCatalog: 7 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data) => {
        this.states = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getCities(){
    let filter = { Filtering: { IdCatalog: 8, KeyState: this.register.Profile.KeyState }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data) => {
        this.cities = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getZones(){
    let filter = { Filtering: { IdCatalog: 9, KeyState: this.register.Profile.KeyState, KeyTown: this.register.Profile.KeyTown }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data) => {
        this.zones = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  goToHome(){
    this.router.navigate(['home']);
  }
}
