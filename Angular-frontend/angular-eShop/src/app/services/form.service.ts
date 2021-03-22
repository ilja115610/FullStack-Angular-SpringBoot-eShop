import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../common/country';
import {map} from 'rxjs/operators';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countriesUrl = "http://localhost:8080/api/countries"

  private stateUrl = "http://localhost:8080/api/states/"

  constructor(private httpClient: HttpClient) { }


  populateCountries (): Observable<Country[]> {

    return this.httpClient.get<GetCountries>(this.countriesUrl).pipe(
      map(response=>response._embedded.countries)
    );

  }

  populateStatesByCountry (theCountryCode: string) : Observable<State []> {

    const url = `${this.stateUrl}search/findByCountryCode?code=`+theCountryCode;

    return this.httpClient.get<GetStates>(url).pipe(
      map(response=>response._embedded.states)
    );
  }

}

interface GetStates {

  _embedded: {
    states: State [];
  }
}

interface GetCountries {

  _embedded: {
    countries: Country [] ;
  }

}
