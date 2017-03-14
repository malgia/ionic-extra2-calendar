var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
export var IonMasonry = (function () {
    function IonMasonry() {
    }
    IonMasonry = __decorate([
        Component({selector: 'ion-masonry',
            host: { 'role': 'list' },
            template: '<ng-content></ng-content>',
            styles: ["md-masonry { display: flex; flex-direction: column; } md-masonry md-masonry-row { display: flex; flex-direction: row; } md-masonry md-masonry-row md-masonry-item { display: flex; flex: 1; } md-masonry md-masonry-row md-masonry-item::after { content: ''; display: block; padding-bottom: 100%; } /*# sourceMappingURL=masonry.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], IonMasonry);
    return IonMasonry;
}());
export var IonMasonryRow = (function () {
    function IonMasonryRow() {
    }
    IonMasonryRow = __decorate([
        Component({selector: 'ion-masonry-row',
            template: '<ng-content></ng-content>'
        }), 
        __metadata('design:paramtypes', [])
    ], IonMasonryRow);
    return IonMasonryRow;
}());
export var IonMasonryItem = (function () {
    function IonMasonryItem() {
    }
    IonMasonryItem = __decorate([
        Component({selector: 'ion-masonry-item',
            host: { 'role': 'listitem' },
            template: '<ng-content></ng-content>',
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], IonMasonryItem);
    return IonMasonryItem;
}());
export var ION_MASONRY_DIRECTIVES = [IonMasonry, IonMasonryRow, IonMasonryItem];
export var IonMasonryModule = (function () {
    function IonMasonryModule() {
    }
    IonMasonryModule.forRoot = function () {
        return {
            ngModule: IonMasonryModule,
            providers: []
        };
    };
    IonMasonryModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: ION_MASONRY_DIRECTIVES,
            declarations: ION_MASONRY_DIRECTIVES,
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], IonMasonryModule);
    return IonMasonryModule;
}());

//# sourceMappingURL=masonry.js.map
