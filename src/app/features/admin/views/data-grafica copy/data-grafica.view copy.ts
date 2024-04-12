// import { Component, OnInit } from '@angular/core'
// // import { LinearRegression } from 'js-regression';
// import * as regression from 'regression'
// // import { DataPoint } from 'regression';
// import { linear } from 'regression'

// interface VentasPorFecha {
//   [fecha: string]: number
// }
// // interface DataPoint {
// //   x: number
// //   y: number
// // }

// interface DataPoint {
//   x: number
//   y: number
// }
// @Component({
//   selector: 'app-data-grafica',
//   templateUrl: './data-grafica.view.html',
//   styleUrls: ['./data-grafica.view.scss'],
// })
// export class DataGraficaView implements OnInit {
//   ventas: {
//     categoria: string
//     sabor: string
//     cantidad: number
//     fecha: string
//   }[] = []
//   ventasPorDia: {
//     fecha: string
//     pasteles: { categoria: string; cantidad: number }[]
//   }[] = []
//   dataPorDia: any
//   options: any

//   options3 = {
//     title: {
//         display: true,
//         text: 'Predicción de Ventas Futuras',
//         fontSize: 16
//     },
//     legend: {
//         display: true,
//         position: 'bottom'
//     },
//     scales: {
//         xAxes: [{
//             type: 'time',
//             time: {
//                 unit: 'day'
//             },
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Fecha'
//             }
//         }],
//         yAxes: [{
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Ventas'
//             }
//         }]
//     }
// };

//   dataPorCategoria: any
//   dataTodasVentas: any
//   // dataPrediccion: any
//   dataPrediccion: any = {
//     labels: [], // Etiquetas de las fechas
//     datasets: [
//       {
//         label: 'Predicción de Ventas Futuras',
//         data: [], // Datos de predicción de ventas
//         fill: false, // No rellenar el área bajo la línea
//         borderColor: '#FF5722', // Color de la línea
//         borderWidth: 2, // Ancho de la línea
//       },
//     ],
//   }
//   // dataPrediccion: any;
//   predecirVentasFuturas(): void {
//     const ventasPorFecha: VentasPorFecha = {}

//     // Llenar ventasPorFecha
//     this.ventas.forEach((venta) => {
//       if (!ventasPorFecha[venta.fecha]) {
//         ventasPorFecha[venta.fecha] = 0
//       }
//       ventasPorFecha[venta.fecha] += venta.cantidad
//     })

//     // Ordenar fechas
//     const fechasOrdenadas = Object.keys(ventasPorFecha).sort()

//     // Calcular la tasa de crecimiento utilizando regresión exponencial
//     // Convertir tus datos de DataPoint a un formato compatible con la función de regresión exponencial
//     // Convertir tus datos de DataPoint a un formato compatible con la función de regresión exponencial
//     const datosEntrenamiento: DataPoint[] = fechasOrdenadas.map((fecha) => ({
//       x: new Date(fecha).getTime(),
//       y: ventasPorFecha[fecha],
//     }))

//     const datosParaRegresion: [
//       number,
//       number,
//     ][] = datosEntrenamiento.map((dataPoint) => [dataPoint.x, dataPoint.y])
//     const result = regression.exponential(Object.freeze(datosParaRegresion), {
//       precision: 12,
//     });

//     // Generar fechas para predicción (por ejemplo, próximos 7 días)
//     const fechaInicio = new Date(fechasOrdenadas[fechasOrdenadas.length - 1])
//     const fechasPrediccion: Date[] = []
//     for (let i = 0; i < 7; i++) {
//       const fecha = new Date(fechaInicio.getTime())
//       fecha.setDate(fecha.getDate() + i)
//       fechasPrediccion.push(fecha)
//     }

//     // Predecir ventas futuras utilizando el modelo exponencial
//     const ventasPrediccion = fechasPrediccion.map((fecha) => {
//       const prediccion = result.predict(new Date(fecha).getTime())[1]
//       return [new Date(fecha), prediccion]
//     })

