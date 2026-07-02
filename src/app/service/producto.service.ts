import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http' //Agregado a mano (1)
import { map, Observable } from 'rxjs'; //mao agregado a mano (2)
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  URL_SERVICES = 'http://localhost:8080';
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-type' : 'application/json'}); //definir a mano (1)
  //Inyectar http, también importarlo y registrarlo en imports: de app.module.ts

  constructor(private http:HttpClient) { }

  //Listamos todos los productos con su precio final calculado
  getProducList(): Observable<any>{
    console.log("Llamando a REST: " + this.urlBase + "/productosTotal");
    return this.http.get(this.urlBase + '/productosTotal').pipe(
      map(response => response as Product[]) //(2)
    );
  }
  
  //Método para registrar productos
  createProduct(product:Object): Observable<Object>{
    return this.http.post(this.urlBase + "/producto", product, {headers:this.httpHeaders});
  }

  //Detalles de un producto
  public detail(codigo: number): Observable<Product>{
    return this.http.get<Product>(this.urlBase + "/producto/" + codigo);
  }


}
