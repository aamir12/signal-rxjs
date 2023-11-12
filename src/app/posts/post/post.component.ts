import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../post.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'swv-post',
  standalone:true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports:[NgIf,NgFor]
})
export class PostComponent implements OnInit{
  postService = inject(PostService);
  postData = this.postService.postData;

  ngOnInit(): void {
    console.log(this.postData.error())
  }

}
