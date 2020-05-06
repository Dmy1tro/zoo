import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

export function enumSelector(data) {
    return Object.keys(data)
        .map(key => ({ value: data[key], title: data[key] }));
}

export const convertToISOFormat = (date, datePipe: DatePipe): string => {
    return datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000').concat('Z');
};

export const configureToastr = (toastr: ToastrService) => {
    toastr.toastrConfig.maxOpened = 1;
    toastr.toastrConfig.timeOut = 1500;
};

export const getButtonStateImport = (update: boolean, name: string): string =>
    update ? `Update ${name}` : `Create ${name}`;

export const hasCustomErrorImport = (form: FormGroup, control: string): boolean =>
    form.get(`${control}`).invalid && (form.get(`${control}`).dirty || form.get(`${control}`).touched);

export const hasPatternErrorImport = (form: FormGroup, control: string): boolean =>
    (form.get(`${control}`).invalid && form.get(`${control}`).dirty);
