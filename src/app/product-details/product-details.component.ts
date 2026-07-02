import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product

  constructor(
    private productService: ProductoService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void{
    //Obtener el id del producto
    const id = this.activateRouter.snapshot.params['codigo'];
    //Invocamos al servicio enviandole el id del producto indicado
    this.productService.detail(id).subscribe(data => this.product=data);
  }

  volver() : void {
    this.router.navigate(['/']);
  }

}
