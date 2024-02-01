import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.view.html',
  styleUrls: [
    './user-create.view.scss',
    './creat.scss'
  ]
  // styleUrl: './user-create.view.scss'
})
export class UserCreateView implements OnInit {
  userEmail: string = ''; // Asigna un valor por defecto

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userEmail = params.get('userEmail') || '';
    });
  }
}
