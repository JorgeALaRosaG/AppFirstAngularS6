import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit{

  product : Product = new Product();

  constructor(private productService: ProductoService, private router: Router){}

  ngOnInit(): void {
    
  }

  save(){
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe(
      data => this.router.navigate(['/list']) // asincrona
    );
    console.log("continuando...");
  }


}
