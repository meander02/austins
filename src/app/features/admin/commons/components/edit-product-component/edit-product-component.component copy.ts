// import { Product } from '../../../models/Product.models';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ProductService } from '../../services/product.service';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import {
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   Inject,
//   inject,
// } from '@angular/core';
// import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
// import { environment } from 'src/environments/environment';
// import { forkJoin } from 'rxjs';
// import { DomSanitizer } from '@angular/platform-browser';
// import { RestService } from '../../services/rest.service';
// import { CategoryService } from '../../services/category.service';
// import { Categoria } from '../../../models/Category.models';
// import { HttpErrorResponse } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-edit-product-component',
//   templateUrl: './edit-product-component.component.html',
//   styleUrls: ['./edit-product-component.component.scss'],
// })
// export class EditProductComponentComponent {
//   // file: File | null = null;
//   editForm: FormGroup;
//   product: Product;
//   file: File | null = null;

//   productImage: File | null = null;
//   separatorKeysCodes = [ENTER, COMMA] as const;

//   chips: any[] = [];
//   productImages: any[] = [];
//   selectedImages: File[] = [];
//   // imagenPrevia: any;
//   files: any = [];
//   loading: boolean | undefined;
//   categories: Categoria[] = [];
//   constructor(
//     private dialogRef: MatDialogRef<EditProductComponentComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder,
//     private el: ElementRef,
//     private cdRef: ChangeDetectorRef,

//     private sanitizer: DomSanitizer,
//     private rest: RestService,
//     private categoryService: CategoryService,
//     private productService: ProductService,
//     private snackBar: MatSnackBar // Agrega esta línea
//   ) {
//     this.product = data.product; // Obtiene el producto a editar de los datos pasados
//     // this.categories = [];
//     this.editForm = this.fb.group({
//       name: [this.product.name, Validators.required],
//       sku: [this.product.sku, Validators.required],
//       description: [this.product.description, Validators.required],
//       unit: [this.product.unit, Validators.required],
//       price: [this.product.price, Validators.required],
//       quantity: [this.product.quantity, Validators.required],
//       category: [this.product.category, Validators.required],
//       maker: [this.product.maker, Validators.required],
//       status: [this.product.status === 'ACTIVE', Validators.required],
//       ingredients: this.fb.array(this.product.ingredients || []),
//       allergens: this.fb.array(this.product.allergens || []),
//       model: [this.product.model, Validators.required],
//       expiration: [this.product.expiration, Validators.required],
//       weight: [this.product.weight, Validators.required],
//       nutritionalInformation: [
//         this.product.nutritionalInformation,
//         Validators.required,
//       ],
//       isFeatured: [this.product.isFeatured, Validators.required],
//       isVegetarian: [this.product.isVegetarian, Validators.required],
//       isGlutenFree: [this.product.isGlutenFree, Validators.required],
//       images: this.fb.array(this.product.images || []),
//     });
//     this.loadCategories();
//     this.editForm.addControl('ingredientsInput', this.fb.control(''));
//     this.editForm.addControl('allergensInput', this.fb.control(''));
//   }

//   onFileChange(event: any): void {
//     this.file = event.target.files[0];
//   }
//   uploadImage(): void {
//     if (this.file) {
//       const category = this.editForm.value.category; // Reemplaza con tu categoría
//       const productId = this.product._id; // Reemplaza con tu ID de producto
//       const position = this.product.images.length; // Set the position as the length of the existing images array

//       this.productService
//         .updateProductImage(category, productId, position, this.file)
//         .subscribe(
//           (response) => {
//             console.log('Imagen subida exitosamente:', response);
//             // this.updateProduct(this.product);
//             this.showSuccessSnackBar('Imagen subida exitosamente');
//             this.dialogRef.close(this.product);
//           },
//           (error) => {
//             console.error('Error al subir la imagen:', error);
//           }
//         );
//     }
//   }

//   saveChanges(): void {
//     console.log('Save Changes button clicked'); // Add this line
//     console.log('Product Image:', this.file);

//     if (this.editForm.valid) {
//       const editedProduct: Product = {
//         ...this.data.product, // Conserva los valores no editados
//         name: this.editForm.value.name,
//         description: this.editForm.value.description,
//         unit: this.editForm.value.unit,
//         expiration: this.editForm.value.expiration,
//         model: this.editForm.value.model,
//         quantity: this.editForm.value.quantity,
//         price: this.editForm.value.price,
//         category: this.editForm.value.category,
//         maker: this.editForm.value.maker,
//         images: this.editForm.value.images,
//         status: this.editForm.value.status ? 'ACTIVE' : 'INACTIVE',
//         weight: this.editForm.value.weight,
//         ingredients: this.getIngredientsArray(),
//         allergens: this.getAllergensArray(),
//         nutritionalInformation: this.editForm.value.nutritionalInformation,
//         isFeatured: this.editForm.value.isFeatured,
//         isVegetarian: this.editForm.value.isVegetarian,
//         isGlutenFree: this.editForm.value.isGlutenFree,
//       };
//       if (this.file) {
//         this.uploadImage();
//       } else {
//         this.updateProduct(editedProduct);
//       }
//     }
//   }

