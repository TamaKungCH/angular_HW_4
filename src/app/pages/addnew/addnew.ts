import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TripService } from '../../services/api/trip';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-addnew',
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './addnew.html',
  styleUrl: './addnew.scss'
})
export class Addnew {
  file?: File;
  coverPreview: string | null = null;
  name: string = '';
  destination: string = '';
  country: string = '';
  cover: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;



  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'อเมริกาเหนือ' },
    { value: 4, name: 'อเมริกาใต้' },
    { value: 5, name: 'แอฟริกา' },
    { value: 6, name: 'ออสเตรเลีย / โอเชียเนีย' },
    { value: 7, name: 'แอนตาร์กติกา' },
    { value: 8, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' }

  ];

  constructor(private http: HttpClient, private tripService: TripService) { }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        this.coverPreview = e.target?.result as string | null;
      };
      reader.readAsDataURL(this.file);
    }
  }


  async addNew() {
    // if (this.file) {
    //     const formData = new FormData();
    //     formData.append('file', this.file);
    //     const response: any = await lastValueFrom(
    //         this.http.post('http://192.168.1.4:3000/trip/upload', formData)
    //     );
    //     this.cover = response.filename;
    // }

    const body = {
        name: this.name,
        country: this.country,
        destinationid: this.destination,
        coverimage: this.cover,
        detail: this.detail,
        price: this.price,
        duration: this.duration,
    };

    const response = await this.tripService.addNewTrip(body);
    console.log(response);
    alert('เพิ่มสถานที่เรียบร้อยแล้ว');
}


}

interface Destination {
  value: number;
  name: string;
}

