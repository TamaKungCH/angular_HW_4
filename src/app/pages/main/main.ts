import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { TripGetResponse } from '../../model/trip_get_res';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/api/trip';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    FormsModule,
    RouterModule,],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  constructor(private http: HttpClient, private tripService: TripService) { }
  allTrips: TripGetResponse[] = []; // เก็บข้อมูลดิบทั้งหมด
  trips: TripGetResponse[] = [];    // เก็บข้อมูลที่กรองแล้ว

  async findOne(input: HTMLInputElement) {
    this.trips = await this.tripService.getOneTrip(+input.value);

    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findName(input: HTMLInputElement) {
    // ดึงข้อมูลทั้งหมดก่อน
    const allTrips = await this.tripService.getTrip();

    // กรองเฉพาะชื่อที่มีตัวอักษร input.value
    this.trips = allTrips.filter(trip =>
      trip.name.includes(input.value)
    );

    console.log(this.trips);
    if (this.trips.length > 0) {
      console.log(this.trips[0].name);
    }
    console.log('Call Name Completed');
  }




  ngOnInit(): void {
    this.loadDataAsync();
    console.log('Init State');
  }
  async loadDataAsync() {
    this.allTrips = await this.tripService.getTrip(); // โหลดครั้งเดียว
    this.trips = [...this.allTrips]; // copy มาแสดงทั้งหมด
  }


  async getTripsByCountry(country: string) {
    if (!country) {
      this.trips = [];
      console.log('No country selected');
      return;
    }

    try {
      this.trips = await this.tripService.getTripsByCountry(country);
      console.log(this.trips);
      if (this.trips.length > 0) {
        console.log(this.trips[0].name);
      }
      console.log('Call Completed');
    } catch (error) {
      console.error('Error fetching trips by country:', error);
    }
  }


  async callApi() {
    this.trips = await this.tripService.getTrip();

    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }
  searchCountry: string = '';
  get uniqueCountries(): string[] { 
    return Array.from(new Set(this.allTrips.map(t => t.country)));
  }


  findTripsByCountry(country: string) {
    if (!country) {
      this.trips = [...this.allTrips]; // ถ้าไม่เลือกประเทศ แสดงทั้งหมด
    } else {
      this.trips = this.allTrips.filter(trip => trip.country === country);
    }

    console.log('Filtered trips:', this.trips);
  }





  async loadCountries() {
    this.trips = await this.tripService.getDestinations();

  }

  async deleteTrip(idx: number) {
    if (!confirm('คุณแน่ใจว่าจะลบสถานที่นี้หรือไม่?')) return;

    try {
      await this.tripService.deleteTrip(idx);
      // อัปเดตรายการ trips หลังลบ
      this.trips = this.trips.filter(t => t.idx !== idx);
      console.log('Deleted trip:', idx);
    } catch (err) {
      console.error('Error deleting trip:', err);
    }
  }

}
