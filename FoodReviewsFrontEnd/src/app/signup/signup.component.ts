import { Component, OnInit } from '@angular/core';
import {SignupService} from "../services/signup.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  regiForm: FormGroup; 
  UserName : String;
  Email:String;
  Password:String; 
  UserType:String;
  Profile:string;
  IsAccepted:Number = 0;

 

  constructor(private fb: FormBuilder , private service: SignupService , private router: Router) {
   // To initialize FormGroup  
   this.regiForm = fb.group({
    'UserName' : [null, Validators.required],  
    'Email':[null, Validators.compose([Validators.required,Validators.email])], 
    'Password' : [null, Validators.required],  
    'UserType' : [null, Validators.required],  
    'Profile' : [null, Validators.required], 
    'IsAccepted':[null]
  }); 
   }
  // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  }  
  
     // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    console.log(form.value); 
     this.service.post('signup' ,form.value).subscribe(res =>{
       if(res.status == 200){
          localStorage.setItem('Token',res.token);
          localStorage.setItem('signups',form.value.Email);
          if (form.value.UserType === "NormalUser") {
            this.router.navigate(['user']);
          } else {
            this.router.navigate(['restaurant']);
          }
          
          //console.log(form.value)
       }
     });
  } 
  ngOnInit() {
  }

}
