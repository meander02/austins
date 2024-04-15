// import { Component, OnInit } from '@angular/core'
// import { DatalocalService } from '../../commons/services/datalocal.service'
// interface GroupedSales {
//   [key: string]: number
// }

// // interface Venta {
// //   cantidad: number;
// //   fecha: Date;
// //   // Otras propiedades relacionadas con la venta...
// // }
// interface Venta {
//   categoria: string;
//   cantidad: number;
//   fecha: Date; // Asegúrate de que la fecha sea del tipo Date
// }



// interface SelectedCategory {
//   categoria: string
//   icono: string // Nueva propiedad para almacenar el nombre del icono

//   // Agrega aquí cualquier otra propiedad que tenga selectedCategory
// }

// @Component({
//   selector: 'app-data-grafica',
//   templateUrl: './data-grafica.view.html',
//   styleUrls: ['./data-grafica.view.scss'],
// })
// export class DataGraficaView implements OnInit {
//   ventas: {
//     categoria: string
//     cantidad: number
//     fecha: string
//   }[] = []
//   // ventas: {
//   //   categoria: string;
//   //   cantidad: number;
//   //   fecha: string;
//   // }[] = [];
//   p: number = 0;
//   c: number = 0;
//   k: number = 0;
//   chartData: any
//   chartOptions: any
//   // selectedCategory: SelectedCategory | null = null;
//   selectedCategory: SelectedCategory | null = null

//   // selectedCategory: string = '';
//   selectedStartDate: string = ''
//   selectedFutureDate: string = '' // Agrega la variable para almacenar la fecha futura seleccionada
//   predictedSales: number | null = null

//   chartDataFuturas: any
//   chartOptionsFuturas: any
//   constructor(private jsonDataService: DatalocalService) {}

//   ngOnInit() {
//     this.jsonDataService.getData().subscribe((data) => {
//       this.ventas = data
//       this.updateChartData()
//       // this.updateChartData();
//       this.updateChartFuturas()
//     })
//   }
//   selectCategory(category: SelectedCategory): void {
//     this.selectedCategory = category
//     this.updatePredictions()
//   }

//   selectStartDate(date: string): void {
//     this.selectedStartDate = date
//     this.updatePredictions()
//   }

//   selectFutureDate(date: string): void {
//     this.selectedFutureDate = date
//     this.updatePredictions()
//   }

//   // updatePredictions(): void {
//   //   console.log('selectedCategory:', this.selectedCategory);
//   //   console.log('selectedStartDate:', this.selectedStartDate);
//   //   console.log('selectedFutureDate:', this.selectedFutureDate);

//   //   if (
//   //     this.selectedCategory &&
//   //     this.selectedStartDate &&
//   //     this.selectedFutureDate
//   //   ) {
//   //     const ventasCategoria = this.ventas.filter(
//   //       (venta) => venta.categoria === this.selectedCategory?.categoria
//   //     );
//   //     console.log('ventasCategoria:', ventasCategoria);

//   //     const fechaInicio = new Date(this.selectedStartDate);
//   //     const fechaFutura = new Date(this.selectedFutureDate);
      
//   //     const ventasHastaFechaFutura = ventasCategoria.filter(
//   //       (venta) => {
//   //         const fechaVenta = new Date(venta.fecha);
//   //         return fechaVenta >= fechaInicio && fechaVenta <= fechaFutura;
//   //       }
//   //     );
      

//   //     console.log('ventasHastaFechaFutura:', ventasHastaFechaFutura);

//   //     const ventasFuturas = ventasHastaFechaFutura.reduce(
//   //       (total, venta) => {
//   //         console.log('Venta:', venta);
//   //         return total + venta.cantidad;
//   //       },
//   //       0
//   //     );
      
//   //     console.log('ventasFuturas:', ventasFuturas);

//   //     const tiempoTranscurrido = Math.abs(
//   //       fechaFutura.getTime() - fechaInicio.getTime()
//   //     );
//   //     const diasTranscurridos = Math.ceil(
//   //       tiempoTranscurrido / (1000 * 60 * 60 * 24)
//   //     );
//   //     console.log('diasTranscurridos:', diasTranscurridos);

//   //     const diasHastaFechaFutura = Math.ceil(
//   //       tiempoTranscurrido / (1000 * 60 * 60 * 24)
//   //     );
//   //     console.log('diasHastaFechaFutura:', diasHastaFechaFutura);

//   //     if (diasTranscurridos > 0) {
//   //       const ventasPorDia = ventasFuturas / diasTranscurridos;
//   //       this.predictedSales = Math.round(ventasPorDia * diasHastaFechaFutura);
//   //       this.predictedSales = Math.max(this.predictedSales, 0); // Evitar ventas proyectadas negativas
//   //       console.log('predictedSales:', this.predictedSales);
//   //     } else {
//   //       this.predictedSales = null;
//   //     }
      

//   //     this.chartData = {
//   //       labels: ['Fecha actual', 'Fecha futura'],
//   //       datasets: [
//   //         {
//   //           label: 'Ventas',
//   //           data: [ventasFuturas, this.predictedSales || 0], // Asegurar que las ventas proyectadas no sean null
//   //         },
//   //       ],
//   //     };

//   //     this.chartOptions = {
//   //       responsive: true,
//   //       maintainAspectRatio: false,
//   //     };

//   //     console.log('chartData:', this.chartData);
//   //     console.log('chartOptions:', this.chartOptions);
//   //   }
//   // }
//   updatePredictions(): void {
//     console.log('selectedCategory:', this.selectedCategory);
//     console.log('selectedStartDate:', this.selectedStartDate);
//     console.log('selectedFutureDate:', this.selectedFutureDate);
  
