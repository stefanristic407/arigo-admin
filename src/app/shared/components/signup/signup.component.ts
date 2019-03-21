import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidationService } from '../../services/form-validation.service';
import { BlockUIService } from '../../services/block-ui.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  passwordVisibility: boolean;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {
  }

  ngOnInit() {
    this.passwordVisibility = false;
    this.submitted = false;
    this.form = this.fb.group({
      accept: false,
      firstName: ['', [Validators.required, this.formValidationService.isBlank]],
      lastName: ['', [Validators.required, this.formValidationService.isBlank]],
      birthday: ['', [Validators.required, this.formValidationService.isAdault]],
      username: ['', [Validators.required, this.formValidationService.isBlank]],
      email: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          Validators.minLength(8)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          this.formValidationService.arePasswordsMismatching
        ]
      ]
    });
  }

  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  togglePasswordVisibility(event) {
    if (event.type === 'mouseleave' && !this.passwordVisibility) {
      return event.preventDefault();
    }
    this.passwordVisibility = !this.passwordVisibility;
    return event.preventDefault();
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted = true;
      this.blockUIService.setBlockStatus(true);
      this.commonService.signup(this.form.value).subscribe(
        (res: any) => {
          this.blockUIService.setBlockStatus(false);
          this.snackBar
            .open(res.msg, 'Dismiss', {
              duration: 1500
            })
            .afterOpened()
            .subscribe(() => {
              this.dialogRef.close();
            });
        },
        (err: HttpErrorResponse) => {
          this.submitted = false;
          this.blockUIService.setBlockStatus(false);
          this.snackBar
            .open(err.error.msg, 'Dismiss', {
              duration: 4000
            })
            .afterDismissed()
            .subscribe(() => {});
        }
      );
    }
  }
}
