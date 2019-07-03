import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Config } from './config'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()

export class Service {
    constructor(private http: HttpClient, private config: Config) {
    }
    login(data) {
        return this.http.post(this.config.login(), data, httpOptions);
    }
    getOrders() {
        return this.http.get(this.config.getOrders(), httpOptions);
    }
    addOrder(data) {
        return this.http.post(this.config.addOrder(), data, httpOptions);
    }
    editOrder(data) {
        return this.http.put(this.config.editOrder(data._id), data, httpOptions);
    }
    deleteOrder(id) {
        return this.http.delete(this.config.deleteOrder(id), httpOptions);
    }

}