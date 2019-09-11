import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { IComments } from '../comments';
import { ProductService } from '../product.service';
 import { Observable } from 'rxjs';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-commentform',
  templateUrl: './commentform.component.html',
  styleUrls: ['./commentform.component.css']
})
export class CommentformComponent implements OnInit {
  stars: number[] = [1,2,3,4,5];
  bikeform: FormGroup;
  validMessage: string = "";
  @Input() product;
  @Output() notify = new EventEmitter();
  array: string[];


  constructor(private productService: ProductService) {


  }

  ngOnInit() {

    this.bikeform = new FormGroup({
      id_movie: new FormControl(),
      commenter: new FormControl(),
      comment_title: new FormControl(),
      star_rating: new FormControl(),
      comment: new FormControl(),
      overall_rating: new FormControl()
    });

    this.bikeform.controls['id_movie'].patchValue(this.product.id);

  }

  submitRegistration(){
    if(this.bikeform.valid){
      this.validMessage = "Your comment has been submitted. Thank you!";
      this.productService.postComment(this.bikeform.value).subscribe(
        data =>{
          this.bikeform.reset();
          return true;
        },
        error =>{
           return Observable.throw(error);
        }
      )
    }else{
      this.validMessage = "Please fill out the form before submitting!.";
    }
  }


}
