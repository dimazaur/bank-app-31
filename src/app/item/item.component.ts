import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { ItemService } from '../shared/services/item.service';
import { Item } from '../shared/interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit,OnDestroy {

  sub: Subscription
  //item: Item

  id: number

  constructor( private route: ActivatedRoute,
               private itemService: ItemService) { }

  ngOnInit() {

    //-------------------Для теста маршрута------------------------------
    this.sub = this.route.params.subscribe((params:Params)=>{
      if(params['id']){
        this.id = params['id']
      }
    })


    //------------------------Это реальный код-------------------------
    // this.sub = this.route.params.pipe(
    //   switchMap(
    //     (params: Params) => {
    //       if(params['id']) {
    //         return this.itemService.getById(params['id']);
    //       }
    //       return of(null);
    //   }
    // )).subscribe((data: Item)=>{
    //   if(data){
    //     this.item = data
    //   }
    // },
    // (err)=>{ console.log(err.message) })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
