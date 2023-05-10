import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faMinusCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { OrderFormService } from 'src/app/services/order-form.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit{

  faMinusCircle = faMinusCircle;
  faChevronDown = faChevronDown;
  
  open = false;
  otherProduct = false;
  minDate: Date;

  dc = ['No Data'];
  payment_types=['Cash H+1','Cash H+3','Cash H+7','Transfer H+1','Transfer H+3','Transfer H+7'];

  userForm = this.fb.group({
    name: ['', Validators.required],
    dc: ['', Validators.required],
  });
  
  employeeName=[];

  products: any[] = [{
    id:1,
    itemId:0,
    name: '',
    unit: '',
    qty: '',
    price:'',
    total_price: 0,
  }];

  productsType = [
    {
      id:1,
      name:'Morning Dew Milk',
    },
    {
      id:2,
      name:'Le Minerale 600ml'
    },
    {
      id:3,
      name:'Greenfields Full Cream Milk 1L'
    }]

  unit:any = [{
    id:1,
    name:'',
    price:0,
  }];

  morningUnit: any = [
    {
      id:1,
      name:'',
      price:0,
    },
    {
      id:this.unit.length+1,
      name:'Karton',
      price:90000
    },
    {
      id:this.unit.length+2,
      name:'Pak',
      price:50000
    },
    {
      id:this.unit.length+3,
      name:'Pcs',
      price:21000
    }
  ]

  mineraleUnit:any =[
    {
      id:1,
      name:'',
      price:0,
    },
    {
      id:this.unit.length+1,
      name:'Karton',
      price:70000
    },
    {
      id:this.unit.length+2,
      name:'Pak',
      price:45000
    }
  ]

  greenfieldUnit:any = [
    {
      id:1,
      name:'',
      price:0,
    },
    {
      id:this.unit.length+1,
      name:'Karton',
      price:60000
    },
    {
      id:this.unit.length+2,
      name:'Pak',
      price: 23000
    },
    {
      id:this.unit.length+3,
      name:'Pcs',
      price:6000
    }
  ]
  
  price: number;
  total: number = 0;

  constructor(
    private fb: FormBuilder, 
    private orderService: OrderFormService
  ) {}
  
  ngOnInit(): void {
    this.minDate = new Date();
    this.orderService.getName().subscribe((response:any)=>{
      next: this.employeeName = response.data;
      error:console.log(Error);
    })
  }

  createOrder(){
    this.open = true;
  }

  setDcValue(){
    this.dc = ['Jakarta','Tangerang'];
  }

  addProduct(){
    this.otherProduct = true;
    
    this.products.push({
      id: this.products.length + 1,
      itemId:0,
      name: '',
      unit: '',
      qty: '',
      price:'',
      total_price: '',
    });

    this.unit = [{
      id:1,
      name:'',
      price:0,
    }];
  }

  removeProduct(i:number){
    this.products.splice(i, 1);
    let productDetail = this.products.find((x : { id : any}) => x.id == i);
    this.total = this.total - productDetail.total_price; 
  }

  changeUnit(itemId:number){    
    if(itemId == 1){    
      this.unit = this.greenfieldUnit;
    } else if (itemId == 2){
      this.unit = this.mineraleUnit;
    } else {
      this.unit = this.greenfieldUnit;
    } 
  }

  changePrice(target:any, productId:number){
    let productDetail = this.products.find((x : { id : any}) => x.id == productId);
    let priceValue =  this.unit.find((x: { id: any; }) => x.id == target.value);
    productDetail.price = priceValue.price;
  }

  updateTotal(qty:number, productId:any){
    let productDetail = this.products.find((x : { id : any}) => x.id == productId);
    productDetail.qty = qty;
    productDetail.total_price = qty * productDetail.price;
    this.total = this.products.reduce((a: any,value: any)=>{
      return a + value.total_price
    },0)
  }

  submit(){
    console.log('submit');
  }


}
