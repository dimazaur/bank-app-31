import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { combineLatest, Subscription } from 'rxjs';

import { Item, Country, Year, FilterFields } from '../shared/interfaces';
import { ItemService } from '../shared/services/item.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit,OnDestroy {
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'year', 'country', 'action'];
  dataSource: any;
  
  countries: Country[];
  years: Year[];

  filteredDataItems: Item[]
  filter: FilterFields = {country:null, year: null}

  constructor(private router: Router,
              private itemService: ItemService){
  }

  sub:Subscription
  ngOnInit() {
    //--------------------По такому типу должен быть реальный код (использовать combineLatest)---------------------
    // this.sub = combineLatest(    
    //   this.countryService.getAll(),
    //   this.yearsService.getAll(),
    // ).subscribe( ([dataFromService1, dataFromService2]) =>{

    // })

    //Это все инициализировать в subscribe когда будут реальные данные
    this.countries = this.itemService.dataCountries
    this.years = this.itemService.dataYears
    this.filteredDataItems =  this.itemService.dataItems

    this.dataSource = new MatTableDataSource(this.filteredDataItems);
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilterInput(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeSelect(change: MatSelectChange, elementName:string){

    //По elementName определить какой Select отработал 
    switch(elementName){
      case 'country': this.filter.country = change.value; break;
      case 'year': this.filter.year = change.value; break;
    }

    //Поочередно отфильтровать по всем полям фильтра
    this.filteredDataItems = this.itemService.dataItems
            .filter(item=>{
              return this.filter.country? this.filter.country.name == item.country : item
            })
            .filter(item=>{
              return this.filter.year? this.filter.year.name == item.year : item
            })
    this.dataSource.data = this.filteredDataItems
  }  

  addNew(){
    this.router.navigate(['/new'])
  }

  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe()
  }
}

