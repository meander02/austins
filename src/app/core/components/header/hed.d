<div class="policy-header">
  <div class="logo-container">
    <img
      src="https://static.wixstatic.com/media/64de7c_29f387abde884a1e8f9df17220933df6~mv2.png/v1/fill/w_834,h_221,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/64de7c_29f387abde884a1e8f9df17220933df6~mv2.png"
      alt="Logo de Tu Empresa"
    />
  </div>
  <div class="button-container-mobile">
    <button class="mobile-menu-btn" (click)="toggleMobileMenu()">☰</button>
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-item" (click)="redirectTo('home')">Home</div>
      <div class="mobile-menu-item" (click)="redirectTo('seee1')">seee1</div>
      <div class="mobile-menu-item" (click)="redirectTo('seee2')">seee2</div>
      <div class="mobile-menu-item" (click)="redirectTo('seee3')">seee3</div>
    </div>
  </div>
  <div class="button-container-pc">
    <button class="menu-btn" (click)="redirectTo('home')">Home</button>
    <button class="menu-btn" (click)="redirectTo('seee1')">seee1</button>
    <button class="menu-btn" (click)="redirectTo('seee2')">seee2</button>
    <button class="menu-btn" (click)="redirectTo('seee3')">seee3</button>
  </div>
</div>






















/* Estilos generales para el componente */
.policy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Estilos para el contenedor del logotipo */
.logo-container {
  flex: 1;
  text-align: center;
  margin-right: 20px;
}

.logo-container img {
  max-width: 100%;
}

/* Estilos para el botón de hamburguesa en dispositivos móviles */
.mobile-menu-btn {
  display: none;
  background-color: transparent;
  color: #333;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
}
/* Estilos para el botón de hamburguesa en dispositivos móviles */
.mobile-menu-btn {
  display: none;
  background-color: transparent;
  color: #333;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
}

/* Estilos para dispositivos móviles (pantallas de hasta 768px de ancho) */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  .button-container-pc {
    display: none; /* Oculta el contenedor de PC en dispositivos móviles */
  }
}

/* Estilos para el botón de menú en pantallas de PC */
.menu-btn {
  background-color: transparent;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

/* Estilos para pantallas de PC (ancho mínimo de 769px) */
@media (min-width: 769px) {
  .button-container-mobile {
    display: none; /* Oculta el contenedor de dispositivos móviles en pantallas de PC */
  }
}