//     // Actualizar datos de predicción
//     this.dataPrediccion = {
//       labels: fechasPrediccion.map(
//         (fecha) => fecha.toISOString().split('T')[0],
//       ),
//       datasets: [
//         {
//           label: 'Predicción de Ventas Futuras',
//           data: ventasPrediccion.map((item) => item[1]),
//           fill: false,
//           borderColor: '#FF5722',
//           borderWidth: 2,
//         },
//       ],
//     }
//   }
//   ngOnInit() {
//     const ventas = [
//       {
//         categoria: 'Pastel de Chocolate',
//         sabor: 'Chocolate',
//         cantidad: 12,
//         fecha: '2024-04-07',
//       },
//       {
//         categoria: 'Pastel de Fresa',
//         sabor: 'Fresa',
//         cantidad: 5,
//         fecha: '2024-04-07',
//       },
//       {
//         categoria: 'Cheesecake',
//         sabor: 'Fresa',
//         cantidad: 13,
//         fecha: '2024-04-07',
//       },
//       {
//         categoria: 'Tiramisú',
//         sabor: 'Café',
//         cantidad: 10,
//         fecha: '2024-04-07',
//       },
//       {
//         categoria: 'Croissants',
//         sabor: 'Chocolate',
//         cantidad: 20,
//         fecha: '2024-04-08',
//       },
//       {
//         categoria: 'Pastel de Vainilla',
//         sabor: 'Vainilla',
//         cantidad: 10,
//         fecha: '2024-04-08',
//       },
//       {
//         categoria: 'Tarta de Manzana',
//         sabor: 'Manzana y Canela',
//         cantidad: 16,
//         fecha: '2024-04-08',
//       },
//       {
//         categoria: 'Cupcake',
//         sabor: 'Vainilla con Chocolate',
//         cantidad: 18,
//         fecha: '2024-04-09',
//       },
//       {
//         categoria: 'Galletas',
//         sabor: 'Chispas de Chocolate',
//         cantidad: 25,
//         fecha: '2024-04-09',
//       },
//       {
//         categoria: 'Donas',
//         sabor: 'Glaseadas',
//         cantidad: 20,
//         fecha: '2024-04-10',
//       },
//       {
//         categoria: 'Brownies',
//         sabor: 'Chocolate y Nueces',
//         cantidad: 15,
//         fecha: '2024-04-10',
//       },
//       {
//         categoria: 'Muffins',
//         sabor: 'Arándanos',
//         cantidad: 20,
//         fecha: '2024-04-11',
//       },
//       {
//         categoria: 'Tarta de Limón',
//         sabor: 'Limón',
//         cantidad: 15,
//         fecha: '2024-04-11',
//       },
//       {
//         categoria: 'Pastel de Zanahoria',
//         sabor: 'Zanahoria',
//         cantidad: 8,
//         fecha: '2024-04-11',
//       },
//     ]

//     this.ventas = ventas
//     this.predecirVentasFuturas()

//     // Configurar datos y opciones para el gráfico por categoría

//     // Configurar datos y opciones para el gráfico por categoría
//     this.dataPorCategoria = {
//       labels: this.ventas.map((venta) => venta.categoria), // Etiquetas de las categorías
//       datasets: [
//         {
//           label: 'Ventas por Categoría',
//           data: this.calcularVentasPorCategoria(), // Calcular las ventas por categoría
//           backgroundColor: this.generarColoresAleatorios(this.ventas.length), // Generar colores aleatorios para cada categoría
//           borderColor: 'rgba(0, 0, 0, 0.5)', // Color del borde
//           borderWidth: 1, // Ancho del borde
//         },
//       ],
//     }

