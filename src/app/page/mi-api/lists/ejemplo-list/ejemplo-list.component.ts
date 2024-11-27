import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { Flore, FloresAll } from '../interface/flor';
import { FlorService } from '../service/ejemplo.service';
@Component({
selector: 'app-ejemplo-list',
  standalone: true,
  imports: [NgFor, NgIf,ModalEditComponent],
  templateUrl: './ejemplo-list.component.html',
  styleUrls: ['./ejemplo-list.component.css']
})
export class FlorListComponent implements OnInit {
  @Input() Flore: FloresAll | undefined;

  @ViewChild(ModalEditComponent) public modal!: ModalEditComponent;  

  constructor(private florService: FlorService) {}  

  ngOnInit(): void {}

  openModal(Flore: Flore): void {  
    if (this.modal) {
      this.modal.open(Flore);  
    } else {
      console.error('Modal no encontrado');
    }
  }

  eliminarFlor(id: string): void { 
    this.florService.deleteFlor(id).subscribe(() => {  
      console.log('Flor eliminada');
      window.location.reload();
    });
  }
}