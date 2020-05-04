import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
