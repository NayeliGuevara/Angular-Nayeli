import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FlorService } from '../service/ejemplo.service';
import { Flore } from '../interface/flor';
@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  private bootstrapModal: any;

  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _florService: FlorService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {

    if (!this.bootstrapModal) {
      import('bootstrap').then((bootstrap) => {
        this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
      });
    }
  }

  open() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }
  Agregar(nombre: string, color: string, temporada: string, caracteristica: string) {
    
    const nuevaFlor: Flore = {
      nombre: nombre,
      color: color,
      temporada: temporada,
      caracteristica: caracteristica,
      _id: undefined,  
      __v: 0  
    };

    this._florService.postFlor(nuevaFlor).subscribe({
      next: (res) => {
        console.log('Flor agregada');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.log(`Error al agregar la flor: ${error}`);
        
      }
    });
  }
  
}



