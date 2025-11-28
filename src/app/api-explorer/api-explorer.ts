import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-api-explorer',
  standalone: false,
  templateUrl: './api-explorer.html',
  styleUrls: ['./api-explorer.scss'],
})
export class ApiExplorer {

  url = '';
  method = 'GET';
  methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  body = '';
  headers = '';

  clientId = '';
  clientSecret = '';
  token = '';

  response: any = null;
  history: any[] = [];

  constructor(private api: ApiService) { }

  sendRequest() {
    let payload = null;
    let parsedHeaders: any = {};

    // Parse JSON du body
    if (this.body.trim() !== '') {
      try { payload = JSON.parse(this.body); }
      catch { alert('JSON Body invalide'); return; }
    }

    // Parse JSON des headers
    if (this.headers.trim() !== '') {
      try { parsedHeaders = JSON.parse(this.headers); }
      catch { alert('JSON Headers invalide'); return; }
    }

    // Ajouter les champs auth
    if (this.token) parsedHeaders['Authorization'] = `Bearer ${this.token}`;
    if (this.clientId) parsedHeaders['Client-ID'] = this.clientId;
    if (this.clientSecret) parsedHeaders['Client-Secret'] = this.clientSecret;

    this.api.request(this.method, this.url, payload, parsedHeaders).subscribe({
      next: (res) => {
        this.response = res;
        this.saveHistory();
      },
      error: (err) => {
        this.response = err;
        this.saveHistory();
      }
    });
  }

  saveHistory() {
    this.history.unshift({
      url: this.url,
      method: this.method,
      timestamp: new Date(),
      response: this.response
    });

    this.history = this.history.slice(0, 20);
  }
}
