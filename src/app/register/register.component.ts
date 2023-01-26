import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

  }

  register(){

    if(this.registerForm.valid){
      let acno=this.registerForm.value.acno
      let pswd=this.registerForm.value.pswd
      let uname=this.registerForm.value.uname

      this.api.register(acno,pswd,uname)
      .subscribe((result:any)=>{
       alert(result.message)
      //  navigate to loginpage
      this.router.navigateByUrl('')
      },
      (result:any)=>{
        alert(result.error.message)
      })
    }
    else{
      alert('Form invalid hehh')
    }
    
  }

}
