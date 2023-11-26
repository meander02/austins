// import { Component, Inject, ElementRef } from '@angular/core';
import { Product } from '../../../models/Product.models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from '../../services/rest.service';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../../models/Category.models';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit-product-component',
  templateUrl: './edit-product-component.component.html',
  styleUrls: ['./edit-product-component.component.scss'],
})
export class EditProductComponentComponent {
  editForm: FormGroup;
  product: Product;
  productImage: File | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  chips: any[] = []; // Puedes ajustar el tipo según la estructura real de tus datos
  productImages: any[] = []; // Agrega una propiedad para almacenar las imágenes
  // Property to store selected images
  selectedImages: File[] = [];
  imagenPrevia: any;
  files: any = [];
  loading: boolean | undefined;
  categories: Categoria[] = [];


  constructor(
    private dialogRef: MatDialogRef<EditProductComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    private rest: RestService,
    private categoryService: CategoryService,
    private productService: ProductService // Inyecta el servicio de productos
  ) {
    this.product = data.product; // Obtiene el producto a editar de los datos pasados
    // this.categories = data.categories; // Obtiene el producto a editar de los datos pasados
    this.categories = []; // Puedes inicializarlo aquí o en el constructor según tus necesidades

    // Inicializa el formulario con los datos del producto
    this.editForm = this.fb.group({
      name: [this.product.name, Validators.required],
      sku: [this.product.sku, Validators.required],
      description: [this.product.description, Validators.required],
      unit: [this.product.unit, Validators.required],
      price: [this.product.price, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      category: [this.product.category, Validators.required],
      maker: [this.product.maker, Validators.required],
      status: [this.product.status === 'ACTIVE', Validators.required], // Cambiado para reflejar el estado activo/inactivo con un checkbox
      // Inicializa los campos relacionados con ingredientes y alérgenos
      ingredients: this.fb.array(this.product.ingredients || []),
      allergens: this.fb.array(this.product.allergens || []),
      model: [this.product.model, Validators.required],
      expiration: [this.product.expiration, Validators.required],
      weight: [this.product.weight, Validators.required],
      nutritionalInformation: [
        this.product.nutritionalInformation,
        Validators.required,
      ],
      isFeatured: [this.product.isFeatured, Validators.required],
      isVegetarian: [this.product.isVegetarian, Validators.required],
      isGlutenFree: [this.product.isGlutenFree, Validators.required],
      images: this.fb.array(this.product.images || []),
      // images: this.fb.array(this.product.images || []),
//
    });
    this.loadCategories(); // Llamada a loadCategories() aquí

    // Agrega formControls para ingredientes y alérgenos
    this.editForm.addControl('ingredientsInput', this.fb.control(''));
    this.editForm.addControl('allergensInput', this.fb.control(''));
  }

  getIngredientsArray(): string[] {
    const ingredientsControl = this.editForm.get('ingredients');
    return ingredientsControl ? ingredientsControl.value : [];
  }

  getAllergensArray(): string[] {
    const allergensControl = this.editForm.get('allergens');
    return allergensControl ? allergensControl.value : [];
  }
  // Añade estas funciones para acceder a los valores de los controles de manera segura
  getIngredientsInputValue(): string {
    const ingredientsInputControl = this.editForm.get('ingredientsInput');
    return ingredientsInputControl ? ingredientsInputControl.value : '';
  }

  getAllergensInputValue(): string {
    const allergensInputControl = this.editForm.get('allergensInput');
    return allergensInputControl ? allergensInputControl.value : '';
  }
  // Método para manejar la adición de ingredientes
  agregarIngrediente() {
    const ingredientsArray = this.editForm.get('ingredients') as FormArray;
    ingredientsArray.push(this.fb.control('Nuevo ingrediente'));
    console.log('Ingrediente agregado:', this.editForm.value.ingredients);
  }

  removeIngredient(index: number) {
    const ingredientsArray = this.editForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
    console.log('Ingrediente eliminado:', this.editForm.value.ingredients);
  }

  // Repite un proceso similar para los métodos relacionados con alérgenos y chips.

  // Método para manejar la eliminación de alérgenos
  removeAllergen(index: number) {
    const allergensArray = this.editForm.get('allergens') as FormArray;
    allergensArray.removeAt(index);
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      // Obtiene los valores editados del formulario
      const editedProduct: Product = {
        ...this.data.product, // Conserva los valores no editados
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        unit: this.editForm.value.unit,
        expiration: this.editForm.value.expiration,
        model: this.product.model,
        quantity: this.editForm.value.quantity,
        price: this.editForm.value.price,
        category: this.editForm.value.category,
        maker: this.editForm.value.maker,
        images: this.product.images,
        status: this.editForm.value.status ? 'ACTIVE' : 'INACTIVE',
        weight: this.editForm.value.weight,
        ingredients: this.getIngredientsArray(),
        allergens: this.getAllergensArray(),
        nutritionalInformation: this.editForm.value.nutritionalInformation,
        isFeatured: this.editForm.value.isFeatured,
        isVegetarian: this.editForm.value.isVegetarian,
        isGlutenFree: this.editForm.value.isGlutenFree,
        // Agrega otros campos editados aquí
      };
      if (this.productImage) {
        // Llama al servicio correspondiente para subir la nueva imagen y obtiene la URL
        // Sustituye 'productService' por el servicio que utilizas para cargar imágenes
        const productId = this.editForm.value._id; // Asegúrate de que el nombre del campo sea correcto
        const formData = new FormData();
        formData.append('file', this.productImage);

        this.productService
          .uploadImage(formData,productId)
          .subscribe((imageURL: any) => {
            editedProduct.images.push(imageURL); // Agrega la nueva URL de la imagen al producto
            this.updateProduct(editedProduct); // Llama a la función para actualizar el producto
            // this.uploadImagesAndAddToForm();
            this.uploadImagesAndAddToForm(editedProduct);
          });
      } else {
        this.updateProduct(editedProduct); // Llama a la función para actualizar el producto sin cambiar la imagen
        // this.uploadImagesAndAddToForm(); // Upload images and add their URLs to the form
        this.uploadImagesAndAddToForm(editedProduct);
      }
    }
  }

