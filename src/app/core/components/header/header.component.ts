import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
import { NavigationEnd, Router } from '@angular/router';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SearchService } from 'src/app/shared/services/search-service.service';
import { ActivatedRoute } from '@angular/router';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SignInView } from 'src/app/features/auth/views/sign-in/sign-in.view';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { Sidebar } from 'primeng/sidebar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StorageService } from '../../services/storage.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/features/admin/models/Product.models';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    './header.component0.scss',
    './head02.scss',
    './head03.scss',
    './head04.scss',
    './head05.scss',
    './carrito.scss',
    './header.component02.scss',
  ],
  styles: [
    `
      :host {
        @keyframes slidedown-icon {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(20px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .slidedown-icon {
          animation: slidedown-icon;
          animation-duration: 3s;
          animation-iteration-count: infinite;
        }

        .box {
          background-image: radial-gradient(
            var(--primary-300),
            var(--primary-600)
          );
          border-radius: 50% !important;
          color: var(--primary-color-text);
        }
      }
    `,
  ],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  isHeaderScrolled = false;
  searchQuery: string = '';
  badge: number = 0;
  currentRoute!: string;
  isMobileMenuOpen: boolean = false;
  // carData: CartItem[] = []; // Aquí asignamos el array de elementos del carrito
  @Input() carData: CartItem[] = []; // Recibe los datos del carrito desde el componente padre
  @Input() product!: Product;
  visible: boolean = false;

  // sidebarVisible: boolean = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }
  ref: DynamicDialogRef | undefined;

  sidebarVisible: boolean = false;
  sidebarVisible2: boolean = false;
  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    private searchService: SearchService,
    private cartService: CartService,
    // private cartService: CartService,
    private router: Router,
    private userStateService: UserStateService,
    private AuthStateService: AuthStateService,
    private sessionService: SessionService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.currentRoute = event.url;
      }
    });
    this.cartService.itemsInCart.subscribe((value) => {
      this.badge = value;
    });
  }

  ngOnInit(): void {
    const userData = this.sessionService.getUserData();
    // const carData = this.storageService.getCarrito();
    // this.carData = this.storageService.getCarrito();

    console.log(this.carData);
    console.log(this.sidebarVisible2);
    if (userData) {
      this.userName = userData.name;
      // console.log( userData)
    }
    this.cartService.itemsInCart.subscribe((value) => {
      this.badge = value;
    });

    // Obtener los datos del carrito desde algún servicio o almacenamiento local
    const carDataFromStorage = this.storageService.getCarrito();

    // Asignar los datos del carrito al arreglo carData
    if (carDataFromStorage) {
      this.carData = carDataFromStorage;
    }

    console.log('Datos del carrito:', this.carData);
    const isAuthenticated = this.sessionService.isAutenticated();
  }
  logout(): void {
    // Elimina el token de autenticación del almacenamiento local
    // this.sessionService.removeToken(); // Si ya tienes un método removeToken en tu servicio, úsalo
    localStorage.removeItem('token'); // O elimina directamente el token del almacenamiento local aquí

    // Navega a la ruta principal ('/')
    this.router.navigate(['/']).then(() => {
      // Recarga la página después de navegar a la ruta principal
      window.location.reload();
    });
  }
  onSearchChange(query: string) {
    // Llama al servicio para establecer la consulta de búsqueda en tiempo real.
    this.searchService.setSearchQuery(query);
  }

  search(): void {
    if (this.searchQuery) {
      // Llama al servicio para establecer la consulta de búsqueda.
      this.searchService.setSearchQuery(this.searchQuery);
    }
  }
  get shouldShowHeader(): boolean {
    return (
      !this.AuthStateService.getisAuthS() &&
      !this.userStateService.getIsAdminSection()
    );
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false;
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
  }

  redirectTo_adm(route: string): void {
    // this.sidebarVisible = false;
    this.router.navigate(['/admin', route]); // Utiliza la navegación de Angular
  }
  redirectTo_Auth(route: string): void {
    // this.sidebarVisible = false;
    this.router.navigate(['/auth', route]); // Utiliza la navegación de Angular
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (this.isMobileMenuOpen) {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    }
    console.log(this.isMobileMenuOpen);
  }
  // sidebarVisible() :void {

  // }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.isHeaderScrolled = true;
    } else {
      this.isHeaderScrolled = false;
    }
  }

  get isAdminSection(): boolean {
    return this.userStateService.getIsAdminSection();
  }

  goToCart(): void {
    const carDataFromStorage = this.storageService.getCarrito();

    // Asignar los datos del carrito al arreglo carData
    if (carDataFromStorage) {
      this.carData = carDataFromStorage;
    }

    console.log('Datos del carrito:', this.carData);
    this.sidebarVisible2 = true;
    // debugger
    // this.router.navigateByUrl('/payment/cart');
  }
  closeToCart(): void {
    const carDataFromStorage = this.storageService.getCarrito();

    // Asignar los datos del carrito al arreglo carData
    if (carDataFromStorage) {
      this.carData = carDataFromStorage;
    }

    // console.log('Datos del carrito:', this.carData);
    this.sidebarVisible2 = false;
    // debugger
    // this.router.navigateByUrl('/payment/cart');
  }

  isRUTA_DISTINTE_ahome(): boolean {
    // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // Llamamos a la función que manejará la visibilidad de la sección de filtros
        this.handleFilterSectionVisibility();
      }
    });

    // Ahora verifica si la ruta actual es '/portal/home'
    return (
      this.currentRoute === '/portal/home' ||
      this.currentRoute === '/auth/sign-up'
    );
  }

  // Nueva función para manejar la visibilidad de la sección de filtros
  private handleFilterSectionVisibility(): void {
    // Obtenemos la referencia del elemento de la sección de filtros
    const filterSection = document.querySelector('.filter-section');

    // Verificamos si existe el elemento y si la ruta actual es diferente de '/portal/home'
    if (filterSection && this.currentRoute !== '/portal/home') {
      // Añadimos la clase is-detail-route si la ruta no es '/portal/home'
      filterSection.classList.add('is-detail-route');
    } else {
      // Quitamos la clase is-detail-route si la ruta es '/portal/home'
      filterSection?.classList.remove('is-detail-route');
    }
  }

  //   showDialog() {
  //     this.visible = true;
  // }

  showDialog() {
    this.visible = true;
  }


  openSignInModal(): void {
    this.sidebarVisible = false;
    const isMobile = window.innerWidth < 480;

    this.ref = this.dialogService.open(SignInView, {
      height: isMobile ? 'auto' : 'auto',
      style: {
        'max-width': isMobile ? '110vw' : 'auto',
        'max-height': isMobile ? 'auto' : '100vh',
        padding: '0', // Aquí estableces el padding a 0
      },
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '100vw',
      },
 
      data: {},
    });
  }

  // get cartItem(): CartItem {
  //   return this.cartItem();
  // }

  // // carrito

  // add(): void {
  //   this.cartService.add(this.cartService);
  // }
  get cartItem(): CartItem {
    return this.setCartItem();
  }
  setCartItem(): CartItem {
    console.log('set car', this.product);
    const cartItem: CartItem = {
      id: this.product._id,
      name: this.product.name,
      precio: this.product.price,
      cantidad: 1,
      image: this.product.images,
    };
    return cartItem;
  }

  incrementQuantity(item: CartItem): void {
    this.cartService.add(item);
    item.cantidad++; // Incrementa la cantidad del artículo en el carrito
  }
  decrementQuantity(item: CartItem): void {
    // Decrementa la cantidad del artículo en el carrito si es mayor que 1
    if (item.cantidad > 1) {
      item.cantidad--;
    }
    
    // Luego, puedes llamar al servicio para actualizar el carrito, si es necesario
    this.cartService.decre(item);
  }
  confirm2(event: Event, item: CartItem) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de que quieres eliminar este elemento?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {

        this.messageService.add({
          severity: 'error',
          summary: 'Eliminado',
          detail: `El producto "${item.name}" ha sido eliminado del carrito`,
          life: 3000,
        });
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        console.log(item)
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        this.removeItem(item);

      },
      reject: () => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Rechazado',
        //   detail: 'La eliminación del producto ha sido cancelada',
        //   life: 3000,
        // });

        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      },
    });
  }

  // removeItem(item: CartItem): void {
  //   // Elimina el artículo del carrito
  //   const index = this.carData.indexOf(item);
  //   console.log("Index:", index);
  //   if (index !== -1) {
  //     this.carData.splice(index, 1);
  //   }
  //   // Luego, puedes llamar al servicio para actualizar el carrito
  //   this.cartService.remove(item);
  // }
  removeItem(item: CartItem): void {
    // Actualiza el carrito para reflejar los cambios en this.carData
    this.carData = this.carData.slice();
    
    // Elimina el artículo del carrito
    const index = this.carData.indexOf(item);
    if (index !== -1) {
      this.carData.splice(index, 1);
    }
  
    // Luego, puedes llamar al servicio para actualizar el carrito
    this.cartService.remove(item);
  }
  
  // removeItem(item: CartItem): void {
  //   // Elimina el artículo del carrito
  //   const index = this.carData.indexOf(item);
  //   if (index !== -1) {
  //     this.carData.splice(index, 1);
  //   }
  //   // Luego, puedes llamar al servicio para actualizar el carrito
  //   this.cartService.remove(item);
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Eliminado',
  //     detail: 'Artículo eliminado del carrito',
  //     life: 3000,
  //   });
  // }

  getTotalAmount(): number {
    return this.carData.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    ); // Calcula el importe total del carrito
  }

  finishPurchase(): void {
    // Lógica para finalizar la compra
  }

  closeSidebar(): void {
    // Lógica para cerrar la barra lateral y continuar comprando
  }
}
