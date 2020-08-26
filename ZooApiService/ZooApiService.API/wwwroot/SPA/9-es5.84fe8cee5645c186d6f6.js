function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var c=t[i];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{A9Qp:function(e,t,i){"use strict";i.r(t),i.d(t,"DeviceModule",(function(){return L}));var c,n=i("ofXK"),a=i("PCNd"),r=i("tyNb"),s=i("XNiG"),o=i("1G5W"),l=i("Ojd6"),b=i("wFOr"),d=i("3Pt+"),u=i("0IaG"),m=i("fXoL"),v=i("NgpD"),f=i("tk/3"),h=((c=function(){function e(t){_classCallCheck(this,e),this.httpClient=t}return _createClass(e,[{key:"getDevices",value:function(){return this.httpClient.get(v.a.devices)}},{key:"getDevice",value:function(e){return this.httpClient.get(v.a.devices+e)}},{key:"getDevicesForAnimal",value:function(e){return this.httpClient.get(v.a.devicesForAnimal+e)}},{key:"createDevice",value:function(e){return this.httpClient.post(v.a.devices,e)}},{key:"updateDevice",value:function(e){return this.httpClient.put(v.a.devices,e)}},{key:"deleteDevice",value:function(e){return this.httpClient.delete(v.a.devices+e)}}]),e}()).\u0275fac=function(e){return new(e||c)(m.Zb(f.b))},c.\u0275prov=m.Lb({token:c,factory:c.\u0275fac,providedIn:"root"}),c),p=i("5eHb"),C=i("sYmb"),y=i("bTqV"),g=i("kmnG"),U=i("NFeN"),V=i("qFsG"),k=i("d3UM"),D=i("FKr1");function F(e,t){1&e&&(m.Vb(0,"mat-error"),m.Cc(1),m.ic(2,"translate"),m.ic(3,"translate"),m.Ub()),2&e&&(m.Cb(1),m.Fc(" ",m.jc(2,2,"Title")," ",m.jc(3,4,"is-required")," "))}function I(e,t){if(1&e&&(m.Vb(0,"mat-option",15),m.Cc(1),m.ic(2,"translate"),m.Ub()),2&e){var i=t.$implicit;m.nc("value",i.value),m.Cb(1),m.Ec(" ",m.jc(2,2,i.title)," ")}}function j(e,t){1&e&&(m.Vb(0,"mat-error"),m.Cc(1),m.ic(2,"translate"),m.ic(3,"translate"),m.Ub()),2&e&&(m.Cb(1),m.Fc(" ",m.jc(2,2,"Device-type")," ",m.jc(3,4,"is-required")," "))}var O,S,w=((S=function(){function e(t,i,c,n,a,r){var o=this;_classCallCheck(this,e),this.fb=t,this.deviceService=i,this.data=c,this.matDialogRef=n,this.toastr=a,this.translate=r,this.destroy$=new s.a,this.getButtonState=function(){return o.translate.instant(Object(l.f)(null!=o.data.smartDeviceId,"Device"))},this.hasCustomError=function(e,t){return Object(l.g)(e,t)}}return _createClass(e,[{key:"ngOnInit",value:function(){this.deviceTypes=Object(l.e)(b.b),this.createForm(),Object(l.b)(this.toastr)}},{key:"createForm",value:function(){this.deviceForm=this.fb.group({name:[this.data.name,d.q.required],deviceType:[this.data.deviceType,d.q.required]})}},{key:"onSubmit",value:function(){this.deviceForm.valid?null==this.data.smartDeviceId?this.create():this.update():this.deviceForm.markAllAsTouched()}},{key:"create",value:function(){var e=this;this.deviceService.createDevice({name:this.deviceForm.value.name,animalId:this.data.animalId,deviceType:this.deviceForm.value.deviceType}).pipe(Object(o.a)(this.destroy$)).subscribe((function(t){e.toastr.success(e.translate.instant("Created"),e.translate.instant("Success")),e.matDialogRef.close({action:b.a.Create,data:t.createdId})}),(function(t){e.toastr.error(e.translate.instant("Failed"),e.translate.instant("Error")),console.log(t)}))}},{key:"update",value:function(){var e=this;this.deviceService.updateDevice({smartDeviceId:this.data.smartDeviceId,newName:this.deviceForm.value.name,deviceType:this.deviceForm.value.deviceType}).pipe(Object(o.a)(this.destroy$)).subscribe((function(){e.toastr.success(e.translate.instant("Updated"),e.translate.instant("Success")),e.matDialogRef.close({action:b.a.Update,data:e.data.smartDeviceId})}),(function(t){e.toastr.error(e.translate.instant("Failed"),e.translate.instant("Error")),console.log(t)}))}},{key:"resetForm",value:function(){this.createForm()}},{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}}]),e}()).\u0275fac=function(e){return new(e||S)(m.Pb(d.c),m.Pb(h),m.Pb(u.a),m.Pb(u.e),m.Pb(p.b),m.Pb(C.e))},S.\u0275cmp=m.Jb({type:S,selectors:[["app-create-update-device"]],decls:32,vars:14,consts:[[1,"container"],[1,"form-group","float-right"],[1,"text-right"],["mat-icon-button","","matSuffix","","mat-dialog-close",""],[1,"text-center"],["novalidate","",3,"formGroup","ngSubmit"],["appearance","standard"],["matInput","","formControlName","name"],[4,"ngIf"],["formControlName","deviceType"],[3,"value",4,"ngFor","ngForOf"],[1,"row","px-2","mt-4"],[1,"col-md-6"],["mat-raised-button","","type","submit","color","primary",1,"btn-block"],["mat-raised-button","","type","button",1,"btn-block",3,"click"],[3,"value"]],template:function(e,t){1&e&&(m.Vb(0,"div",0),m.Vb(1,"div",1),m.Vb(2,"div",2),m.Vb(3,"button",3),m.Vb(4,"mat-icon"),m.Cc(5,"close"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Vb(6,"h3",4),m.Cc(7),m.ic(8,"translate"),m.Ub(),m.Qb(9,"hr"),m.Vb(10,"form",5),m.dc("ngSubmit",(function(){return t.onSubmit()})),m.Vb(11,"mat-form-field",6),m.Vb(12,"mat-label"),m.Cc(13),m.ic(14,"translate"),m.Ub(),m.Qb(15,"input",7),m.Bc(16,F,4,6,"mat-error",8),m.Ub(),m.Vb(17,"mat-form-field",6),m.Vb(18,"mat-label"),m.Cc(19),m.ic(20,"translate"),m.Ub(),m.Vb(21,"mat-select",9),m.Bc(22,I,3,4,"mat-option",10),m.Ub(),m.Bc(23,j,4,6,"mat-error",8),m.Ub(),m.Vb(24,"div",11),m.Vb(25,"div",12),m.Vb(26,"button",13),m.Cc(27),m.Ub(),m.Ub(),m.Vb(28,"div",12),m.Vb(29,"button",14),m.dc("click",(function(){return t.resetForm()})),m.Vb(30,"mat-icon"),m.Cc(31,"cached"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub()),2&e&&(m.Cb(7),m.Dc(m.jc(8,8,"Device")),m.Cb(3),m.nc("formGroup",t.deviceForm),m.Cb(3),m.Dc(m.jc(14,10,"Title")),m.Cb(3),m.nc("ngIf",t.hasCustomError(t.deviceForm,"name")),m.Cb(3),m.Dc(m.jc(20,12,"Device-type")),m.Cb(3),m.nc("ngForOf",t.deviceTypes),m.Cb(1),m.nc("ngIf",t.hasCustomError(t.deviceForm,"deviceType")),m.Cb(4),m.Ec(" ",t.getButtonState()," "))},directives:[y.a,g.g,u.c,U.a,d.r,d.l,d.f,g.c,g.f,V.b,d.b,d.k,d.e,n.l,k.a,n.k,g.b,D.n],pipes:[C.d],styles:[""]}),S),$=((O=function(){function e(t){_classCallCheck(this,e),this.httpClient=t}return _createClass(e,[{key:"getRecords",value:function(e){return this.httpClient.get(v.a.deviceRecords+e)}},{key:"create",value:function(e){return this.httpClient.post(v.a.deviceRecords,e)}}]),e}()).\u0275fac=function(e){return new(e||O)(m.Zb(f.b))},O.\u0275prov=m.Lb({token:O,factory:O.\u0275fac,providedIn:"root"}),O),E=i("2yVh"),N=i("jaxi");function R(e,t){if(1&e&&(m.Vb(0,"mat-option",8),m.Cc(1),m.Ub()),2&e){var i=t.$implicit;m.nc("value",i),m.Cb(1),m.Ec(" ",i," ")}}function T(e,t){if(1&e&&(m.Vb(0,"mat-option",8),m.Cc(1),m.Ub()),2&e){var i=t.$implicit;m.nc("value",i.animalId),m.Cb(1),m.Ec(" ",i.name," ")}}function P(e,t){if(1&e){var i=m.Wb();m.Vb(0,"tr",17),m.Vb(1,"td",5),m.Vb(2,"button",25),m.dc("click",(function(){m.uc(i);var e=t.$implicit;return m.hc().openRecords(e.smartDeviceId)})),m.Cc(3),m.Ub(),m.Ub(),m.Vb(4,"td",19),m.Cc(5),m.ic(6,"translate"),m.Ub(),m.Vb(7,"td",26),m.Vb(8,"button",27),m.dc("click",(function(){m.uc(i);var e=t.$implicit;return m.hc().addOrUpdate(e.smartDeviceId)})),m.Vb(9,"mat-icon"),m.Cc(10,"edit"),m.Ub(),m.Ub(),m.Vb(11,"button",28),m.dc("click",(function(){m.uc(i);var e=t.$implicit;return m.hc().delete(e.smartDeviceId)})),m.Vb(12,"mat-icon"),m.Cc(13,"delete"),m.Ub(),m.Ub(),m.Ub(),m.Ub()}if(2&e){var c=t.$implicit,n=m.hc();m.Cb(2),m.Gb("selected",c.smartDeviceId===n.deviceSelectedId),m.Cb(1),m.Ec(" ",c.name," "),m.Cb(2),m.Ec(" ",m.jc(6,4,c.deviceType)," ")}}function A(e,t){1&e&&(m.Vb(0,"tr"),m.Vb(1,"td"),m.Vb(2,"p"),m.Cc(3),m.ic(4,"translate"),m.Ub(),m.Ub(),m.Ub()),2&e&&(m.Cb(3),m.Dc(m.jc(4,1,"Empty")))}function x(e,t){if(1&e&&(m.Vb(0,"li",32),m.Vb(1,"div",33),m.Vb(2,"div",34),m.Vb(3,"h6"),m.Cc(4),m.Ub(),m.Ub(),m.Vb(5,"div",35),m.Vb(6,"h6"),m.Vb(7,"small"),m.Vb(8,"i"),m.Cc(9),m.ic(10,"date"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub()),2&e){var i=t.$implicit;m.Cb(4),m.Ec(" ",i.value," "),m.Cb(5),m.Dc(m.kc(10,2,i.date,"medium"))}}function _(e,t){1&e&&(m.Vb(0,"li",32),m.Vb(1,"h6",39),m.Vb(2,"i"),m.Cc(3),m.ic(4,"translate"),m.Ub(),m.Ub(),m.Ub()),2&e&&(m.Cb(3),m.Dc(m.jc(4,1,"Empty")))}function B(e,t){if(1&e){var i=m.Wb();m.Vb(0,"div",5),m.Vb(1,"div",29),m.Vb(2,"h3"),m.Cc(3),m.ic(4,"translate"),m.Ub(),m.Vb(5,"button",30),m.dc("click",(function(){return m.uc(i),m.hc().refreshRecords()})),m.Cc(6," Refresh "),m.Vb(7,"mat-icon"),m.Cc(8,"cached"),m.Ub(),m.Ub(),m.Ub(),m.Qb(9,"hr"),m.Vb(10,"ul",31),m.Vb(11,"li",32),m.Vb(12,"div",33),m.Vb(13,"div",34),m.Vb(14,"h5"),m.Cc(15),m.ic(16,"translate"),m.Ub(),m.Ub(),m.Vb(17,"div",35),m.Vb(18,"h5"),m.Cc(19),m.ic(20,"translate"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Vb(21,"ul",36),m.Bc(22,x,11,5,"li",37),m.Bc(23,_,5,3,"li",38),m.Ub(),m.Ub()}if(2&e){var c=m.hc();m.Cb(3),m.Dc(m.jc(4,5,"Device-records")),m.Cb(12),m.Ec(" ",m.jc(16,7,"Message")," "),m.Cb(4),m.Ec(" ",m.jc(20,9,"Date")," "),m.Cb(3),m.nc("ngForOf",c.deviceRecords),m.Cb(1),m.nc("ngIf",0===c.deviceRecords.length)}}var G,q,M,Q=[{path:"",redirectTo:"device-list",pathMatch:"full"},{path:"device-list",component:(G=function(){function e(t,i,c,n,a,r,o){_classCallCheck(this,e),this.fb=t,this.deviceService=i,this.deviceRecordService=c,this.animalService=n,this.toastr=a,this.dialog=r,this.translate=o,this.typeNames=[],this.animals=[],this.animalsFiltered=[],this.devices=[],this.deviceRecords=null,this.deviceSelectedId=null,this.destroy$=new s.a}return _createClass(e,[{key:"ngOnInit",value:function(){this.createForm(),this.getAnimals(),Object(l.b)(this.toastr)}},{key:"createForm",value:function(){this.filterForm=this.fb.group({typeName:"*",animalId:null})}},{key:"getAnimals",value:function(){var e=this;this.animalService.getAnimals().pipe(Object(o.a)(this.destroy$)).subscribe((function(t){e.animals=t.sort((function(e,t){return Date.parse(e.dateOfBirth)<Date.parse(t.dateOfBirth)?1:-1})),e.animalsFiltered=e.animals,e.typeNames=e.animals.map((function(e){return e.typeName})).filter((function(e,t,i){return i.indexOf(e)===t})),e.animalsFiltered.length>0&&(e.filterForm.get("animalId").setValue(e.animalsFiltered[0].animalId),e.selectAnimal(e.animalsFiltered[0].animalId))}))}},{key:"getDevices",value:function(){var e=this;this.deviceService.getDevices().pipe(Object(o.a)(this.destroy$)).subscribe((function(t){return e.devices=t}))}},{key:"selectedAnimalType",value:function(e){var t=this;"*"===this.filterForm.value.typeName?this.animalsFiltered=this.animals:(this.filterForm.get("animalId").setValue(null),this.devices=[],this.resetSelectedDevice(),this.animalsFiltered=this.animals.filter((function(e){return e.typeName===t.filterForm.value.typeName})))}},{key:"selectAnimal",value:function(e){this.resetSelectedDevice(),this.getDevicesForAnimal()}},{key:"openRecords",value:function(e){var t=this;this.deviceRecordService.getRecords(e).pipe(Object(o.a)(this.destroy$)).subscribe((function(i){t.deviceRecords=i,t.deviceSelectedId=e}),(function(e){return console.log(e)}))}},{key:"addOrUpdate",value:function(e){var t=this,i=this.findOrDefaultDevice(e);this.dialog.open(w,{width:"28%",autoFocus:!0,data:i}).afterClosed().pipe(Object(o.a)(this.destroy$)).subscribe((function(e){e&&t.refreshData(e)}))}},{key:"delete",value:function(e){var t=this;Object(l.d)(this.devices.find((function(t){return t.smartDeviceId===e})).name,this.translate)&&this.deviceService.deleteDevice(e).pipe(Object(o.a)(this.destroy$)).subscribe((function(){Object(l.i)(b.a.Delete,t.devices,null,(function(t){return t.smartDeviceId===e})),t.toastr.success(t.translate.instant("Deleted"),t.translate.instant("Success"))}),(function(e){t.toastr.error(t.translate.instant("Failed"),t.translate.instant("Error")),console.log(e)}))}},{key:"refreshRecords",value:function(){this.openRecords(this.deviceSelectedId)}},{key:"findOrDefaultDevice",value:function(e){return e?this.devices.find((function(t){return t.smartDeviceId===e})):{smartDeviceId:null,animalId:this.filterForm.value.animalId,name:null,deviceType:null}}},{key:"resetForm",value:function(){this.createForm(),this.animalsFiltered=this.animals,this.devices=[],this.resetSelectedDevice()}},{key:"getDevicesForAnimal",value:function(){var e=this;this.deviceService.getDevicesForAnimal(this.filterForm.value.animalId).pipe(Object(o.a)(this.destroy$)).subscribe((function(t){return e.devices=t.sort((function(e,t){return e.name>t.name?1:-1}))}),(function(e){return console.log(e)}))}},{key:"refreshData",value:function(e){var t=this,i=e.data,c=e.action;this.deviceService.getDevice(i).pipe(Object(o.a)(this.destroy$)).subscribe((function(e){Object(l.i)(c,t.devices,e,(function(e){return e.smartDeviceId===i})),t.devices.sort((function(e,t){return e.name>t.name?1:-1}))}))}},{key:"resetSelectedDevice",value:function(){this.deviceRecords=null,this.deviceSelectedId=null}},{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}},{key:"canCreate",get:function(){return null!=this.filterForm.value.animalId}},{key:"canOpenRecords",get:function(){return null!=this.deviceSelectedId}}]),e}(),G.\u0275fac=function(e){return new(e||G)(m.Pb(d.c),m.Pb(h),m.Pb($),m.Pb(E.a),m.Pb(p.b),m.Pb(u.b),m.Pb(C.e))},G.\u0275cmp=m.Jb({type:G,selectors:[["app-smart-device-list"]],decls:51,vars:29,consts:[[1,"row"],[1,"col-md-7"],[1,"text-center","my-2"],["novalidate","",3,"formGroup"],[1,"row","ml-1"],[1,"col-md-5"],["appearance","standard"],["formControlName","typeName",3,"selectionChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"],["formControlName","animalId",3,"selectionChange"],[1,"col-md-2"],[1,"my-auto"],[3,"click"],[1,"table-responsive","px-2","mt-3"],[1,"table","table-bordered","text-center"],[1,"thead-light"],[1,"d-flex"],["scope","col",1,"col-md-5"],["scope","col",1,"col-md-3"],["scope","col",1,"col-md-4"],["mat-raised-button","","color","primary",1,"btn","btn-sm",3,"disabled","click"],["class","d-flex",4,"ngFor","ngForOf"],[4,"ngIf"],["class","col-md-5",4,"ngIf"],["type","button",1,"btn","btn-link",3,"click"],[1,"col-md-4"],[1,"btn","btn-sm","btn-warning","mx-1",3,"click"],[1,"btn","btn-sm","btn-danger","mx-1",3,"click"],[1,"d-flex","justify-content-center"],["mat-raised-button","","type","button",1,"btn","btn-sm","ml-3",3,"click"],[1,"list-group","mt-1"],[1,"list-group-item"],[1,"row","px-2"],[1,"col-md-9","my-auto"],[1,"col-md-3","my-auto"],[1,"list-group"],["class","list-group-item",4,"ngFor","ngForOf"],["class","list-group-item",4,"ngIf"],[1,"px-2"]],template:function(e,t){1&e&&(m.Vb(0,"div",0),m.Vb(1,"div",1),m.Vb(2,"div",2),m.Vb(3,"h3"),m.Cc(4),m.ic(5,"translate"),m.Ub(),m.Ub(),m.Qb(6,"hr"),m.Vb(7,"form",3),m.Vb(8,"div",4),m.Vb(9,"div",5),m.Vb(10,"mat-form-field",6),m.Vb(11,"mat-label"),m.Cc(12),m.ic(13,"translate"),m.Ub(),m.Vb(14,"mat-select",7),m.dc("selectionChange",(function(e){return t.selectedAnimalType(e.value)})),m.Vb(15,"mat-option",8),m.Cc(16),m.ic(17,"translate"),m.Ub(),m.Bc(18,R,2,2,"mat-option",9),m.Ub(),m.Ub(),m.Ub(),m.Vb(19,"div",5),m.Vb(20,"mat-form-field",6),m.Vb(21,"mat-label"),m.Cc(22),m.ic(23,"translate"),m.Ub(),m.Vb(24,"mat-select",10),m.dc("selectionChange",(function(e){return t.selectAnimal(e.value)})),m.Bc(25,T,2,2,"mat-option",9),m.Ub(),m.Ub(),m.Ub(),m.Vb(26,"div",11),m.Vb(27,"mat-button-toggle-group",12),m.Vb(28,"mat-button-toggle",13),m.dc("click",(function(){return t.resetForm()})),m.Vb(29,"mat-icon"),m.Cc(30,"cached"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Vb(31,"div",14),m.Vb(32,"table",15),m.Vb(33,"thead",16),m.Vb(34,"tr",17),m.Vb(35,"th",18),m.Cc(36),m.ic(37,"translate"),m.Ub(),m.Vb(38,"th",19),m.Cc(39),m.ic(40,"translate"),m.Ub(),m.Vb(41,"th",20),m.Vb(42,"button",21),m.dc("click",(function(){return t.addOrUpdate(null)})),m.Vb(43,"mat-icon"),m.Cc(44,"add"),m.Ub(),m.Cc(45),m.ic(46,"translate"),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Vb(47,"tbody"),m.Bc(48,P,14,6,"tr",22),m.Bc(49,A,5,3,"tr",23),m.Ub(),m.Ub(),m.Ub(),m.Ub(),m.Bc(50,B,24,11,"div",24),m.Ub()),2&e&&(m.Cb(4),m.Dc(m.jc(5,15,"Device-management")),m.Cb(3),m.nc("formGroup",t.filterForm),m.Cb(5),m.Dc(m.jc(13,17,"Animal-type")),m.Cb(3),m.nc("value","*"),m.Cb(1),m.Ec(" ",m.jc(17,19,"All")," "),m.Cb(2),m.nc("ngForOf",t.typeNames),m.Cb(4),m.Dc(m.jc(23,21,"Animal")),m.Cb(3),m.nc("ngForOf",t.animalsFiltered),m.Cb(11),m.Ec(" ",m.jc(37,23,"Title")," "),m.Cb(3),m.Ec(" ",m.jc(40,25,"Device-type")," "),m.Cb(3),m.nc("disabled",!t.canCreate),m.Cb(3),m.Ec(" ",m.jc(46,27,"Create-device")," "),m.Cb(3),m.nc("ngForOf",t.devices),m.Cb(1),m.nc("ngIf",0===t.devices.length),m.Cb(1),m.nc("ngIf",t.canOpenRecords))},directives:[d.r,d.l,d.f,g.c,g.f,k.a,d.k,d.e,D.n,n.k,N.b,N.a,U.a,y.a,n.l],pipes:[C.d,n.e],styles:[".selected[_ngcontent-%COMP%]{color:#8a2be2!important}"]}),G)}],J=((M=function e(){_classCallCheck(this,e)}).\u0275mod=m.Nb({type:M}),M.\u0275inj=m.Mb({factory:function(e){return new(e||M)},imports:[[r.e.forChild(Q)],r.e]}),M),L=((q=function e(){_classCallCheck(this,e)}).\u0275mod=m.Nb({type:q}),q.\u0275inj=m.Mb({factory:function(e){return new(e||q)},imports:[[n.c,J,a.a]]}),q)}}]);