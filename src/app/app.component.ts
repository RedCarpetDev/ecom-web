import {Component, OnInit} from '@angular/core';
import {CatalogService} from './catalog.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private cat;
  private currentCategorie;
  constructor(
    private catService: CatalogService,
    private router: Router,
    private authService:AuthenticationService
    ) {
  }

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catService.getRessource("/cat")
      .subscribe(data=>{
        this.cat=data;
      },err=>{
        console.log(err);
      })
  }

  getProductByCat(c) {
    this.currentCategorie = c;
    this.router.navigateByUrl('/prod/2/'+c.id);
  }

  onProductSelected() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/prod/1/0");
  }

  onProductsPromo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/prod/3/0");
  }

  onProductsDispo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/prod/4/0");
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl("/login")
  }
}
