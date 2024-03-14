// import {
//   ChangeDetectorRef,
//   Component,
//   Input,
//   OnInit,
//   ViewEncapsulation,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { CartService } from 'src/app/core/services/cart.service';
// import { StorageService } from 'src/app/core/services/storage.service';
// import { Product } from 'src/app/features/admin/models/Product.models';
// import { CartItem } from 'src/app/shared/models/cart.model';


// @Component({
//   selector: 'app-order-detail',
//   templateUrl: './order-detail.view.html',
//   styleUrls: ['./order-detail.view.scss', './totalbtn.scss'],
//   encapsulation: ViewEncapsulation.None,
//   providers: [ConfirmationService, MessageService],
// })
// export class OrderDetailView implements OnInit {
//   date: Date[] | undefined;
//   dateselect: Date[] | undefined;
//   activeIndex: number = 0;
//   i: number = 0;

//   selectedDate: Date | undefined;

//   stateOptions: any[] = [
//     {
//       label: 'Avenida Profr. Toribio Reyes 5, Huejutla, Hidalgo, Mexico',
//       value: 'on',
//     },
//   ];
//   value: string = 'off';

//   showInStoreAccordion = false;
//   showShippingAccordion = false;

//   @Input() carData: CartItem[] = [];
//   totalAmount: number = 0;
//   @Input() product!: Product;

//   paymentForm: FormGroup;
//   cantidadpro: number = 0;
//   calendarioAv = false;
//   // createForm: FormGroup;
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private cdr: ChangeDetectorRef,
//     private cartService: CartService,
//     private confirmationService: ConfirmationService,
//     private messageService: MessageService,
//     private carritoService: StorageService,
//     private formBuilder: FormBuilder
//   ) {
//     this.paymentForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       address: ['', Validators.required],
//       phone: ['', Validators.required],
//       productId: [[], Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//     });

//     const carDataFromStorage = this.carritoService.getCarrito();

//     if (carDataFromStorage) {
//       this.carData = carDataFromStorage;
//     }
//     this.getTotalAmount();
//   }

//   ngOnInit(): void {
//     this.cartService.totalPrice$.subscribe((totalPrice) => {
//       this.totalAmount = totalPrice;
//     });
//   }

//   submitForm() {
//     // Lógica para enviar el formulario
//     // Incluye los IDs de los productos y sus instrucciones especiales

//     const formData = this.paymentForm.value;
//     const productsWithInstructions = [];
//     for (let i = 0; i < this.carData.length; i++) {
//       // const productId = formData['productId' + i];
//       // const specialInstructions = formData['specialInstructions' + i];
//       const productId = formData[`productId${i}`];
//       const specialInstructions = formData[`specialInstructions${i}`];

//       if (productId && specialInstructions) {
//         productsWithInstructions.push({ productId, specialInstructions });
//       }
//       console.log(productId);
//     }
//     console.log(formData);
//     console.log(this.carData);
//     // Ahora puedes enviar productsWithInstructions junto con otros datos del formulario
//   }

//   // submitForm() {
//   //   // Lógica para enviar el formulario
//   //   // Incluye los IDs de los productos y sus instrucciones especiales
//   //   const formData = this.paymentForm.value;
//   //   const productsWithInstructions = [];
//   //   for (let i = 0; i < this.carData.length; i++) {
//   //     const productId = formData['productId' + i];
//   //     const specialInstructions = this.carData[i].specialInstructions;
//   //     if (productId && specialInstructions) {
//   //       productsWithInstructions.push({ productId, specialInstructions });
//   //     }
//   //   }
//   //   // Ahora puedes enviar productsWithInstructions junto con otros datos del formulario
//   // }

//   // Función auxiliar para marcar todos los campos del formulario como "touched"
//   markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach((control) => {
//       control.markAsTouched();

//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }

//   get cartItem(): CartItem {
//     return this.setCartItem();
//   }

//   setCartItem(): CartItem {
//     const cartItem: CartItem = {
//       id: this.product._id,
//       name: this.product.name,
//       precio: this.product.price,
//       cantidad: 1,
//       image: this.product.images,
//     };
//     return cartItem;
//   }

//   getTotalAmount(): number {
//     return this.carData.reduce(
//       (total, item) => total + item.precio * item.cantidad,
//       0
//     );
//   }

//   deliveryOption: string = 'inStore';
//   activeAccordionIndex: number = 0;

//   toggleAccordion(option: string): void {
//     if (option === 'inStore') {
//       this.activeAccordionIndex = 0;
//     } else if (option === 'shipping') {
//       this.activeAccordionIndex = 1;
//     }
//   }

