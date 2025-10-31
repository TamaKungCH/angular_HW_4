import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { TripGetResponse } from '../../model/trip_get_res';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  public async getTripById(id: number): Promise<TripGetResponse | undefined> {
    const trips = await this.getTrip();
    return trips.find(t => t.idx === id);
  }

  constructor(private constants: Constants, private http: HttpClient) { }

  public async getTrip(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse[];
  }

  public async addNewTrip(trip: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.post(url, trip));
    return response;
}


  public async getOneTrip(id: number, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip/' + id;
    const response = await lastValueFrom(this.http.get(url));

    // ถ้า API คืน object เดียว ให้แปลงเป็น array
    if (response) {
      return Array.isArray(response) ? response : [response];
    } else {
      return [];
    }
  }


  public async getTripByName(name: string, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.get(url, {
        params: {
          name: name,
        },
      })
    );
    return response as TripGetResponse[];
  }

  public async updateTrip(id: number, data: any) {
    const url = this.constants.API_ENDPOINT + '/trip/' + id;
    return await lastValueFrom(this.http.put(url, data));
  }

  async deleteTrip(id: number): Promise<void> {
    const url = this.constants.API_ENDPOINT + '/trip/' + id;
    await lastValueFrom(this.http.delete(url));
  }


  public async getTripsByCountry(name: string): Promise<TripGetResponse[]> {
    const url = this.constants.API_ENDPOINT + '/destinations'; // ใช้ /destinations แทน /trip/search
    const params = { name }; // ส่ง query param ตาม backend
    try {
      return await lastValueFrom(this.http.get<TripGetResponse[]>(url, { params }));
    } catch (err) {
      console.error('Error fetching trips by country:', err);
      return [];
    }
  }

  public async getDestinations(): Promise<TripGetResponse[]> {
    const url = this.constants.API_ENDPOINT + '/destinations';
    try {
      return await lastValueFrom(this.http.get<TripGetResponse[]>(url));
    } catch (err) {
      console.error('Error fetching destinations:', err);
      return [];
    }
  }

}