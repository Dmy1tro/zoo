import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { IEnumSelect } from './interfaces/enum-select.interface';
import { DataAction } from './constants/enums';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';

export function enumSelector(data): IEnumSelect[] {
    return Object.keys(data)
        .map(key => ({ value: key, title: data[key] }));
}

export const convertToISOFormat = (date, datePipe: DatePipe): string => {
    return datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000').concat('Z');
};

export const configureToastr = (toastr: ToastrService) => {
    toastr.toastrConfig.maxOpened = 2;
    toastr.toastrConfig.timeOut = 1780;
};

export const deleteConfirmImport = (name: string, translate: (str: string) => string): boolean =>
    confirm(translate(`Are-you-sure-you-want-to-delete`) + ' ' + `${name}` + `?`);

export const getButtonStateImport = (update: boolean, name: string): string =>
    update ? `Update` : `Create`;

export const refreshDataImport = (action: string, arr: Array<any>, item, predicate: (val) => boolean): void => {
    switch (action) {
        case DataAction.Create: {
            arr.push(item);
            break;
        }
        case DataAction.Update: {
            const index = arr.findIndex(predicate);
            arr[index] = item;
            break;
        }
        case DataAction.Delete: {
            const index = arr.findIndex(predicate);
            arr.splice(index, 1);
        }
    }
};

export const hasCustomErrorImport = (form: FormGroup, control: string): boolean =>
    form.get(`${control}`).invalid && (form.get(`${control}`).dirty || form.get(`${control}`).touched);

export const hasPatternErrorImport = (form: FormGroup, control: string): boolean =>
    (form.get(`${control}`).invalid && form.get(`${control}`).dirty);

export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
    }
}
