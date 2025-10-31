import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/api/trip';
import { TripGetResponse } from '../../model/trip_get_res';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class Edit implements OnInit {
  trip?: TripGetResponse;
  uniqueCountries: string[] = [];

  constructor(
    private http: HttpClient,
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadTrip(+id);
  }

  async loadTrip(id: number) {
    const trips = await this.tripService.getTrip();
    this.trip = trips.find(t => t.idx === id);
    if (!this.trip) return;

    // ดึงรายชื่อประเทศแบบ unique
    this.uniqueCountries = Array.from(new Set(trips.map(t => t.country)));
  }

  async updateTrip() {
    if (!this.trip) return;

    try {
      const body = {
        name: this.trip.name,
        country: this.trip.country,
        destinationid: this.trip.destinationid || 1, 
        coverimage: this.trip.coverimage,
        detail: this.trip.detail,
        price: this.trip.price,
        duration: this.trip.duration
      };

      const response = await this.tripService.updateTrip(this.trip.idx, body);
      console.log('Update success', response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  }

}
