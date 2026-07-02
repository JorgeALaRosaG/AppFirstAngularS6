import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './model/product';
import { ProductoService } from './service/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Primera aplicacion Angular';
  searchText = '';
  searchErrorMessage = '';
  isSearching = false;
  private searchErrorTimer?: number;

  constructor(
    private productService: ProductoService,
    private router: Router
  ) {}

  searchProduct(): void {
    const query = this.searchText.trim().toLowerCase();
    this.searchErrorMessage = '';

    if (!query) {
      this.showSearchError('Ingresa un producto para buscar.');
      return;
    }

    this.isSearching = true;

    this.productService.getProducList().subscribe({
      next: (products: Product[]) => {
        const productFound = products.find(product => this.matchesProduct(product, query));
        this.isSearching = false;

        if (!productFound) {
          this.showSearchError('Busqueda no exitosa: el producto no existe.');
          return;
        }

        this.searchText = '';
        this.clearSearchError();
        this.router.navigate(['/detalle', productFound.codigo]);
      },
      error: () => {
        this.isSearching = false;
        this.showSearchError('Busqueda no exitosa: el producto no existe o no esta disponible.');
      }
    });
  }

  private matchesProduct(product: Product, query: string): boolean {
    const codigo = String(product.codigo).toLowerCase();
    const descripcion = (product.descripcion || '').toLowerCase();

    return codigo === query || descripcion.includes(query);
  }

  private showSearchError(message: string): void {
    this.searchErrorMessage = message;

    if (this.searchErrorTimer) {
      window.clearTimeout(this.searchErrorTimer);
    }

    this.searchErrorTimer = window.setTimeout(() => {
      this.searchErrorMessage = '';
      this.searchErrorTimer = undefined;
    }, 5000);
  }

  private clearSearchError(): void {
    this.searchErrorMessage = '';

    if (this.searchErrorTimer) {
      window.clearTimeout(this.searchErrorTimer);
      this.searchErrorTimer = undefined;
    }
  }
}
