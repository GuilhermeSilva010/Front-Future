import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseI } from '../../shared/apiresponse.model';
import { API_ENDPOINT, ENDPOINTS } from '../../shared/api.services';

@Injectable({
  providedIn: 'root'
})
export class CotasService {

 
  constructor(private http: HttpClient) { }

  list(body: any) {
    return this.http.post<ApiResponseI>(`${API_ENDPOINT.URL_API}${ENDPOINTS.COTAS.LIST}`, body)
  }

  count(body: any) {
    return this.http.post<ApiResponseI>(`${API_ENDPOINT.URL_API}${ENDPOINTS.COTAS.COUNT}`, body)
  }


}
