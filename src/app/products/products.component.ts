import {Component, OnInit} from '@angular/core';
import {CatalogService} from '../catalog.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private prod;
  private editPhoto: boolean;
  private currentProduct;
  private selectedFile;
  private progress: number;
  private currentFileUpload;
  private title:string;
  private timestamp: number;

  constructor(private catService:CatalogService, private route:ActivatedRoute, private router:Router, public authService: AuthenticationService) {

  }

  ngOnInit() {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url=val.url;
        let p1 = this.route.snapshot.params.p1;
        if(p1==1){
          this.title = "A la une"
          this.getProducts("/prod/search/selectedProducts")
        }else if(p1==2){
          let idCat = this.route.snapshot.params.p2;
          this.title = "Produit de la catégorie "+idCat
          this.getProducts("/cat/"+idCat+"/products")
        }else if(p1==3){
          this.title = "Produits en promotion"
          this.getProducts("/prod/search/promoProducts")
        }else if(p1==4){
          this.title = "Produits disponibles"
          this.getProducts("/prod/search/dispoProducts")
        }
        else if(p1==5){
          this.title = "Recherche ..."
          this.getProducts("/prod/search/dispoProducts")
        }
        // console.log(url)
      }
    })
    let p1 = this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts("/prod/search/selectedProducts")
    }
  }

  private getProducts(url) {
    this.catService.getRessource(url)
      .subscribe(data=>{
        this.prod=data;
      },err=>{
        console.log(err);
      })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files;

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFile.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(event=>{
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);
      }else if (event instanceof HttpResponse){
        this.timestamp = Date.now();
      }
    },err=>{
      alert("Problème de chargement!")
    })
    this.selectedFile = undefined
  }

  getTs() {
    return this.timestamp;
  }

  isAdmin() {
    return this.authService.isAdmin()
  }
}
