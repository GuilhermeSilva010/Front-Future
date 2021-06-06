import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseI } from '../../shared/apiresponse.model';
import { API_ENDPOINT, ENDPOINTS } from '../../shared/api.services';
import { DashI } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  list(body: any) {
    return this.http.post<ApiResponseI>(`${API_ENDPOINT.URL_API}${ENDPOINTS.DASHBOARD.LIST}`, body)
  }

  count(body: any) {
    return this.http.post<ApiResponseI>(`${API_ENDPOINT.URL_API}${ENDPOINTS.DASHBOARD.COUNT}`, body)
  }

  add(body: DashI){
    return this.http.post<ApiResponseI>(`${API_ENDPOINT.URL_API}${ENDPOINTS.DASHBOARD.ADD}`, body)
  }

}