//   private updateProduct(product: Product): void {
//     this.productService.updateProduct(product).subscribe(
//       (updatedProduct: Product) => {
//         this.productImages = updatedProduct.images;
//         console.log('editado--', this.productImages);
//         console.log('producto--', product);
//         this.showSuccessSnackBar('Product successfully edited');
//         this.dialogRef.close(updatedProduct);
//       },
//       (error) => {
//         console.error('Error updating product', error);
//       }
//     );
//   }

//   showSuccessSnackBar(message: string): void {
//     this.snackBar.open(message, 'Cerrar', {
//       duration: 3000, // Duración en milisegundos
//       panelClass: ['snackbar-success'], // Clases CSS adicionales para el estilo
//     });
//   }

//   /////////////funciones adicionales
//   loadCategories() {
//     this.categoryService.getAllCategories().subscribe(
//       (data: Categoria[]) => {
//         this.categories = data;
//       },
//       (error) => {
//         console.error('Error al cargar las categorías:', error);
//       }
//     );
//   }

//   getImages(url: string): string {
//     return `${environment.api}/${url}`;
//   }
//   getIngredientsArray(): string[] {
//     const ingredientsControl = this.editForm.get('ingredients');
//     return ingredientsControl ? ingredientsControl.value : [];
//   }
//   getAllergensArray(): string[] {
//     const allergensControl = this.editForm.get('allergens');
//     return allergensControl ? allergensControl.value : [];
//   }
//   getIngredientsInputValue(): string {
//     const ingredientsInputControl = this.editForm.get('ingredientsInput');
//     return ingredientsInputControl ? ingredientsInputControl.value : '';
//   }
//   getAllergensInputValue(): string {
//     const allergensInputControl = this.editForm.get('allergensInput');
//     return allergensInputControl ? allergensInputControl.value : '';
//   }
//   agregarIngrediente() {
//     const ingredientsArray = this.editForm.get('ingredients') as FormArray;
//     ingredientsArray.push(this.fb.control('Nuevo ingrediente'));
//     console.log('Ingrediente agregado:', this.editForm.value.ingredients);
//   }
//   addChip(event: MatChipInputEvent, controlName: string): void {
//     const value = (event.value || '').trim();
//     if (value) {
//       const control = this.editForm.get(controlName) as FormArray;
//       control.push(this.fb.control(value));
//     }
//     event.chipInput!.clear();
//   }
//   removeIngredient(index: number) {
//     const ingredientsArray = this.editForm.get('ingredients') as FormArray;
//     ingredientsArray.removeAt(index);
//     console.log('Ingrediente eliminado:', this.editForm.value.ingredients);
//   }
//   removeAllergen(index: number) {
//     const allergensArray = this.editForm.get('allergens') as FormArray;
//     allergensArray.removeAt(index);
//   }
//   removeChip(index: number, type: string) {
//     const formArray = type === 'ingredients' ? 'ingredients' : 'allergens';
//     (this.editForm.get(formArray) as FormArray).removeAt(index);
//   }
//   removeImage(index: number): void {
//     this.product.images.splice(index, 1);
//     console.log(index);
//     this.updateProduct(this.product);
//   }
//   removeSelectedImage(selectedImage: File): void {
//     const index = this.selectedImages.indexOf(selectedImage);
//     if (index !== -1) {
//       this.selectedImages.splice(index, 1);
//     }
//   }

//   toggleStatus(): void {
//     const statusControl = this.editForm.get('status');
//     if (statusControl) {
//       const currentStatus = statusControl.value;
//       statusControl.setValue(!currentStatus); // Cambiar el valor del checkbox
//     }
//   }
//   editIngredient(index: number, event: MatChipEditedEvent): void {
//     const value = event.value.trim();
//     if (!value) {
//       this.removeIngredient(index);
//       return;
//     }
//     const ingredientsArray = this.editForm.get('ingredients') as FormArray;
//     ingredientsArray.at(index).setValue(value);
//   }
//   editAllergens(index: number, event: MatChipEditedEvent): void {
//     const value = event.value.trim();
//     if (!value) {
//       // Remove ingredient if it no longer has a name
//       this.removeAllergen(index);
//       return;
//     }

//     const AllergensArray = this.editForm.get('allergens') as FormArray;
//     AllergensArray.at(index).setValue(value);
//   }

//   ngAfterViewInit() {
//     this.el.nativeElement.focus();
//   }
//   closeDialog(): void {
//     this.dialogRef.close();
//     this.editForm.reset(); // Reinicializa el formulario
//   }
// }
