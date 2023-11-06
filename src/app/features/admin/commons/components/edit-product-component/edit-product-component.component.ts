import { Component, Inject } from '@angular/core';
import { Product } from '../../../models/Product.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product-component',
  templateUrl: './edit-product-component.component.html',
  styleUrls: ['./edit-product-component.component.scss'],
})
export class EditProductComponentComponent {
  editForm: FormGroup;
  product: Product;
  productImage: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<EditProductComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService // Inyecta el servicio de productos
  ) {
    this.product = data.product; // Obtiene el producto a editar de los datos pasados

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
      expiration: [this.product.expiration, Validators.required],
      weight: [this.product.weight, Validators.required],
      nutritionalInformation: [
        this.product.nutritionalInformation,
        Validators.required,
      ],
      isFeatured: [this.product.isFeatured, Validators.required],
      isVegetarian: [this.product.isVegetarian, Validators.required],
      isGlutenFree: [this.product.isGlutenFree, Validators.required],
    });
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      // Obtiene los valores editados del formulario
      const product = new Product();
      const editedProductName: string = product.getNameUpperCase(
        this.editForm.value.name
      );
      const editedProduct: Product = {
        ...this.data.product, // Conserva los valores no editados
        name: this.editForm.value.name,
        //   description: this.editForm.value.description,
        unit: this.editForm.value.unit,
        expiration: this.editForm.value.expiration,
        model: this.product.model,
        quantity: this.editForm.value.quantity,
        price: this.editForm.value.price,
        category: this.editForm.value.category,
        maker: this.editForm.value.maker,
        images: this.product.images,
        status: this.product.status,
        weight: this.editForm.value.weight,
        ingredients: this.product.ingredients,
        allergens: this.product.allergens,
        nutritionalInformation: this.editForm.value.nutritionalInformation,
        isFeatured: this.editForm.value.isFeatured,
        isVegetarian: this.editForm.value.isVegetarian,
        isGlutenFree: this.editForm.value.isGlutenFree,
        // Agrega otros campos editados aquí
      };

      // Lógica para actualizar la imagen (si se cambió)
      if (this.productImage) {
        // Llama al servicio correspondiente para subir la nueva imagen y obtiene la URL
        // Sustituye 'productService' por el servicio que utilizas para cargar imágenes
        this.productService
          .uploadImage(this.productImage)
          .subscribe((imageURL: string) => {
            editedProduct.images.push(imageURL); // Agrega la nueva URL de la imagen al producto
            this.updateProduct(editedProduct); // Llama a la función para actualizar el producto
          });
      } else {
        this.updateProduct(editedProduct); // Llama a la función para actualizar el producto sin cambiar la imagen
      }
    }
  }

  // Función para cerrar el modal
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Función para manejar la selección de imagen
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.productImage = input.files[0];
    }
  }
  // Función para actualizar el producto
  private updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (updatedProduct: Product) => {
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
}
