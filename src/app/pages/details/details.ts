import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TripService } from '../../services/api/trip';
import { TripGetResponse } from '../../model/trip_get_res';


@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./details.scss']
})
export class Details implements OnInit {
  constructor(private route: ActivatedRoute, private tripService: TripService) { }
  trip?: TripGetResponse;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // ดึงค่า id
    if (id) {
      this.loadTrip(+id);  // +id แปลงเป็น number
    }
  }

  async loadTrip(id: number) {
    this.trip = await this.tripService.getTripById(id);
}
}
