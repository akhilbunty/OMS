import { Injectable } from "@angular/core";
@Injectable()
export class Config {
    service_url = "http://localhost:3000/";
    login() {
        return this.service_url + "signin";
    }
    getOrders() {
        return this.service_url + "order";
    }
    addOrder() {
        return this.service_url + "order";
    }
    editOrder(id) {
        return this.service_url + "order/" + id;
    }
    deleteOrder(id) {
        return this.service_url + "order/" + id;
    }
}