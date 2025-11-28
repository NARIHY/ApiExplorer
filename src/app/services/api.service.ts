import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    request(method: string, url: string, body?: any, headersObj?: any): Observable<any> {
        const headers = new HttpHeaders(headersObj ?? {});

        switch (method) {
            case 'GET':
                return this.http.get(url, { headers });
            case 'POST':
                return this.http.post(url, body, { headers });
            case 'PUT':
                return this.http.put(url, body, { headers });
            case 'DELETE':
                return this.http.delete(url, { headers });
            case 'PATCH':
                return this.http.patch(url, body, { headers });
            default:
                throw new Error('Méthode HTTP non supportée');
        }
    }

}
