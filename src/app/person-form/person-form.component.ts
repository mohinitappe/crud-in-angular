import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';

import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personForm!: FormGroup;
  selectedFile!: File;
  formTitle: string = 'Add Person';
  isEdit: boolean =false;
  id! :string;
  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      console.log(param)
      this.id = param.id
      if(this.id) {
        this.isEdit = true;
        this.formTitle = 'Edit Person'
        this.getPersonDetails(param.id)
      }
    })
   }

  ngOnInit(): void {

    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      avatar: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  getPersonDetails(id: number) {
    this.personService.getPersonById(id).subscribe((data: any) => {
      const personList = data;
      this.personForm.patchValue({ ...personList });
    })
  }

  onSubmit(): void {
    
    if(this.isEdit) {
      this.personService.updatePerson(this.id,this.personForm.value).subscribe((response) => {
        console.log(response, 'Person edited successfully');
        this.router.navigate(['/']);
      });
    } else {
      console.log(this.personForm.value)
      this.personService.addPerson(this.personForm.value).subscribe((response) => {
        console.log(response, 'Person added successfully');
        this.router.navigate(['/']);
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]
    this.personForm.patchValue({ avatar: file.name});
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
