// import { Component } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

interface PasteleriaFlavor {
  name: string;
  code: string;
  precioPorKilo: number; // Agrega el precio por kilo para cada sabor
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class OrderComponent {
  flavors: PasteleriaFlavor[] | undefined;
  instrucion: string = '';
  selectedFlavor: PasteleriaFlavor | undefined;
  selectedQuantity: number | undefined; // Variable para la cantidad seleccionada
  precioTotal: number | undefined; // Variable para el precio total
  personasPorKilo: number | undefined; // Variable para la cantidad de personas por kilo
  modoOptions: string[] = ['cuadrado', 'redondo', 'corazon', 'otro']; // Opciones de modo de repostería
  selectedModo: string | undefined; // Variable para el modo seleccionado
  modoPersonalizado: string | undefined; // Variable para el modo personalizado

  selectedModosabor: string = ''; // Variable para almacenar el modo seleccionado
  // saborpersonalizado: string = ''; // Variable para almacenar las instrucciones especiales
  // nombre: any;
  // apellido1: any;
  // apellido2: any;
  // correo: any;
  // telefono: any;
  // dia: any;
  // hora: any;
  nombre: string | undefined;
  apellido1: string | undefined;
  apellido2: string | undefined;
  correo: string | undefined;
  telefono: string | undefined;
  dia: Date | undefined;
  hora: string | undefined;
  // modoPersonalizado: string | undefined;
  saborpersonalizado: string | undefined;
  constructor(    private messageService: MessageService){}
  ngOnInit() {
    this.flavors = [
      { name: 'Chocolate', code: 'choco', precioPorKilo: 25 }, // Define el precio por kilo para cada sabor
      { name: 'Vainilla', code: 'vani', precioPorKilo: 30 },
      { name: 'Fresa', code: 'fres', precioPorKilo: 20 },
      { name: 'Limón', code: 'lim', precioPorKilo: 35 },
      { name: 'Naranja', code: 'nara', precioPorKilo: 40 },
    ];
    this.selectedModo = undefined; // Inicializar el modo seleccionado
    this.modoPersonalizado = undefined; // Inicializar el modo personalizado
  }

  kilosOptions: number[] = [1, 2, 3, 4, 5]; // Opciones de cantidad en kilos

  calcularPrecio(): void {
    if (this.selectedFlavor && this.selectedQuantity) {
      this.precioTotal =
        this.selectedFlavor.precioPorKilo * this.selectedQuantity;
    } else {
      this.precioTotal = undefined;
    }
    if (this.selectedFlavor !== undefined && this.selectedFlavor !== null) {
      // Limpiar el textarea de sabor
      this.saborpersonalizado = '';
    }
  }

  calcularPersonas(): void {
    if (this.selectedQuantity) {
      this.personasPorKilo = this.selectedQuantity * 25;
    } else {
      this.personasPorKilo = undefined;
    }
    if (this.selectedFlavor !== undefined && this.selectedFlavor !== null) {
      // Limpiar el textarea de sabor
      this.saborpersonalizado = '';
    }
  }

  modoChanged(): void {
    if (this.selectedModosabor === 'otrosabor') {
      console.log('Se seleccionó otro sabor');
      this.selectedFlavor = undefined; // Limpiar el select de sabores
    }
    if (this.selectedModo !== 'otro') {
      this.modoPersonalizado = undefined;
    }
  }

  getIconClass(modo: string): string {
    // Función para obtener la clase de icono basada en el modo seleccionado
    switch (modo) {
      case 'cuadrado':
        return 'pi pi-stop';
      case 'redondo':
        return 'pi pi-circle';
      case 'corazon':
        return 'pi pi-heart';
      default:
        return '';
    }
  }


  // enviarPedido() {
  //   // Validar que todos los campos obligatorios estén completos
  //   if (
  //     !this.nombre ||
  //     !this.apellido1 ||
  //     !this.apellido2 ||
  //     !this.correo ||
  //     !this.telefono ||
  //     (!this.selectedFlavor && !this.saborpersonalizado) || // Verificar que se haya seleccionado un sabor o se haya proporcionado uno personalizado
  //     (!this.selectedModo && !this.modoPersonalizado) || // Verificar que se haya seleccionado una cantidad o se haya proporcionado una cantidad personalizada
  //     !this.selectedQuantity ||
  //     !this.dia ||
  //     !this.hora
  //   ) {
  //     console.error('Por favor complete todos los campos obligatorios.');
  //     if (!this.nombre) {
  //       console.error('El campo Nombre es obligatorio.');
  //     }
  //     if (!this.apellido1) {
  //       console.error('El campo Apellido 1 es obligatorio.');
  //     }
  //     if (!this.apellido2) {
  //       console.error('El campo Apellido 2 es obligatorio.');
  //     }
  //     if (!this.correo) {
  //       console.error('El campo Correo es obligatorio.');
  //     }
  //     if (!this.telefono) {
  //       console.error('El campo Teléfono es obligatorio.');
  //     }
  //     if (!this.selectedFlavor && !this.saborpersonalizado) {
  //       console.error('Por favor seleccione un sabor o proporcione uno personalizado.');
  //     }
  //     if (!this.selectedModo && !this.modoPersonalizado) {
  //       console.error('Por favor seleccione un modo  o proporcione una modo personalizada.');
  //     }
  //     if (!this.selectedQuantity) {
  //       console.error('seleccione una cantidad');
  //     }
  //     if (!this.dia) {
  //       console.error('El campo Día es obligatorio.');
  //     }
  //     if (!this.hora) {
  //       console.error('El campo Hora es obligatorio.');
  //     }
  //     return;
  //   }
  
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Info',
  //     detail: response.message,
  //   });
  //   // Validar el formato del correo electrónico
  //   const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  //   if (!emailPattern.test(this.correo)) {
  //     console.error('Por favor ingrese un correo electrónico válido.');
  //     return;
  //   }
  
  //   // Validar el número de teléfono
  //   const phonePattern = /^[0-9]{10}$/;
  //   if (!phonePattern.test(this.telefono)) {
  //     console.error(
  //       'Por favor ingrese un número de teléfono válido (10 dígitos numéricos).'
  //     );
  //     return;
  //   }
  
  //   // Validar que la fecha sea en el futuro
  //   const currentDate = new Date();
  //   if (this.dia < currentDate) {
  //     console.error('Por favor seleccione una fecha futura.');
  //     return;
  //   }
  
  //   // Validar que la hora esté dentro del rango válido
  //   const selectedTime = new Date(this.hora);
  //   const minTime = new Date('09:00');
  //   const maxTime = new Date('18:00');
  //   if (selectedTime < minTime || selectedTime > maxTime) {
  //     console.error(
  //       'Por favor seleccione una hora válida (entre las 09:00 y las 18:00).'
  //     );
  //     return;
  //   }
  
  //   // Si todas las validaciones pasan, enviar el pedido
  //   const datosPedido = {
  //     nombre: this.nombre,
  //     apellido1: this.apellido1,
  //     apellido2: this.apellido2,
  //     correo: this.correo,
  //     telefono: this.telefono,
  //     sabor: this.selectedFlavor,
  //     cantidad: this.selectedQuantity,
  //     modo: this.selectedModo,
  //     dia: this.dia,
  //     hora: this.hora,
  //     modoPersonalizado: this.modoPersonalizado,
  //     saborpersonalizado: this.saborpersonalizado,
  //     // Agrega aquí todos los campos necesarios para el pedido
  //   };
  
  //   console.log('Enviando pedido:', datosPedido);
  //   // Llamar al servicio para enviar el pedido al servidor
  // }
  
  enviarPedido() {
    // Validar que todos los campos obligatorios estén completos
    if (!this.nombre) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio.',
      });
      return;
    }

    if (!this.apellido1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Apellido 1 es obligatorio.',
      });
      return;
    }

    if (!this.apellido2) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Apellido 2 es obligatorio.',
      });
      return;
    }

    if (!this.correo) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Correo es obligatorio.',
      });
      return;
    }

    if (!this.telefono) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Teléfono es obligatorio.',
      });
      return;
    }

    if (!this.selectedFlavor && !this.saborpersonalizado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor seleccione un sabor o proporcione uno personalizado.',
      });
      return;
    }

    if (!this.selectedModo && !this.modoPersonalizado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor seleccione un modo o proporcione una modo personalizada.',
      });
      return;
    }

    if (!this.selectedQuantity) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una cantidad.',
      });
      return;
    }

    if (!this.dia) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Día es obligatorio.',
      });
      return;
    }

    if (!this.hora) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Hora es obligatorio.',
      });
      return;
    }

    // Validar el formato del correo electrónico
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(this.correo)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor ingrese un correo electrónico válido.',
      });
      return;
    }

    // Validar el número de teléfono
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.telefono)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor ingrese un número de teléfono válido (10 dígitos numéricos).',
      });
      return;
    }

    // Validar que la fecha sea en el futuro
    const currentDate = new Date();
    if (this.dia < currentDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor seleccione una fecha futura.',
      });
      return;
    }

    // Validar que la hora esté dentro del rango válido
    const selectedTime = new Date(this.hora);
    const minTime = new Date('09:00');
    const maxTime = new Date('18:00');
    if (selectedTime < minTime || selectedTime > maxTime) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor seleccione una hora válida (entre las 09:00 y las 18:00).',
      });
      return;
    }

    // Si todas las validaciones pasan, enviar el pedido
    const datosPedido = {
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      correo: this.correo,
      telefono: this.telefono,
      sabor: this.selectedFlavor,
      cantidad: this.selectedQuantity,
      modo: this.selectedModo,
      dia: this.dia,
      hora: this.hora,
      modoPersonalizado: this.modoPersonalizado,
      saborpersonalizado: this.saborpersonalizado,
      // Agrega aquí todos los campos necesarios para el pedido
    };

    console.log('Enviando pedido:', datosPedido);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Enviando pedido',
    });
    return;
    // Llamar al servicio para enviar el pedido al servidor
  }

  // enviarPedido() {
  //   const datosPedido = {
  //     nombre: this.nombre,
  //     apellido1: this.apellido1,
  //     apellido2: this.apellido2,
  //     correo: this.correo,
  //     telefono: this.telefono,
  //     sabor: this.selectedFlavor,
  //     cantidad: this.selectedQuantity,
  //     modo: this.selectedModo,
  //     dia: this.dia,
  //     hora: this.hora,
  //     modoPersonalizado: this.modoPersonalizado,
  //     saborpersonalizado: this.saborpersonalizado,
  //     // Agrega aquí todos los campos necesarios para el pedido
  //   };

  //   console.log(datosPedido);
  //   // this.pedidoService.enviarPedido(datosPedido).subscribe(
  //   //   response => {
  //   //     // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
  //   //     console.log('Pedido enviado con éxito:', response);
  //   //   },
  //   //   error => {
  //   //     // Manejar cualquier error que ocurra durante el envío del pedido
  //   //     console.error('Error al enviar el pedido:', error);
  //   //   }
  //   // );
  // }
}
