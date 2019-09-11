import { Component, OnInit } from '@angular/core';
import { IComments } from '../comments';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';


@Component({
  selector: 'pm-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  comments: IComments[] = [];
  filteredComments: IComments[] = [];
  errorMessage = '';
  @Input() product;




  constructor(private productService: ProductService ) { }

  ngOnInit(): void {

    this.productService.getComments().subscribe({
      next: comments => {
        this.comments = comments;
        this.filteredComments = this.comments;

       }
       ,
      error: err => this.errorMessage = err
    });
  }








}