//     if (
//       this.selectedCategory &&
//       this.selectedStartDate &&
//       this.selectedFutureDate
//     ) {
//       // Encontrar la venta inicial correspondiente a la categoría seleccionada
//       const ventaInicial = this.ventas.find(
//         (venta) => venta.categoria === this.selectedCategory?.categoria
//       );
  
//       if (!ventaInicial) {
//         // Si no se encuentra la venta inicial, establecer predictedSales a null y salir de la función
//         this.predictedSales = null;
//         return;
//       }
  
//       const fechaInicio = new Date(this.selectedStartDate);
//       const fechaFutura = new Date(this.selectedFutureDate);
      
//       const tiempoTranscurrido = Math.abs(
//         fechaFutura.getTime() - fechaInicio.getTime()
//       );
//       const diasHastaFechaFutura = Math.ceil(
//         tiempoTranscurrido / (1000 * 60 * 60 * 24)
//       );
//       console.log('diasHastaFechaFutura:', diasHastaFechaFutura);
  
//       if (diasHastaFechaFutura > 0) {
//         const c = ventaInicial.cantidad;
//         const t = diasHastaFechaFutura;
  
//         // Aplicar la fórmula para calcular las ventas futuras
//         this.predictedSales = c * Math.exp(this.k * t);
//         this.predictedSales = Math.round(this.predictedSales);
//         console.log('predictedSales:', this.predictedSales);
//       } else {
//         this.predictedSales = null;
//       }
      
  
//       this.chartData = {
//         labels: ['Fecha actual', 'Fecha futura'],
//         datasets: [
//           {
//             label: 'Ventas',
//             data: [ventaInicial.cantidad, this.predictedSales || 0], // Asegurar que las ventas proyectadas no sean null
//           },
//         ],
//       };
  
//       this.chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//       };
  
//       console.log('chartData:', this.chartData);
//       console.log('chartOptions:', this.chartOptions);
//     }
//   }
  

  
//   updateChartData(): void {
//     const groupedSales: GroupedSales = this.ventas.reduce(
//       (accumulator: GroupedSales, current) => {
//         accumulator[current.fecha] =
//           (accumulator[current.fecha] || 0) + current.cantidad
//         return accumulator
//       },
//       {},
//     )

//     const chartDates = Object.keys(groupedSales)
//     const chartQuantities = Object.values(groupedSales)

//     const startDate = new Date(this.selectedStartDate)
//     const futureDate = new Date(this.selectedFutureDate)

//     // Filtrar las ventas entre la fecha inicial y la fecha futura
//     const salesInRange = this.ventas.filter((venta) => {
//       const ventaDate = new Date(venta.fecha)
//       return ventaDate >= startDate && ventaDate <= futureDate
//     })

//     const groupedSalesInRange: GroupedSales = salesInRange.reduce(
//       (accumulator: GroupedSales, current) => {
//         accumulator[current.fecha] =
//           (accumulator[current.fecha] || 0) + current.cantidad
//         return accumulator
//       },
//       {},
//     )

//     const chartDatesInRange = Object.keys(groupedSalesInRange)
//     const chartQuantitiesInRange = Object.values(groupedSalesInRange)

//     this.chartData = {
//       labels: chartDates,
//       datasets: [
//         {
//           label: 'Ventas por fecha',
//           data: chartQuantities,
//           fill: false,
//           borderColor: '#4caf50',
//           tension: 0.1,
//         },
//       ],
//     }

//     this.chartOptions = {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         xAxes: [
//           {
//             type: 'time',
//             time: {
//               unit: 'day',
//               displayFormats: {
//                 day: 'MMM DD',
//               },
//             },
//             scaleLabel: {
//               display: true,
//               labelString: 'Fecha',
//             },
//           },
//         ],
//         yAxes: [
//           {
//             scaleLabel: {
//               display: true,
//               labelString: 'Cantidad',
//             },
//           },
//         ],
//       },
//     }
//   }

//   updateChartFuturas(): void {
//     if (this.selectedStartDate && this.selectedFutureDate) {
//       const startDate = new Date(this.selectedStartDate)
//       const futureDate = new Date(this.selectedFutureDate)

//       const salesInRange = this.ventas.filter((venta) => {
//         const ventaDate = new Date(venta.fecha)
//         return ventaDate >= startDate && ventaDate <= futureDate
//       })

//       const groupedSalesInRange: GroupedSales = salesInRange.reduce(
//         (accumulator: GroupedSales, current) => {
//           accumulator[current.fecha] =
//             (accumulator[current.fecha] || 0) + current.cantidad
//           return accumulator
//         },
//         {},
//       )

//       const chartDatesInRange = Object.keys(groupedSalesInRange)
//       const chartQuantitiesInRange = Object.values(groupedSalesInRange)

//       this.chartDataFuturas = {
//         labels: chartDatesInRange,
//         datasets: [
//           {
//             label: 'Ventas en rango seleccionado',
//             data: chartQuantitiesInRange,
//             fill: false,
//             borderColor: '#2196f3',
//             tension: 0.1,
//           },
//         ],
//       }

//       this.chartOptionsFuturas = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           xAxes: [
//             {
//               type: 'time',
//               time: {
//                 unit: 'day',
//                 displayFormats: {
//                   day: 'MMM DD',
//                 },
//               },
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Fecha',
//               },
//             },
//           ],
//           yAxes: [
//             {
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Cantidad',
//               },
//             },
//           ],
//         },
//       }
//     }
//   }
// }
