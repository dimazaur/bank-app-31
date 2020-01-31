import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';

import { ItemService } from '../shared/services/item.service';
import { Item } from '../shared/interfaces';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject()
  isNew: boolean = true
  form: FormGroup 
  itemId: number;
  

  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required])
    })
    
    this.form.disable()
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe),
      switchMap((params: Params)=>{
        if(params['id']){
          this.itemId = params['id']
          this.isNew = false
          //-------------Для теста (потом удалить) -----------------------------
          const idx = this.itemService.dataItems.findIndex(e=>e.id == this.itemId)
          return of(this.itemService.dataItems[idx])
          //---------------------------------------------------------------------
          
          //----------------------Реальный код----------------------------------
          //return this.itemService.getById(params['id'])
        }
        return of(null)  
      })
    ).subscribe(
      (data: Item) => {
        if(data){
          const { id, ...dataField } = data
          this.form.patchValue({
            ...dataField
          })
        }
        this.form.enable()
      },
      (err)=>{console.log(err)}  
    )
  }

  onSubmit(){
    if(this.itemId){
      //----------------------Для теста UPDATE (потом удалить)----------------------------------------------
      const idx = this.itemService.dataItems.findIndex(e=>e.id == this.itemId)
      this.itemService.dataItems[idx] = {id: this.itemId, ...this.form.value}
      this.router.navigate(['/'])
      //----------------------------------------------------------------------------------------------------


      //------------------------------------Реальный код----------------------------------------------------
      // this.itemService.update({id: this.itemId, ...this.form.value })
      //   .pipe(takeUntil(this.ngUnsubscribe))
      //   .subscribe(data=>{
      //  const idx = this.itemService.dataItems.findIndex(e=>e.id==this.itemId) // находим индекс в массиве
      //  this.itemService.dataItems[idx] = {id: this.itemId, ...this.form.value} // заменяем элемент
      //  this.router.navigate(['/'])
      //})
      //----------------------------------------------------------------------------------------------------
    }else{
      //--------------------Это для теста CREATE (потом удалить)--------------------------------------------
      this.itemService.dataItems.push({ id:11 ,...this.form.value})
      this.router.navigate(['/'])
      //----------------------------------------------------------------------------------------------------


      //---------------------Реальный код ------------------------------------------------------------------
      /*
        из API вернуть созданный  объект в БД с ID
      */
      // this.itemService.create({...this.form.value})
      //   .pipe(takeUntil(this.ngUnsubscribe))
      //   .subscribe(data=>{
      //     this.itemService.dataItems.push(data)
      //     this.router.navigate(['/'])
      //   })
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
