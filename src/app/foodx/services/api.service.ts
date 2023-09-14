import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='https://food-app-0pak.onrender.com'
  constructor(private http:HttpClient) { }

  searchterm= new BehaviorSubject('')
  cartitemcount= new BehaviorSubject(0)
  cartitems:any=[]

  appendtoken(){
    let token=localStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token){
      headers= headers.append('verify',token)
      options.headers=headers
    }
    return options
  }

  getfoods(){
    return this.http.get(`${this.base_url}/foodz/foods`,this.appendtoken())
  }

  viewfood(id:any){
    return this.http.get(`${this.base_url}/foodz/viewfood/${id}`,this.appendtoken())
  }

  addtocart(foods:any){
    const body={
      id:foods.id,
      name:foods.name,
      price:foods.price,
      image:foods.image,
      quantity:foods.quantity,
    }
    return this.http.post(`${this.base_url}/foodz/addtocart`,body,this.appendtoken())

  }

  getcart(){
    return this.http.get(`${this.base_url}/foodz/getcartitems`,this.appendtoken())
  }

  emptycart(){
    return this.http.delete(`${this.base_url}/foodz/emptycart`)
  }
  

  cartcount(){
    this.getcart().subscribe((result:any)=>{
      this.cartitemcount.next(result.length)
    })
  }

  logout(){
    this.emptycart().subscribe((result:any)=>{
      this.cartitems=result
    })
  }
  removecartitem(id:any){
    return this.http.delete(`${this.base_url}/foodz/removeitem/${id}`,this.appendtoken())
  }

  incart(id:any){
    return this.http.get(`${this.base_url}/foodz/incart/${id}`)
  }
  decart(id:any){
    return this.http.get(`${this.base_url}/foodz/decart/${id}`)
  }

  signup(inputdata:any){
    return this.http.post(`${this.base_url}/foodz/register`,inputdata)
  }
  adminlogin(username:any,password:any){
    const body={
    username,
    password
    }
   return this.http.post(`${this.base_url}/foodz/adminlogin`,body) 
  }
  userlogin(username:any,password:any){
    const body={
    username,
    password
    }
   return this.http.post(`${this.base_url}/foodz/userlogin`,body) 
  }

  addproduct(id:any,name:any,image:any,price:any,description:any,category:any){
    const body={
      id,
      name,
      image,
      price,
      description,
      category
    }
    return this.http.post(`${this.base_url}/foodz/addfood`,body)
  }

  getusers(){
    return this.http.get(`${this.base_url}/foodz/getuserdetails`)
  }

  removeuser(username:any){
    return this.http.delete(`${this.base_url}/foodz/removeuser/${username}`)
  }

  showfoods(){
    return this.http.get(`${this.base_url}/foodz/showfoods`)
  }
  removefooddb(id:any){
    return this.http.delete(`${this.base_url}/foodz/removedbfood/${id}`)
  }

  submituseraddress(name:any,username:any,flat:any,street:any,state:any){
    const body={
      name,
      username,
      flat,
      street,
      state
    }
    return this.http.post(`${this.base_url}/foodz/useraddress`,body)
  }

  getpizza(){
    return this.http.get(`${this.base_url}/foodz/getpizza`)
  }

  getsalad(){
    return this.http.get(`${this.base_url}/foodz/getsalad`)
  }
  getdrink(){
    return this.http.get(`${this.base_url}/foodz/getdrink`)
  }
  getsauce(){
    return this.http.get(`${this.base_url}/foodx/getsauce`)
  }
  getpasta(){
    return this.http.get(`${this.base_url}/foodz/getpasta`)
  }

  getdessert(){
    return this.http.get(`${this.base_url}/foodz/getdessert`)
  }
}