  // Función para actualizar el producto
  private updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (updatedProduct: Product) => {
        this.productImages = updatedProduct.images;

        // Manejar la respuesta actualizada, por ejemplo, mostrar un mensaje de éxito.
        console.log('Producto actualizado con éxito', updatedProduct);
        this.dialogRef.close(updatedProduct); // Cierra el modal y pasa los datos editados de vuelta a la vista principal
      },
      (error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error.
        console.error('Error al actualizar el producto', error);
      }
    );
  }



  toggleStatus(): void {
    const statusControl = this.editForm.get('status');
    if (statusControl) {
      const currentStatus = statusControl.value;
      statusControl.setValue(!currentStatus); // Cambiar el valor del checkbox
    }
  }

  // Método para manejar la adición de chips (ingredientes o alérgenos)
  addChip(event: MatChipInputEvent, controlName: string): void {
    const value = (event.value || '').trim();
    if (value) {
      const control = this.editForm.get(controlName) as FormArray;
      control.push(this.fb.control(value));
    }

    event.chipInput!.clear();
  }
  // En tu componente, en el método removeChip
  removeChip(index: number, type: string) {
    const formArray = type === 'ingredients' ? 'ingredients' : 'allergens';
    (this.editForm.get(formArray) as FormArray).removeAt(index);
  }

  editIngredient(index: number, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      // Remove ingredient if it no longer has a name
      this.removeIngredient(index);
      return;
    }

    const ingredientsArray = this.editForm.get('ingredients') as FormArray;
    ingredientsArray.at(index).setValue(value);
  }
  editAllergens(index: number, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      // Remove ingredient if it no longer has a name
      this.removeAllergen(index);
      return;
    }

    const AllergensArray = this.editForm.get('allergens') as FormArray;
    AllergensArray.at(index).setValue(value);
  }
  // Agrega esta función para subir la imagen y actualizar el formulario

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
  closeDialog(): void {
    this.dialogRef.close();
    this.editForm.reset(); // Reinicializa el formulario
  }

  // Método para manejar la edición de imágenes
  // Función para manejar la selección de imagen
  getImages(url: string): string {
    return `${environment.api}/${url}`;
  }
  removeImage(index: number): void {
    this.product.images.splice(index, 1);
  }
  removeSelectedImage(selectedImage: File): void {
    const index = this.selectedImages.indexOf(selectedImage);
    if (index !== -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.productImages = Array.from(input.files).map((image: File) => ({
        name: image.name,
        url: URL.createObjectURL(image),
      }));

      // Limpiar la propiedad 'images' antes de agregar las nuevas imágenes
      const imagesControl = this.editForm.get('image') as FormArray;
      imagesControl.clear();

      // Agregar las nuevas imágenes al FormArray
      this.productImages.forEach((image) => {
        imagesControl.push(this.fb.control(image.url));
      });
    }
  }
  uploadImagesAndAddToForm(product: Product): void {
    const uploadObservables = this.selectedImages.map((image: File) => {
      const formData = new FormData();
      // formData.append('file', image, image.name);
      formData.append('file', this.editForm.get('image')?.value);


      // Display the selected image before uploading
      this.productImages.push({ name: image.name, url: URL.createObjectURL(image) });

      // Ensure that productId is correctly passed
      const productId = this.product._id;

      // Pass the form data to the uploadImage function
      return this.productService.uploadImage(formData, productId);
    });

    forkJoin(uploadObservables).subscribe(
      (imageURLs: any) => {
        // Concatenate the new image URLs to the existing ones
        product.images = product.images.concat(imageURLs);

        // Update the control of images in the form with the updated URLs
        this.editForm.get('image')?.setValue(product.images);

        // Clear the selected images after uploading
        this.selectedImages = [];
      },
      (error) => {
        console.error('Error uploading images:', error);

        // Print more detailed information about the error
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          console.error('Message:', error.error);
        }
      }
    );
  }


  // Load images function
  loadImages = () => {
    try {
      this.loading = true;
      const uploadObservables = this.selectedImages.map((item: File) => {
        const formData = new FormData();
        formData.append('files', item, item.name);
        return this.productService.uploadImage(formData,this.editForm.value._id);
      });

      forkJoin(uploadObservables).subscribe(
        (imageURLs: any) => {
          this.loading = false;
          this.editForm.get('images')?.setValue(imageURLs);
          this.updateProduct(this.editForm.value);
        },
        (error) => {
          console.error('Error al cargar imágenes:', error);
          this.loading = false;
        }
      );
    } catch (e) {
      console.log('ERROR', e);
    }
  };



  loadCategories() {
    this.categoryService.getAllCategories()
      .subscribe(
        (data: Categoria[]) => {
          this.categories = data;
        },
        error => {
          console.error('Error al cargar las categorías:', error);
        }
      );
  }


}
