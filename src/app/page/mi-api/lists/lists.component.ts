import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';


import { ModalEditComponent } from "./modal-edit/modal-edit.component";
import { FlorListComponent } from './ejemplo-list/ejemplo-list.component';
import { FloresAll } from './interface/flor';
import { FlorService } from './service/ejemplo.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ModalAgregarComponent, FlorListComponent, ModalEditComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  flor:FloresAll | undefined

  @ViewChild(ModalAgregarComponent) public modal!:ModalAgregarComponent
  constructor(
    private _srvFlor:FlorService
  ){}

  ngOnInit(): void {
    this._srvFlor.getAllFlores().subscribe(flors => {
      this.flor = flors
      console.log(this.flor)
    })
  }

  openModal(){
    if(this.modal){
      this.modal.open()
}
  }
  }



 
