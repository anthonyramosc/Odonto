import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MyIPServiceService {

    constructor(private http: HttpClient) {
    }

    getIP() {
        const URL_API = "https://api.ipify.org/?format=json";
        /*fetch(URL_API)
            .then(respuestaRaw => respuestaRaw.json())
            .then(respuesta => {
                const ip = respuesta.ip;
                console.log("Tu IP es: ");
                console.log(ip)
            });*/

        return this.http
            .get<any>(URL_API)
            .toPromise()
            .then((res) => <any[]>res.ip)
            .then((data) => {
                return data;
            });
    }
}
