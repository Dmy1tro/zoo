(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"2yVh":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a=n("NgpD"),i=n("lJxs"),r=n("fXoL"),p=n("tk/3");let s=(()=>{class t{constructor(t){this.httpClient=t}getAnimals(){return this.httpClient.get(a.a.animals).pipe(Object(i.a)(t=>(t.forEach(this.mapAnimal),t)))}getAnimal(t){return this.httpClient.get(a.a.animals+t).pipe(Object(i.a)(this.mapAnimal))}createAnimal(t){return this.httpClient.post(a.a.animals,t)}updateAnimal(t){return this.httpClient.put(a.a.animals,t)}deleteAnimal(t){return this.httpClient.delete(a.a.animals+t)}mapAnimal(t){return t.picture=t.picture&&t.contentType?`data:${t.contentType};base64,${t.picture}`:"./assets/images/animal_default.png",t}}return t.\u0275fac=function(e){return new(e||t)(r.Zb(p.b))},t.\u0275prov=r.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"483E":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a=n("NgpD"),i=n("lJxs"),r=n("fXoL"),p=n("tk/3");let s=(()=>{class t{constructor(t){this.httpClient=t}all(){return this.httpClient.get(a.a.employees).pipe(Object(i.a)(t=>(t.forEach(this.mapEmployee),t)))}get(t){return this.httpClient.get(a.a.employees+t).pipe(Object(i.a)(this.mapEmployee))}profile(){return this.httpClient.get(a.a.employeeProfile).pipe(Object(i.a)(this.mapEmployee))}update(t){return this.httpClient.put(a.a.employees,t)}updatePicture(t){return this.httpClient.put(a.a.changePicture,t)}delete(t){return this.httpClient.delete(a.a.employees+t)}mapEmployee(t){return t.picture=t.picture&&t.contentType?`data:${t.contentType};base64,${t.picture}`:"./assets/images/userAvatar.png",t}}return t.\u0275fac=function(e){return new(e||t)(r.Zb(p.b))},t.\u0275prov=r.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"4Q6e":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("fXoL"),i=n("kar1");let r=(()=>{class t{constructor(t){this.authService=t}canActivate(t,e){return this.authService.isManager||this.authService.isAdmin}canLoad(t){return this.authService.isManager||this.authService.isAdmin}}return t.\u0275fac=function(e){return new(e||t)(a.Zb(i.a))},t.\u0275prov=a.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);