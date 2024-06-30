import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { HomeService } from 'src/app/services/home.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentUser: any;

  constructor(private homeService: HomeService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    // Obtener productos
    this.homeService.getProducts().subscribe(
      data => this.products = data
    );

    // Obtener el usuario actual
    this.authService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }
}
