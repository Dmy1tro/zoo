import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRation } from 'src/app/core/interfaces/ration.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { configureToastr, getButtonStateImport, hasPatternErrorImport, hasCustomErrorImport } from 'src/app/core/helpers';
import { ToastrService } from 'ngx-toastr';
import { RationService } from '../common/ration.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { enums } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-ration',
  templateUrl: './ration.component.html',
  styleUrls: ['./ration.component.css']
})
export class RationComponent implements OnInit, OnDestroy {

  rations: IRation[];
  rationForm: FormGroup;

  private update = false;
  private animalId: number;
  private rationId: number;
  private destroy$ = new Subject<any>();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private rationService: RationService) { }

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.params.id;
    this.createForm();
    this.getRations();
    configureToastr(this.toastr);
  }

  createForm(): void {
    this.rationForm = this.fb.group({
      foodName: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.maxLength(200)]]
    });
  }

  getRations() {
    this.rationService.getRationsForAnimal(this.animalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.rations = data);
  }

  selectRation(id) {
    const ration = this.rations.find(x => x.rationId === id);

    this.update = true;
    this.rationId = ration.rationId;
    this.rationForm.get('foodName').setValue(ration.foodName);
    this.rationForm.get('description').setValue(ration.description);
  }

  onSubmit(): void {
    if (this.rationForm.valid) {
      this.update ? this.createRation() : this.updateRation();
    } else {
      this.rationForm.markAllAsTouched();
    }
  }

  createRation() {
    this.rationService.createRation({
      animalId: this.animalId,
      ...this.rationForm.value
    })
      .pipe(
        finalize(() => this.getRations()),
        takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success('Ration created', enums.toastrTitle.Success);
          this.resetForm();
        },
        (err) => {
          this.toastr.error('Failed to create ration', enums.toastrTitle.Error);
          console.log(err);
        }
      );
  }

  updateRation() {
    this.rationService.updateRation({
      rationId: this.rationId,
      animalId: this.animalId,
      ...this.rationForm.value
    })
      .pipe(
        finalize(() => this.getRations()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.resetForm();
          this.toastr.success('Ration updated', enums.toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed to update ration', enums.toastrTitle.Error);
          console.log(err);
        }
      );
  }

  deleteRation(id) {
    this.rationService.deleteRation(id)
      .pipe(
        finalize(() => this.getRations()),
        takeUntil(this.destroy$))
      .subscribe(
        () => this.toastr.success('Ration deleted', enums.toastrTitle.Success),
        (err) => {
          this.toastr.error('Failed to delete ratin', enums.toastrTitle.Error);
          console.log(err);
        }
      );
  }

  resetForm(): void {
    this.rationForm.reset();
    this.update = false;
    this.rationId = null;
  }

  getButtonState = (): string =>
    getButtonStateImport(this.update, 'Ration')

  hasCustomError = (form: FormGroup, control: string): boolean =>
    hasCustomErrorImport(form, control)

  hasPatternError = (form: FormGroup, control: string): boolean =>
    hasPatternErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
