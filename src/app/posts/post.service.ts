import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignalWithError } from '../utility/signal.fn';
import { Post } from './post.model';
import { delay } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  http = inject(HttpClient);

  postUrl:string = 'https://jsonplaceholder.typicode.com/posts';

  private posts$ = this.http.get<Post[]>(this.postUrl).pipe(delay(2000));
  postData = toSignalWithError<Post[]>(this.posts$);
}
