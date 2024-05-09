import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() person: any;
  @Input() index: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  editPerson(id: any): void {
    this.router.navigate(['/edit',id]);
  }

}