//     // Configurar datos y opciones para el gráfico de todas las ventas
//     this.dataTodasVentas = {
//       labels: this.ventas.map((venta) => venta.fecha), // Etiquetas de las fechas
//       datasets: [
//         {
//           label: 'Todas las Ventas',
//           data: this.ventas.map((venta) => venta.cantidad), // Datos de cantidad de ventas
//           fill: false, // No rellenar el área bajo la línea
//           borderColor: '#4CAF50', // Color de la línea
//           borderWidth: 2, // Ancho de la línea
//         },
//       ],
//     }

//     // Configurar datos y opciones para el gráfico de predicción de ventas futuras

//     // Configurar datos y opciones para el gráfico por día
//     this.ventasPorDia = this.agruparVentasPorDia(ventas)

//     this.dataPorDia = {
//       labels: this.ventasPorDia.map((venta) => venta.fecha),
//       datasets: this.ventasPorDia.map((venta, index) => ({
//         label: `Ventas por día (${venta.fecha})`,
//         data: venta.pasteles.map((pastel) => pastel.cantidad),
//         fill: index === 0,
//         tension: 0.4,
//         borderColor: index === 0 ? '#4285F4' : '#EA4335',
//       })),
//     }

//     // Configurar opciones comunes para todos los gráficos
//     this.options = {
//       maintainAspectRatio: false,
//       aspectRatio: 0.6,
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     }
//   }

//   // Método para calcular las ventas por categoría
//   private calcularVentasPorCategoria(): number[] {
//     // Creamos un objeto para almacenar la cantidad de ventas por cada categoría
//     const ventasPorCategoria: { [categoria: string]: number } = {}

//     // Iteramos sobre cada venta para calcular la cantidad total por categoría
//     this.ventas.forEach((venta) => {
//       // Si la categoría aún no está en el objeto, la inicializamos con valor 0
//       if (!ventasPorCategoria[venta.categoria]) {
//         ventasPorCategoria[venta.categoria] = 0
//       }
//       // Sumamos la cantidad de la venta a la categoría correspondiente
//       ventasPorCategoria[venta.categoria] += venta.cantidad
//     })

//     // Devolvemos un array con la cantidad de ventas por cada categoría en el mismo orden que las categorías originales
//     return Object.values(ventasPorCategoria)
//   }

//   // Método para generar colores aleatorios para cada categoría
//   private generarColoresAleatorios(cantidad: number): string[] {
//     // Creamos un array para almacenar los colores aleatorios
//     const colores: string[] = []

//     // Generamos un color aleatorio en formato hexadecimal para cada categoría
//     for (let i = 0; i < cantidad; i++) {
//       // Generamos los componentes RGB aleatorios
//       const r = Math.floor(Math.random() * 256)
//       const g = Math.floor(Math.random() * 256)
//       const b = Math.floor(Math.random() * 256)
//       // Convertimos los componentes a formato hexadecimal y los concatenamos
//       const color = `#${r.toString(16).padStart(2, '0')}${g
//         .toString(16)
//         .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
//       // Agregamos el color generado al array de colores
//       colores.push(color)
//     }

//     // Devolvemos el array de colores
//     return colores
//   }

//   private agruparVentasPorDia(ventas: any[]): any[] {
//     const ventasPorDia: {
//       fecha: string
//       pasteles: { categoria: string; cantidad: number }[]
//     }[] = []

//     ventas.forEach((venta) => {
//       const index = ventasPorDia.findIndex((v) => v.fecha === venta.fecha)
//       if (index === -1) {
//         ventasPorDia.push({
//           fecha: venta.fecha,
//           pasteles: [{ categoria: venta.categoria, cantidad: venta.cantidad }],
//         })
//       } else {
//         const pastelIndex = ventasPorDia[index].pasteles.findIndex(
//           (p) => p.categoria === venta.categoria,
//         )
//         if (pastelIndex === -1) {
//           ventasPorDia[index].pasteles.push({
//             categoria: venta.categoria,
//             cantidad: venta.cantidad,
//           })
//         } else {
//           ventasPorDia[index].pasteles[pastelIndex].cantidad += venta.cantidad
//         }
//       }
//     })

//     return ventasPorDia
//   }
// }
