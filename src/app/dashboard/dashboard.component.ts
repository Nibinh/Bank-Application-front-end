
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js"
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  isCollapse:boolean=false
  user:string=''
  currentAcno:Number=0
  balance:number=0
  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''
  logoutDiv:boolean=false
  acno:any=""
  deleteConfirm:boolean=false
  deleteSpinnerDiv
  
  
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  depositMsg:string=''

  fundTransferForm=this.fb.group({
    //array
    toAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
    
  })
  

  constructor(private api:ApiService, private fb:FormBuilder,private router:Router){}

  ngOnInit(){

    if(!localStorage.getItem("token")){
      alert("Please login!!")
      //navigate to login
      this.router.navigateByUrl('')
    }
    if(localStorage.getItem("username")){
      this.user=localStorage.getItem("username") ||''
    
    }
    

  }

  
  collapse(){
    this.isCollapse=!this.isCollapse
  }

  getBalance(){
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '') 
      this.api.getBalance(this.currentAcno)
      .subscribe((result:any)=>{
        console.log(result)
        this.balance=result.balance
      })
    }
  }

  

  deposit(){
    
    if(this.depositForm.valid){
      let amount= this.depositForm.value.amount
      this.currentAcno= JSON.parse(localStorage.getItem("currentAcno") || '') 
      this.api.deposit(this.currentAcno,amount)
      .subscribe(
        // success
        (result:any)=>{
        console.log(result)
        this.depositMsg=result.message
        setTimeout(()=>{
          this.depositForm.reset()
          this.depositMsg=''
        },4000)
      },
      // error
      (result:any)=>{
        this.depositMsg=result.error.message
      })
    }
    else{
      alert('invalid Form')
    }
  }

  //showconfetti
  showconfetti(source:any){
    party.confetti(source)

  }
  //transfer()
  transfer(){
    if(this.fundTransferForm.valid){
      let toAcno=this.fundTransferForm.value.toAcno
      let pswd=this.fundTransferForm.value.pswd
      let amount=this.fundTransferForm.value.amount
      //make api call for fund transfer
      this.api.fundTransfer(toAcno,pswd,amount)
      .subscribe(
        //success
        (result:any)=>{
          this.fundTransferSuccessMsg=result.message
        },
        //clienteror
        (result:any)=>{
          this.fundTransferErrorMsg=result.error.message
        }
      )

    }
    else{

    }

  }
  //clear fundTransferForm
  clearFundTransferForm(){
    this.fundTransferErrorMsg=''
    this.fundTransferSuccessMsg=''
    this,this.fundTransferForm.reset()
  }

  //logout
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("username")
    this.logoutDiv=true

    setTimeout(()=>{
       //navigate to login page
    this.router.navigateByUrl('')
    this.logoutDiv=false
    },2000)
  }
  
  //deleteaccount from nav bar
  deleteAccountFromNavBar(){
    this.acno=localStorage.getItem("currentAcno")
    this.deleteConfirm=true
  }

  onCancel(){
    this.acno=""
    this.deleteConfirm=false
  }

  onDelete(event:any){
    let deleteAcno=JSON.parse(event)
    this.api.deleteAccount(deleteAcno)
    .subscribe((result:any)=>{
      this.acno=""
      localStorage.removeItem("token")
      localStorage.removeItem("currentAcno")
      localStorage.removeItem("username")
      this.deleteSpinnerDiv=true
      setTimeout(()=>{
        //navigate to login page
     this.router.navigateByUrl('')
     this.deleteSpinnerDiv=false
     
     },2000)

    },(result:any)=>{
      alert(result.error.message)
    })
  }



}
