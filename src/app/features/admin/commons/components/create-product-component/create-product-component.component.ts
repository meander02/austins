import { Product } from '../../../models/Product.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from '../../services/rest.service';

import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IproductResponse } from '../../../interfaces/Product.interface';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../../models/Category.models';
@Component({
  selector: 'app-create-product-component',
  templateUrl: './create-product-component.component.html',
  styleUrls: ['./create-product-component.component.scss'],
})
export class CreateProductComponentComponent implements OnInit {
  createForm: FormGroup;
  loading = false;

  separatorKeysCodes: number[] = []; // Asegúrate de tener la definición correcta para 'separatorKeysCodes'
  product: any = {}; // Asegúrate de tener la definición correcta para 'product'
  selectedImages: any[] = []; // Asegúrate de tener la definición correcta para 'selectedImages'
  productImages: any[] = []; // Asegúrate de tener la definición correcta para 'productImages'
  categories: Categoria[] = [];

  constructor(

    private dialogRef: MatDialogRef<CreateProductComponentComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      // Definir todos los campos del formulario aquí
      name: [''],
      sku: [''],
      description: [''],
      unit: [''],
      expiration: [''],
      model: [''],
      quantity: [''],
      price: [''],
      category: [''],
      maker: [''],
      nutritionalInformation: [''],
      weight: [''],
      isFeatured: [false],
      isVegetarian: [false],
      isGlutenFree: [false], // Add this line
      ingredientsInput: [''], // Add this line
      allergensInput: [''], // Add this line
      status: [false], // Add this line
      // ... otros campos ...
    });


    this.loadCategories();
  }

  ngOnInit(): void {
    // Puedes inicializar cosas aquí si es necesario
    this.createForm = this.fb.group({
      name: [''],
      sku: [''],
      description: [''],
      unit: [''],
      expiration: [''],
      model: [''],
      quantity: [''],
      price: [''],
      category: [''],
      maker: [''],
      nutritionalInformation: [''],
      weight: [''],
      isFeatured: [false],
      isVegetarian: [false],
      isGlutenFree: [false], // Add this line
      ingredientsInput: [''], // Add this line
      allergensInput: [''], // Add this line
      status: [false], // Add this line
      // ... otros campos ...
    });
  }

  createProduct(): void {
    if (this.createForm.valid) {
      // Evitar múltiples clics mientras está en progreso
      if (this.loading) {
        return;
      }

      this.loading = true;
      const newProduct: Product = {
        name: this.createForm.value.name,
        description: this.createForm.value.description,
        unit: this.createForm.value.unit,
        expiration: this.createForm.value.expiration,
        model: this.product.model,
        quantity: this.createForm.value.quantity,
        price: this.createForm.value.price,
        category: this.createForm.value.category,
        maker: this.createForm.value.maker,
        images: this.product.images,
        status: this.createForm.value.status ? 'ACTIVE' : 'INACTIVE',
        weight: this.createForm.value.weight,
        ingredients: this.getIngredientsArray(),
        allergens: this.getAllergensArray(),
        nutritionalInformation: this.createForm.value.nutritionalInformation,
        isFeatured: this.createForm.value.isFeatured,
        isVegetarian: this.createForm.value.isVegetarian,
        isGlutenFree: this.createForm.value.isGlutenFree,
        _id: '',
        sku: this.createForm.value.sku,
        getNameUpperCase: function (name: string): string {
          throw new Error('Function not implemented.');
        }
      };

      // Llamar al servicio para crear el producto
      this.productService.createProduct(newProduct).subscribe(
        (result: IproductResponse) => {
          // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje de éxito
          this.snackBar.open('Producto creado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin/products-list']); // Redirigir a la vista de productos después de crear
        },
        (error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje de error
          this.snackBar.open('Error al crear el producto', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al crear el producto', error);
        },
        () => {
          this.loading = false; // Marcar la carga como completa, independientemente del resultado
        }
      );
    } else {

    }
  }


  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    // Filtra solo los archivos de imagen
    const imageFiles = Array.from(input.files).filter(file => file.type.startsWith('image/'));

    if (imageFiles.length > 0) {
      // Actualiza la lista de imágenes seleccionadas
      this.selectedImages = imageFiles;

      // Muestra las imágenes seleccionadas en la vista previa
      if (this.productImages) {
        this.productImages = this.selectedImages.map((image: File) => ({
          name: image.name,
          url: URL.createObjectURL(image),
        }));
      } else {
        this.productImages = [];
      }

      console.log(this.productImages);
    } else {
      // Manejar el caso en el que no se seleccionaron imágenes válidas
      console.warn('No se seleccionaron imágenes válidas.');
    }
  }

  uploadImagesAndAddToForm(product: Product): void {
    const uploadObservables = this.selectedImages.map((image: File) => {
      const formData = new FormData();
      formData.append('file', image);
      console.log('FormData:', formData);  // Agrega este registro de depuración


      // formData.append('file', image, image.name);
      // formData.append('file', this.createForm.get('image')?.value);
      // formData.append('file', this.uploadForm.get('profile').value);


      // Display the selected image before uploading
      this.productImages.push({ name: image.name, url: URL.createObjectURL(image) });

      // Ensure that productId is correctly passed
      // const productId = this.product._id;
      const productId = this.product._id;
      console.log('Product ID:', productId);  // Agrega este registro de depuración


      // Pass the form data to the uploadImage function
      // return this.productService.uploadImage(formData, productId);
    });

    forkJoin(uploadObservables).subscribe(
      (imageURLs: any) => {
        // Concatenate the new image URLs to the existing ones
        product.images = product.images.concat(imageURLs);

        // Update the control of images in the form with the updated URLs
        this.createForm.get('image')?.setValue(product.images);
        console.log( product.images )
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











  removeSelectedImage(image: File) {
    // Lógica para eliminar una imagen seleccionada
  }


  getImages(image: any) {
    // Lógica para obtener la URL de la imagen
    return image.url;
  }

  removeImage(index: number) {
    // Lógica para eliminar una imagen
  }

  // Agrega más métodos según sea necesario

  getIngredientsArray() {
    // Lógica para obtener el array de ingredientes
    return [];
  }

  getAllergensArray() {
    // Lógica para obtener el array de alérgenos
    return [];
  }

  removeChip(index: number, type: string) {
    // Lógica para eliminar un chip (ingrediente o alérgeno)
  }

  editIngredient(index: number, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      // Remove ingredient if it no longer has a name
      this.removeIngredient(index);
      return;
    }
  }

  removeIngredient(index: number) {
    // const ingredientsArray = this.editForm.get('ingredients') as FormArray;
    // ingredientsArray.removeAt(index);
    // console.log('Ingrediente eliminado:', this.editForm.value.ingredients);
  }

  editAllergens(index: number, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      // Remove ingredient if it no longer has a name
      this.removeAllergen(index);
      return;
    }
  }
  // Método para manejar la eliminación de alérgenos
  removeAllergen(index: number) {
    // const allergensArray = this.editForm.get('allergens') as FormArray;
    // allergensArray.removeAt(index);
  }
  addChip(event: MatChipInputEvent, type: string) {
    // Lógica para agregar un chip (ingrediente o alérgeno)
  }






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
