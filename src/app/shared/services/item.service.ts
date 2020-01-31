import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, Year, Country } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ItemService{
    //---------------- После настройки прокси это все удалить------------------
    dataCountries: Country[] = [
        {id: 1, name: 'Украина'},
        {id: 2, name: 'Россия'},
        {id: 3, name: 'Китай'}
      ];
      
    dataYears: Year[] = [
        {id: 1, name: 1995},
        {id: 2, name: 2000},
        {id: 3, name: 2005},
        {id: 4, name: 2016},
        {id: 5, name: 2019}
      ];
      
    dataTestItems: Item[] = [
        {id: 1, name: 'Hydrogen', year: 2000, country: 'Украина'},
        {id: 2, name: 'Helium', year: 1999, country: 'Россия'},
        {id: 3, name: 'Lithium', year: 1995, country: 'Россия'},
        {id: 4, name: 'Beryllium', year: 2005, country: 'Украина'},
        {id: 5, name: 'Boron', year: 2016, country: 'Украина'},
        {id: 6, name: 'Carbon', year: 2019, country: 'Китай'},
        {id: 7, name: 'Nitrogen', year: 2000, country: 'Россия'},
        {id: 8, name: 'Oxygen', year: 2016, country: 'Россия'},
        {id: 9, name: 'Fluorine', year: 2005, country: 'Китай'},
        {id: 10, name: 'Neon', year: 2000, country: 'Украина'},
      ];
    //-------------------------------------------------------------------

    public dataItems: Item[] 
    constructor(private http: HttpClient){
      
      this.dataItems = this.dataTestItems 
      // Должно отработает так при injection сервиса в компоненты (но не уверен)
      //this.getAll().subscribe((data)=>this.dataItems = data )
    }

    getAll(): Observable<Item[]>{
        return this.http.get<Item[]>(`/api/url`)
    }

    getById(id: number): Observable<Item>{
        return this.http.get<Item>(`/api/url${id}`)
    }

    create(item:Item): Observable<Item>{
      return this.http.post<Item>(`/api/url`,item)
    }

    update(item:Item): Observable<Item>{
      return this.http.put<Item>(`/api/url`,item)
    }
}