import { environment } from 'src/environments/environment';

// tslint:disable-next-line:no-namespace
export namespace urls {
    // account
    export const account = environment.apiUrl + 'account/';
    export const accountSignIn = account + 'sign-in/';
    export const accountChangePassword = account + 'change-password/';

    // animal
    export const animals = environment.apiUrl + 'animals/';

    // animalTypes
    export const animalTypes = environment.apiUrl + 'animalTypes/';

    // device
    export const devices = environment.apiUrl + 'devices/';
    export const devicesForAnimal = devices + 'for-animal/';

    // device-records
    export const deviceRecords = environment.apiUrl + 'device-records/';

    // employee
    export const employees = environment.apiUrl + 'employees/';
    export const employeeProfile = employees + 'profile/';
    export const changePicture = employees + 'change-avatar/';

    // jobs
    export const jobs = environment.apiUrl + 'jobs/';
    export const jobsForEmployee = jobs + 'for-employee/';
    export const jobsStart = jobs + 'start-job/';
    export const jobsFinish = jobs + 'finish-job/';

    // ration
    export const rations = environment.apiUrl + 'rations/';
    export const rationsForAnimal = rations + 'for-animal/';
}
