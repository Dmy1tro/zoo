import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { IEnumSelect } from './interfaces/enum-select.interface';

export function enumSelector(data): IEnumSelect[] {
    return Object.keys(data)
        .map(key => ({ value: data[key], title: data[key] }));
}

export const convertToISOFormat = (date, datePipe: DatePipe): string => {
    return datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000').concat('Z');
};

export const configureToastr = (toastr: ToastrService) => {
    toastr.toastrConfig.maxOpened = 2;
    toastr.toastrConfig.timeOut = 1780;
};

export const deleteConfirmImport = (name: string): boolean =>
    confirm(`Are you sure you want to delete ${name}?`);

export const getButtonStateImport = (update: boolean, name: string): string =>
    update ? `Update ${name}` : `Create ${name}`;

export const refreshDataImport = (action: string, arr: Array<any>, item, predicate: (val) => boolean): void => {
    if (action === 'create') {
        arr.push(item);
    } else if (action === 'update') {
        const index = arr.findIndex(predicate);
        arr[index] = item;
    }
};

export const hasCustomErrorImport = (form: FormGroup, control: string): boolean =>
    form.get(`${control}`).invalid && (form.get(`${control}`).dirty || form.get(`${control}`).touched);

export const hasPatternErrorImport = (form: FormGroup, control: string): boolean =>
    (form.get(`${control}`).invalid && form.get(`${control}`).dirty);
