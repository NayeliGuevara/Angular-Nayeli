import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';

import { isPlatformBrowser, NgIf } from '@angular/common';
import { Flore } from '../interface/flor';
import { FlorService } from '../service/ejemplo.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent {
  @ViewChild('modalElement') public modal!: ElementRef;
  flor: Flore | undefined;
  bootstrapModal: any;

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

  open(flor: Flore) {
    this.flor = flor;  // Asegúrate de que flor esté disponible cuando se abre el modal
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

  editarFlor(nombre: string, color: string, temporada: string, caracteristica: string, id: string) {
    const flor: Flore = {
      _id: id,
      nombre: nombre,
      color: color,
      temporada: temporada,
      caracteristica: caracteristica
    };

    this._florService.putFlor(id, flor).subscribe({
      next: (response) => {
        console.log('Flor editado con éxito');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.error(`Error al intentar actualizar el Flor: ${error}`);
      }
    });
  }
}
