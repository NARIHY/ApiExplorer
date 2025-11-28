import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { finalize } from 'rxjs/operators';

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

  isLoading = false;

  editorOptions = { 
    theme: 'vs-dark', 
    language: 'json', 
    automaticLayout: true 
  };

  constructor(private api: ApiService) { }

  sendRequest() {
    let payload: any = null;
    let parsedHeaders: any = {};

    // Parse JSON du body si présent
    if (this.body.trim()) {
      try {
        payload = JSON.parse(this.body);
      } catch {
        alert('JSON Body invalide');
        return;
      }
    }

    // Parse JSON des headers si présent
    if (this.headers.trim()) {
      try {
        parsedHeaders = JSON.parse(this.headers);
      } catch {
        alert('JSON Headers invalide');
        return;
      }
    }

    // Ajouter les champs auth
    if (this.token) parsedHeaders['Authorization'] = `Bearer ${this.token}`;
    if (this.clientId) parsedHeaders['Client-ID'] = this.clientId;
    if (this.clientSecret) parsedHeaders['Client-Secret'] = this.clientSecret;

    // Activer le loader
    this.isLoading = true;

    this.api.request(this.method, this.url, payload, parsedHeaders)
      .pipe(finalize(() => this.isLoading = false)) // Toujours masquer le loader
      .subscribe({
        next: res => {
          this.response = res;
          this.saveHistory();
        },
        error: err => {
          this.response = err;
          this.saveHistory();
        }
      });
  }

  formatJson(data: any): string {
    if (!data) return '';
    let json = JSON.stringify(data, null, 2);

    // Limiter l'affichage pour les grosses réponses
    if (json.length > 2000) {
      json = json.slice(0, 2000) + "\n…(truncated)";
    }

    if (!Prism.languages['json']) {
      console.warn('Prism JSON language not loaded');
      return json;
    }

    return Prism.highlight(json, Prism.languages['json'], 'json');
  }

  formatBody() {
    try {
      this.body = JSON.stringify(JSON.parse(this.body), null, 2);
    } catch {
      alert('JSON invalide');
    }
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

  getMethodClass(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return 'method-get';
      case 'POST': return 'method-post';
      case 'PUT': return 'method-put';
      case 'DELETE': return 'method-delete';
      case 'PATCH': return 'method-patch';
      default: return '';
    }
  }
}
