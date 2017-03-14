(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('ionic-angular'), require('@angular/forms'), require('rxjs/Observable'), require('moment'), require('moment/locale/es.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'ionic-angular', '@angular/forms', 'rxjs/Observable', 'moment', 'moment/locale/es.js'], factory) :
    (factory((global.md = global.md || {}, global.md.calendar = global.md.calendar || {}),global.ng.core,global.ng.common,global.ing,global.ng.forms,global.Rx,global.moment,global.moment_locale_es_js));
}(this, (function (exports,_angular_core,_angular_common,ionicAngular,_angular_forms,rxjs_Observable,moment,moment_locale_es_js) { 'use strict';

var moment__default = moment['default'];

var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
moment.locale('es');
var momentConstructor = moment__default || moment;
var ION_CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return IonCalendar; }),
    multi: true
};
var weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
var IonCalendarPeriod = (function () {
    function IonCalendarPeriod() {
    }
    return IonCalendarPeriod;
}());
var IonCalendarChange = (function () {
    function IonCalendarChange() {
    }
    return IonCalendarChange;
}());
var IonCalendarEntry = (function () {
    function IonCalendarEntry(params) {
        this.disabled = false;
        this.highlight = false;
        var keys = Object.keys(params);
        this.type = params.type;
        this.date = params.date;
        this.selected = params.selected;
        if (keys.indexOf('disabled') > -1) {
            this.disabled = params.disabled;
        }
        if (keys.indexOf('highlight') > -1) {
            this.highlight = params.highlight;
        }
    }
    IonCalendarEntry.prototype.toString = function () {
        if (this.type === 'day') {
            return "" + this.date.getDate();
        }
        if (this.type === 'month') {
            return momentConstructor(this.date).format('MMM');
        }
        return "" + this.date.getFullYear();
    };
    IonCalendarEntry.prototype.getRange = function () {
        if (this.type === 'day') {
            var day = momentConstructor(this.date);
            return { start: day, end: day };
        }
        else {
            var curMoment = momentConstructor(this.date);
            return {
                start: curMoment.clone().startOf(this.type),
                end: curMoment.clone().endOf(this.type)
            };
        }
    };
    return IonCalendarEntry;
}());
var IonCalendar = (function () {
    function IonCalendar(_form) {
        this._form = _form;
        this.ionChange = new _angular_core.EventEmitter();
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._change = new _angular_core.EventEmitter();
        this._viewDate = new Date();
        this._viewMoment = momentConstructor();
        this._viewHeader = '';
        this._calendarRows = [];
        this._weekDays = [];
        this._onChangeCallback = function (_) { };
        this._onTouchedCallback = function () { };
        _form.register(this);
    }
    Object.defineProperty(IonCalendar.prototype, "viewDate", {
        get: function () { return this._viewDate; },
        set: function (viewDate) { this._setViewDate(viewDate); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(IonCalendar.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (disabled) {
            this._disabled = disabled != null && "" + disabled !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "dateOnlyForDay", {
        get: function () { return this._disabled; },
        set: function (dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "viewMode", {
        get: function () { return this._viewMode; },
        set: function (viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "selectionMode", {
        get: function () { return this._selectionMode; },
        set: function (selectionMode) {
            this._selectionMode = selectionMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "startOfWeekDay", {
        get: function () {
            return weekDays[this._startOfWeekDay];
        },
        set: function (weekDay) {
            this._startOfWeekDay = weekDays.indexOf(weekDay);
            moment.updateLocale(moment.locale(), { week: { dow: this._startOfWeekDay } });
            if (this._viewMode === 'month') {
                this._buildCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (maxDate) {
            this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "change", {
        get: function () { return this._change.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "selectedPeriod", {
        set: function (period) {
            this._selectedPeriod = period;
            this._change.emit({
                source: this,
                period: period
            });
            this._refreshSelection();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "value", {
        get: function () {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        },
        set: function (period) {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                if (period instanceof Date &&
                    (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                    this.selectedPeriod = {
                        type: 'day',
                        startDate: period,
                        endDate: period
                    };
                    if (this._init) {
                        this.ionChange.emit(this);
                    }
                    this._onChangeCallback(period);
                }
            }
            else if (period instanceof Object && period !== this._selectedPeriod) {
                this.selectedPeriod = period;
                if (this._init) {
                    this.ionChange.emit(this);
                }
                this._onChangeCallback(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "calendarRows", {
        get: function () { return this._calendarRows; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "viewHeader", {
        get: function () { return this._viewHeader; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonCalendar.prototype, "weekDays", {
        get: function () { return this._weekDays; },
        enumerable: true,
        configurable: true
    });
    IonCalendar.prototype.prevPage = function () {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate).subtract(1, 'M').toDate();
        }
        else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate).subtract(1, 'y').toDate();
        }
        this._buildCalendar();
    };
    IonCalendar.prototype.nextPage = function () {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate).add(1, 'M').toDate();
        }
        else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate).add(1, 'y').toDate();
        }
        this._buildCalendar();
    };
    IonCalendar.prototype.previousViewMode = function () {
        if (this._viewMode === 'decade') {
            return;
        }
        else if (this._viewMode === 'year') {
            this._viewMode = 'decade';
        }
        else if (this._viewMode === 'month') {
            this._viewMode = 'year';
        }
        this._buildCalendar();
    };
    IonCalendar.prototype.selectEntry = function (entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        var newPeriod;
        if (this._isEntrySelected(entry) === 'full') {
            newPeriod = null;
        }
        else if (this._selectionMode === 'day') {
            if (this._dateOnlyForDay) {
                newPeriod = entry.date;
            }
            else {
                newPeriod = {
                    type: 'day',
                    startDate: entry.date,
                    endDate: entry.date
                };
            }
        }
        else if (this._selectionMode === 'week') {
            newPeriod = {
                type: 'week',
                startDate: new Date(momentConstructor(entry.date).startOf('week').toDate().valueOf()),
                endDate: new Date(momentConstructor(entry.date).endOf('week').toDate().valueOf())
            };
        }
        else if (this._selectionMode === 'month') {
            newPeriod = {
                type: 'month',
                startDate: new Date(momentConstructor(entry.date).startOf('month').toDate().valueOf()),
                endDate: new Date(momentConstructor(entry.date).endOf('month').toDate().valueOf())
            };
        }
        else if (this._selectionMode === 'year') {
            newPeriod = {
                type: 'year',
                startDate: new Date(momentConstructor(entry.date).startOf('year').toDate().valueOf()),
                endDate: new Date(momentConstructor(entry.date).endOf('year').toDate().valueOf())
            };
        }
        this.value = newPeriod;
    };
    IonCalendar.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    IonCalendar.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    IonCalendar.prototype.writeValue = function (value) {
        if (typeof value === 'string') {
            value = momentConstructor(value).toDate();
        }
        this.value = value;
    };
    IonCalendar.prototype.ngOnInit = function () {
        this._buildCalendar();
    };
    IonCalendar.prototype.ngAfterContentInit = function () {
        this._init = true;
        this._refreshSelection();
    };
    IonCalendar.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    IonCalendar.prototype._getMonthName = function (date) {
        return momentConstructor(date).format('MMM');
    };
    IonCalendar.prototype._setViewDate = function (date) {
        this._viewDate = date;
        this._viewMoment = momentConstructor(date);
    };
    IonCalendar.prototype._buildCalendar = function () {
        if (this._viewMode === 'month') {
            this._buildMonthView();
        }
        else if (this._viewMode === 'year') {
            this._buildYearView();
        }
        else if (this._viewMode === 'decade') {
            this._buildDecadeView();
        }
    };
    IonCalendar.prototype._buildDecadeView = function () {
        var curYear = this._viewDate.getFullYear();
        var firstYear = curYear - (curYear % 10) + 1;
        var lastYear = firstYear + 11;
        this._viewHeader = firstYear + " - " + lastYear;
        var curDate = momentConstructor(this.viewDate)
            .startOf('year')
            .year(firstYear);
        var rows = [];
        for (var i = 0; i < 4; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                var date = new Date(curDate.toDate().valueOf());
                var newEntry = new IonCalendarEntry({
                    type: 'year',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'y');
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    IonCalendar.prototype._buildYearView = function () {
        this._viewHeader = "" + this._viewDate.getFullYear();
        var curDate = momentConstructor(this.viewDate)
            .startOf('year');
        var rows = [];
        for (var i = 0; i < 4; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                var date = new Date(curDate.toDate().valueOf());
                var newEntry = new IonCalendarEntry({
                    type: 'month',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'M');
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    IonCalendar.prototype._buildMonthView = function () {
        this._viewHeader = momentConstructor(this._viewDate).format('MMM YYYY');
        this._buildMonthViewWeekDays();
        var viewStartDate = momentConstructor(this.viewDate)
            .startOf('month')
            .startOf('week');
        var viewEndDate = momentConstructor(this.viewDate)
            .endOf('month')
            .endOf('week');
        var rows = [];
        var todayDate = momentConstructor();
        var curDate = momentConstructor(viewStartDate);
        var minDate = this.minDate == null ? null : momentConstructor(this.minDate);
        var maxDate = this.maxDate == null ? null : momentConstructor(this.maxDate);
        while (curDate < viewEndDate) {
            var row = [];
            for (var i = 0; i < 7; i++) {
                var disabled = (minDate != null && curDate.isBefore(minDate)) ||
                    (maxDate != null && curDate.isAfter(maxDate));
                var date = new Date(curDate.toDate().valueOf());
                var newEntry = new IonCalendarEntry({
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: todayDate.format('YYYY-MM-DD') === curDate.format('YYYY-MM-DD'),
                    disabled: disabled
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'd');
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    IonCalendar.prototype._buildMonthViewWeekDays = function () {
        var curMoment = momentConstructor().startOf('week');
        var weekDayNames = [];
        for (var i = 0; i < 7; i++) {
            weekDayNames.push(curMoment.format('ddd'));
            curMoment.add(1, 'd');
        }
        this._weekDays = weekDayNames;
    };
    IonCalendar.prototype._periodOrder = function (entryType) {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    };
    IonCalendar.prototype._isEntrySelected = function (entry) {
        if (this._selectedPeriod != null && this._selectedPeriod.type != null &&
            this._selectedPeriod.startDate != null && this._selectedPeriod.endDate != null) {
            var selectionStart = momentConstructor(this._selectedPeriod.startDate)
                .startOf('day');
            var selectionEnd = momentConstructor(this._selectedPeriod.endDate)
                .endOf('day');
            var selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
            var entryPeriodOrder = this._periodOrder(entry.type);
            var entryRange = entry.getRange();
            if (entryPeriodOrder <= selectionPeriodOrder &&
                entryRange.start.isBetween(selectionStart, selectionEnd, null, '[]') &&
                entryRange.end.isBetween(selectionStart, selectionEnd, null, '[]')) {
                return 'full';
            }
            else if (entryPeriodOrder > selectionPeriodOrder &&
                selectionStart.isBetween(entryRange.start, entryRange.end, null, '[]') &&
                selectionEnd.isBetween(entryRange.start, entryRange.end, null, '[]')) {
                return 'partial';
            }
        }
        return 'none';
    };
    IonCalendar.prototype._refreshSelection = function () {
        for (var _i = 0, _a = this._calendarRows; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var entry = row_1[_b];
                entry.selected = this._isEntrySelected(entry);
            }
        }
    };
    IonCalendar.prototype._canSelectEntry = function (entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type !== 'day') {
            return false;
        }
        if (this._selectionMode === 'month' && entry.type === 'year') {
            return false;
        }
        return true;
    };
    IonCalendar.prototype._nextViewMode = function (entry) {
        if (this._viewMode === 'decade') {
            this._viewMode = 'year';
        }
        else if (this._viewMode === 'year') {
            this._viewMode = 'month';
        }
        else if (this._viewMode === 'month') {
            return;
        }
        this._viewDate = entry.date;
        this._buildCalendar();
    };
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], IonCalendar.prototype, "ionChange", void 0);
    __decorate([
        _angular_core.Input('view-date'), 
        __metadata('design:type', Date)
    ], IonCalendar.prototype, "viewDate", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], IonCalendar.prototype, "disabled", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], IonCalendar.prototype, "dateOnlyForDay", null);
    __decorate([
        _angular_core.Input('view-mode'), 
        __metadata('design:type', String)
    ], IonCalendar.prototype, "viewMode", null);
    __decorate([
        _angular_core.Input('selection-mode'), 
        __metadata('design:type', String)
    ], IonCalendar.prototype, "selectionMode", null);
    __decorate([
        _angular_core.Input('start-of-week-day'), 
        __metadata('design:type', String)
    ], IonCalendar.prototype, "startOfWeekDay", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Date)
    ], IonCalendar.prototype, "minDate", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Date)
    ], IonCalendar.prototype, "maxDate", null);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', rxjs_Observable.Observable)
    ], IonCalendar.prototype, "change", null);
    IonCalendar = __decorate([
        _angular_core.Component({selector: 'ion-calendar',
            template: "<div class=\"ion-calendar-header\"> <button ion-fab left [disabled]=\"disabled\" (click)=\"prevPage()\">&#8592;</button> <button ion-button [disabled]=\"disabled\" (click)=\"previousViewMode()\" light class=\"ion-calendar-header-title\"> {{ viewHeader }} </button> <button ion-fab right [disabled]=\"disabled\" (click)=\"nextPage()\">&#8594;</button> </div> <div class=\"ion-calendar-row\" *ngIf=\"viewMode == 'month'\"> <div *ngFor=\"let weekDay of weekDays\"> <div class=\"button-label\">{{ weekDay }}</div> </div> </div> <div class=\"ion-calendar-row\" *ngFor=\"let row of calendarRows\"> <button ion-button [color]=\"entry.selected == 'none' ? 'light' : 'danger'\" [disabled]=\"disabled || entry.disabled\" [class.ion-calendar-partial-selection]=\"entry.selected == 'partial'\" [class.ion-calendar-highlight]=\"entry.selected === 'none' && entry.highlight\" (click)=\"selectEntry(entry)\" *ngFor=\"let entry of row\"> {{ entry.toString() }} </button> </div> ",
            styles: [":host { display: flex; box-sizing: border-box; width: 100%; height: 320px; flex-direction: column; } :host .ion-calendar-header, :host .ion-calendar-row { display: flex; box-sizing: border-box; width: 100%; flex-direction: row; } :host .ion-calendar-header { height: 40px; } :host .ion-calendar-header button[ion-fab] { width: 40px; height: 40px; margin: 0; position: relative; left: 0; right: 0; } :host .ion-calendar-header .ion-calendar-header-title { flex: 1; margin: 0 10px; } :host .ion-calendar-row { flex: 1; } :host .ion-calendar-row button, :host .ion-calendar-row div { flex: 1; margin: 3px; height: auto; padding: 0; } :host .ion-calendar-row div { line-height: 40px; text-align: center; } :host .ion-calendar-row .ion-calendar-partial-selection ::before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(255, 255, 255, 0.5); } :host .ion-calendar-row .ion-calendar-highlight { background-color: #fcd739; } /*# sourceMappingURL=calendar.css.map */ "],
            providers: [ION_CALENDAR_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [ionicAngular.Form])
    ], IonCalendar);
    return IonCalendar;
}());
var ION_CALENDAR_DIRECTIVES = [IonCalendar];
var IonCalendarModule = (function () {
    function IonCalendarModule() {
    }
    IonCalendarModule.forRoot = function () {
        return {
            ngModule: IonCalendarModule,
            providers: []
        };
    };
    IonCalendarModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, ionicAngular.IonicModule],
            exports: [IonCalendar],
            declarations: [IonCalendar],
            entryComponents: [IonCalendar],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], IonCalendarModule);
    return IonCalendarModule;
}());

exports.ION_CALENDAR_CONTROL_VALUE_ACCESSOR = ION_CALENDAR_CONTROL_VALUE_ACCESSOR;
exports.IonCalendarPeriod = IonCalendarPeriod;
exports.IonCalendarChange = IonCalendarChange;
exports.IonCalendarEntry = IonCalendarEntry;
exports.IonCalendar = IonCalendar;
exports.ION_CALENDAR_DIRECTIVES = ION_CALENDAR_DIRECTIVES;
exports.IonCalendarModule = IonCalendarModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
