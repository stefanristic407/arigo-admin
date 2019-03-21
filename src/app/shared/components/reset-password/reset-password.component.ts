import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidationService } from '../../services/form-validation.service';
import { BlockUIService } from '../../services/block-ui.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  submitted: boolean;
  passwordVisibility: boolean;
  form: FormGroup;
  private userId: string;
  private token: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formValidationService: FormValidationService,
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userId = this.data.userId;
    this.token = this.data.token;
    this.passwordVisibility = false;
    this.submitted = false;
    this.form = this.fb.group({
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
      this.commonService
        .resetPassword(this.userId, this.token, this.form.value)
        .subscribe(
          (res: any) => {
            this.blockUIService.setBlockStatus(false);
            this.snackBar
              .open(res.msg, 'Dismiss')
              .afterOpened()
              .subscribe(() => {
                this.dialogRef.close();
                this.router.navigateByUrl('/');
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
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
