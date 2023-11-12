import { Component, computed, inject } from '@angular/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { EMPTY, catchError, tap } from 'rxjs';
import { VehicleService } from '../vehicle.service';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);
  // Vehicles
  //Error Handling
  vehicles = computed(() => {
    try {
      const vehicles = this.vehicleService.vehicles();
      if(vehicles.length > 0) {
        asapScheduler.schedule(() =>this.onSelected(vehicles[0].name))
      }
      return vehicles;
    } catch (e) {
      console.log(e)
      this.errorMessage = typeof e === 'string' ? e: 'Error'
      return []
    }
  }) 

  

  selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
