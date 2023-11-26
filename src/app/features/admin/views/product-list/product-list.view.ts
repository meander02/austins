import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product.models';
import { ProductService } from '../../commons/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { OpenDeleteConfirmationComponent } from '../../commons/components/open-delete-confirmation/open-delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponentComponent } from '../../commons/components/edit-product-component/edit-product-component.component';
import { CreateProductComponentComponent } from '../../commons/components/create-product-component/create-product-component.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.view.html',
  styleUrls: ['./product-list.view.scss'],
})
export class ProductListView implements OnInit {
  products: Product[] = [];
  producto: Product;
  displayedColumns: string[] = [
    'name',
    'image',
    'price',
    'weight',
    'category',
    'status',
    'actions',
  ];
  pageSizeOptions: number[] = [3, 10, 25];
  pageIndex: number = 0;
  pageSize: number = 3;
  totalProducts: number = 0;
  searchForm: FormGroup;
  @Input()
  images!: string[];
  srcMain!: string;
  // formGroup: FormGroup;  // Declaración de la propiedad formGroup

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.producto = new Product();

    this.searchForm = this.fb.group({
      query: [''],
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.searchProducts();
      });
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  loadProducts(): void {
    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    const filters = {
      name: this.searchForm.value.query,
      // Otros campos de filtrado que recolectes de la vista
      priceMin: this.searchForm.value.priceMin,
      priceMax: this.searchForm.value.priceMax,
      category: this.searchForm.value.category,
      maker: this.searchForm.value.maker,
    };

    this.productService
      .getProducts(skip, limit, filters)
      .subscribe((data: Product[]) => {
        this.products = data;
      });
    // this.srcMain = this.getImages(this.images[0]);
  }

  searchProducts(): void {
    this.loadProducts();
  }
  getImages(url: string): string {
    return `${environment.api}/${url}`;
  }

  // Nueva función para eliminar un producto
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      (result: { id: string }) => {
        // Manejar la respuesta de eliminación, por ejemplo, mostrar un mensaje de éxito.
        console.log('Producto eliminado con éxito', result);
        // Después de eliminar, puedes cargar nuevamente la lista de productos si lo deseas.
        this.loadProducts();
      },
      (error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error.
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  openDeleteConfirmation(product: Product): void {
    const dialogRef = this.dialog.open(OpenDeleteConfirmationComponent, {
      data: { product }, // Pasa el producto al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // Lógica para eliminar el producto aquí
        this.deleteProduct(product._id);
      }
    });
  }
  // Nueva función para abrir el modal de edición
  openEditModal(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponentComponent, {
      width: '800px', // Ancho del diálogo
      height: '400px', // Altura del diálogo
      data: { product }, // Pasa el producto al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para manejar la actualización del producto aquí
        this.updateProduct(result); // Llama a la función de actualización con los datos editados
      }
    });
  }

  // Función para actualizar un producto
  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (updatedProduct: Product) => {
        // Manejar la respuesta actualizada, por ejemplo, mostrar un mensaje de éxito.
        console.log('Producto actualizado con éxito', updatedProduct);

        // Actualiza la lista de productos después de la edición
        this.loadProducts();
      },
      (error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error.
        console.error('Error al actualizar el producto', error);
      }
    );
  }



  openCreateModal(){
    const dialogRef = this.dialog.open(CreateProductComponentComponent, {
      width: '800px', // Ancho del diálogo
      height: '400px', // Altura del diálogo
      // data: { product }, // Pasa el producto al modal
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     // Lógica para manejar la actualización del producto aquí
    //     this.updateProduct(result); // Llama a la función de actualización con los datos editados
    //   }
    // });
  }
}
