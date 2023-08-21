import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent {






  allfoods:any=[]
  allpizza:any=[]
  allsauce:any=[]
  alldrink:any=[]
  allsalad:any=[]
allpasta:any=[]
alldessert:any=[]
  searchterm:string=''
  cartitems:Number=0
  user:any=[]
  loginstatus:boolean=false
  getallclicked:boolean=false
  getpizzaclicked:boolean=false
  getsaladclicked:boolean=false
  getdrinkclicked:boolean=false
  getsauceclicked:boolean=false
  getpastaclicked:boolean=false
  getdessertclicked:boolean=false

  constructor (private api:ApiService,private foodrouter:Router){
  }

  ngOnInit() : void {
    if(!localStorage.getItem('token')){
      this.foodrouter.navigateByUrl('')
    }
    else{
     this.loginstatus=true  
    this.api.cartitemcount.subscribe((result:any)=>{
    this.cartitems=result
    })
    this.api.getfoods()
    .subscribe((result:any)=>{
      console.log(result);
      this.allfoods=result
      this.user = localStorage.getItem('username')
    })

    this.api.searchterm.subscribe((result:any)=>{
      this.searchterm=result
      console.log(this.searchterm);
      
    })
  }
}

  search(event:any){
    this.api.searchterm.next(event.target.value)
  }

  addtocart(foods:any){
    Object.assign(foods, {quantity:1})
    console.log(foods);
    this.api.addtocart(foods) 
    .subscribe((result:any)=>{
      this.api.cartcount()
      this.api.cartitemcount.subscribe((result:any)=>{
        this.cartitems=result
      })
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
    
  }

  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
      this.api.emptycart().subscribe((result:any)=>{

      })
      this.foodrouter.navigateByUrl('foodx/login')
  }
  
  getpizzaclick(){
    this.getpizzaclicked=true
    this.getallclicked=true
    this.getsaladclicked=false
    this.api.getpizza()
    .subscribe((result:any)=>{
      this.allpizza=result
      
    })
  }

  getallclick(){
    this.getallclicked=false
    this.getpizzaclicked=false
    this.getsaladclicked=false
    this.getdrinkclicked=false
    this.getsauceclicked=false
    this.getpastaclicked=false
    this.getdessertclicked=false
    
    this.api.getfoods()
    .subscribe((result:any)=>{
      console.log(result);
      this.allfoods=result
    })
  }

  getsaladclick(){
    this.getallclicked=true
    this.getpizzaclicked=false
    this.getsaladclicked=true
    this.getdrinkclicked=false
    this.getsauceclicked=false
    this.getpastaclicked=false
    this.getdessertclicked=false
    this.api.getsalad()
    .subscribe((result:any)=>{
      console.log(result);
      this.allsalad=result
    })
  }

  getdrinkclick(){
    this.getallclicked=true
    this.getpizzaclicked=false
    this.getsaladclicked=false
    this.getsauceclicked=false
    this.getdrinkclicked=true
    this.getpastaclicked=false
    this.getdessertclicked=false
    this.api.getdrink()
    .subscribe((result:any)=>{
      console.log(result);
      this.alldrink=result
    })
  }

 getsauceclick(){
  this.getallclicked=true
  this.getpizzaclicked=false
  this.getsaladclicked=false
  this.getsauceclicked=true
  this.getdrinkclicked=false
  this.getpastaclicked=false
  this.getdessertclicked=false

  this.api.getsauce()
  .subscribe((result:any)=>{
      console.log(result);
      this.allsauce=result
    })
 }
getpastaclick()
{
  this.getallclicked=true
  this.getpizzaclicked=false
  this.getsaladclicked=false
  this.getsauceclicked=false
  this.getdrinkclicked=false
  this.getpastaclicked=true
  this.getdessertclicked=false
  this.api.getpasta().subscribe
  ((result:any)=>{
    console.log(result);
    this.allpasta=result
  })
}

getdessertclick()
{
  this.getallclicked=true
  this.getpizzaclicked=false
  this.getsaladclicked=false
  this.getsauceclicked=false
  this.getdrinkclicked=false
  this.getdessertclicked=true

  this.api.getdessert().subscribe
  ((result:any)=>{
    console.log(result);
    this.alldessert=result
  })
}

foodz()
{
  this.foodrouter.navigateByUrl('')
}

}