//   confirm2(event: Event, item: CartItem) {
//     this.confirmationService.confirm({
//       target: event.target as EventTarget,
//       message: '¿Estás seguro de que quieres eliminar este elemento?',
//       icon: 'pi pi-info-circle',
//       acceptButtonStyleClass: 'p-button-danger p-button-sm',
//       accept: () => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Eliminado',
//           detail: `El producto "${item.name}" ha sido eliminado del carrito`,
//           life: 3000,
//         });
//         this.removeItem(item);
//       },
//       reject: () => {},
//     });
//   }

//   removeItem(item: CartItem): void {
//     this.carData = this.carData.slice();

//     const index = this.carData.indexOf(item);
//     if (index !== -1) {
//       this.carData.splice(index, 1);
//     }

//     this.cartService.remove(item);

//     this.cdr.detectChanges();
//   }

//   incrementQuantity(item: CartItem): void {
//     this.cartService.add(item);

//     item.cantidad++;

//     const totalKilos = this.carData.reduce(
//       (total, item) => total + item.cantidad,
//       0
//     );
//     if (totalKilos > 4) {
//       this.calendarioAv = false;
//     }
//     // console.log(totalKilos)
//   }

//   decrementQuantity(item: CartItem): void {
//     if (item.cantidad > 1) {
//       item.cantidad--;
//       const totalKilos = this.carData.reduce(
//         (total, item) => total + item.cantidad,
//         0
//       );
//       if (totalKilos < 4) {
//         this.calendarioAv = true;
//       }
//       // console.log(totalKilos)
//     }

//     this.cartService.decre(item);
//   }

//   redirectTo(route: string): void {
//     this.router.navigate(['/portal', route]);
//   }

//   continueToPayment() {
//     // Calcular la cantidad total de kilos de todos los productos en carData
//     const totalKilos = this.carData.reduce(
//       (total, item) => total + item.cantidad,
//       0
//     );

//     // console.log(this.deliveryOption, totalKilos);
//     if (this.deliveryOption === 'shipping' && totalKilos < 4) {
//       this.calendarioAv = true;
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Para el envío, la cantidad de kilos debe ser mayor a 4.',
//       });
//       this.activeIndex = 0;
//       this.router.navigate(['/payment/order-detail'], {
//         queryParams: {
//           deliveryOption: this.deliveryOption,
//           // Usar 'N/A' si no hay fecha formateada
//         },
//       });
//       return; // No necesitas el return aquí si deseas continuar con la lógica después de la validación.
//     }

//     // console.log(this.date, totalKilos);
//     // console.log(!this.deliveryOption || !this.date || this.date.length === 0);
//     if (!this.deliveryOption || !this.date || this.date.length === 0) {
//       this.calendarioAv = false;
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Falta seleccionar la fecha.',
//       });
//       return;
//     }
//     this.dateselect = this.date;

//     if (this.dateselect && this.dateselect.length > 0) {
//       const selectedDate = this.dateselect[0];
//       this.setDateToAllFields(selectedDate);
//     }
//     // if (totalKilos > 4 && this.deliveryOption != 'shipping') {
//     this.activeIndex = 1;
//     this.router.navigate(['/payment/order-detail'], {
//       queryParams: {
//         deliveryOption: this.deliveryOption,
//         // Usar 'N/A' si no hay fecha formateada
//       },
//     });
//     // }
//   }

//   // formatDate(date: Date): string {
//   //   if (!date) return 'N/A';

//   //   return date.toLocaleString(); // Formatea la fecha como string según la configuración regional del usuario
//   // }
//   formatDate(date: Date): string {
//     if (!date) return 'N/A';

//     // Formatea la fecha como una cadena legible
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short',
//     };
//     return date.toLocaleString('es-ES', options);
//   }

//   setDateToAllFields(date: Date): void {
//     const dateInputs = document.querySelectorAll('input[type="date"]');
//     dateInputs.forEach((input: any) => {
//       input.value = this.formatDate(date);
//     });
//   }
//   // Dentro de tu componente OrderDetailView
//   getDeliveryOptionLabel(): string {
//     return this.deliveryOption === 'shipping' ? 'Envío' : 'En tienda';
//   }

//   getTotalNetoValue(): string {
//     const totalAmount = this.getTotalAmount();
//     if (this.getDeliveryOptionLabel() === 'Envío') {
//       return (totalAmount + 200).toFixed(2);
//     } else {
//       return totalAmount.toFixed(2);
//     }
//   }
// }
