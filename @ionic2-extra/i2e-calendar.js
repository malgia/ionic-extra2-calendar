/**
  * @license Ionic 2 Extra v0.0.26
  * Copyright (c) 2017 Gnucoop scarl. https://www.gnucoop.com/
  * License: GPLv3
  */
import { Component, EventEmitter, Input, NgModule, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, IonicModule } from 'ionic-angular/index';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { locale, updateLocale } from 'moment';
import moment__default from 'moment';
import * as moment from 'moment';
import 'moment/locale/es.js';
moment.locale('es');

const momentConstructor = moment__default || moment;
const ION_CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IonCalendar),
    multi: true
};
const weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
class IonCalendarPeriod {
}
class IonCalendarChange {
}
class IonCalendarEntry {
    /**
     * @param {?} params
     */
    constructor(params) {
        this.disabled = false;
        this.highlight = false;
        let keys = Object.keys(params);
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
    /**
     * @return {?}
     */
    toString() {
        if (this.type === 'day') {
            return `${this.date.getDate()}`;
        }
        if (this.type === 'month') {
            return momentConstructor(this.date).format('MMM');
        }
        return `${this.date.getFullYear()}`;
    }
    /**
     * @return {?}
     */
    getRange() {
        if (this.type === 'day') {
            let /** @type {?} */ day = momentConstructor(this.date);
            return { start: day, end: day };
        }
        else {
            let /** @type {?} */ curMoment = momentConstructor(this.date);
            return {
                start: curMoment.clone().startOf(this.type),
                end: curMoment.clone().endOf(this.type)
            };
        }
    }
}
class IonCalendar {
    /**
     * @param {?} _form
     */
    constructor(_form) {
        this._form = _form;
        this.ionChange = new EventEmitter();
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._change = new EventEmitter();
        this._viewDate = new Date();
        this._viewMoment = momentConstructor();
        this._viewHeader = '';
        this._calendarRows = [];
        this._weekDays = [];
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        _form.register(this);
    }
    /**
     * @return {?}
     */
    get viewDate() { return this._viewDate; }
    ;
    /**
     * @param {?} viewDate
     * @return {?}
     */
    set viewDate(viewDate) { this._setViewDate(viewDate); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabled = disabled != null && `${disabled}` !== 'false';
    }
    /**
     * @return {?}
     */
    get dateOnlyForDay() { return this._disabled; }
    /**
     * @param {?} dateOnlyForDay
     * @return {?}
     */
    set dateOnlyForDay(dateOnlyForDay) {
        this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
    }
    /**
     * @return {?}
     */
    get viewMode() { return this._viewMode; }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    get selectionMode() { return this._selectionMode; }
    /**
     * @param {?} selectionMode
     * @return {?}
     */
    set selectionMode(selectionMode) {
        this._selectionMode = selectionMode;
    }
    /**
     * @return {?}
     */
    get startOfWeekDay() {
        return (weekDays[this._startOfWeekDay]);
    }
    /**
     * @param {?} weekDay
     * @return {?}
     */
    set startOfWeekDay(weekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);
        updateLocale(locale(), { week: { dow: this._startOfWeekDay } });
        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} minDate
     * @return {?}
     */
    set minDate(minDate) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} maxDate
     * @return {?}
     */
    set maxDate(maxDate) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
    }
    /**
     * @return {?}
     */
    get change() { return this._change.asObservable(); }
    /**
     * @param {?} period
     * @return {?}
     */
    set selectedPeriod(period) {
        this._selectedPeriod = period;
        this._change.emit({
            source: this,
            period: period
        });
        this._refreshSelection();
    }
    /**
     * @return {?}
     */
    get value() {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
        }
        return this._selectedPeriod;
    }
    /**
     * @param {?} period
     * @return {?}
     */
    set value(period) {
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
            this.selectedPeriod = (period);
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._onChangeCallback(period);
        }
    }
    /**
     * @return {?}
     */
    get calendarRows() { return this._calendarRows; }
    /**
     * @return {?}
     */
    get viewHeader() { return this._viewHeader; }
    /**
     * @return {?}
     */
    get weekDays() { return this._weekDays; }
    /**
     * @return {?}
     */
    prevPage() {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate).subtract(1, 'M').toDate();
        }
        else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate).subtract(1, 'y').toDate();
        }
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    nextPage() {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate).add(1, 'M').toDate();
        }
        else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate).add(1, 'y').toDate();
        }
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    previousViewMode() {
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
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    selectEntry(entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        let /** @type {?} */ newPeriod;
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (typeof value === 'string') {
            value = momentConstructor(value).toDate();
        }
        this.value = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init = true;
        this._refreshSelection();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._form.deregister(this);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _getMonthName(date) {
        return momentConstructor(date).format('MMM');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _setViewDate(date) {
        this._viewDate = date;
        this._viewMoment = momentConstructor(date);
    }
    /**
     * @return {?}
     */
    _buildCalendar() {
        if (this._viewMode === 'month') {
            this._buildMonthView();
        }
        else if (this._viewMode === 'year') {
            this._buildYearView();
        }
        else if (this._viewMode === 'decade') {
            this._buildDecadeView();
        }
    }
    /**
     * @return {?}
     */
    _buildDecadeView() {
        let /** @type {?} */ curYear = this._viewDate.getFullYear();
        let /** @type {?} */ firstYear = curYear - (curYear % 10) + 1;
        let /** @type {?} */ lastYear = firstYear + 11;
        this._viewHeader = `${firstYear} - ${lastYear}`;
        let /** @type {?} */ curDate = momentConstructor(this.viewDate)
            .startOf('year')
            .year(firstYear);
        let /** @type {?} */ rows = [];
        for (let /** @type {?} */ i = 0; i < 4; i++) {
            let /** @type {?} */ row = [];
            for (let /** @type {?} */ j = 0; j < 3; j++) {
                let /** @type {?} */ date = new Date(curDate.toDate().valueOf());
                let /** @type {?} */ newEntry = new IonCalendarEntry({
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
    }
    /**
     * @return {?}
     */
    _buildYearView() {
        this._viewHeader = `${this._viewDate.getFullYear()}`;
        let /** @type {?} */ curDate = momentConstructor(this.viewDate)
            .startOf('year');
        let /** @type {?} */ rows = [];
        for (let /** @type {?} */ i = 0; i < 4; i++) {
            let /** @type {?} */ row = [];
            for (let /** @type {?} */ j = 0; j < 3; j++) {
                let /** @type {?} */ date = new Date(curDate.toDate().valueOf());
                let /** @type {?} */ newEntry = new IonCalendarEntry({
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
    }
    /**
     * @return {?}
     */
    _buildMonthView() {
        this._viewHeader = momentConstructor(this._viewDate).format('MMM YYYY');
        this._buildMonthViewWeekDays();
        let /** @type {?} */ viewStartDate = momentConstructor(this.viewDate)
            .startOf('month')
            .startOf('week');
        let /** @type {?} */ viewEndDate = momentConstructor(this.viewDate)
            .endOf('month')
            .endOf('week');
        let /** @type {?} */ rows = [];
        let /** @type {?} */ todayDate = momentConstructor();
        let /** @type {?} */ curDate = momentConstructor(viewStartDate);
        let /** @type {?} */ minDate = this.minDate == null ? null : momentConstructor(this.minDate);
        let /** @type {?} */ maxDate = this.maxDate == null ? null : momentConstructor(this.maxDate);
        while (curDate < viewEndDate) {
            let /** @type {?} */ row = [];
            for (let /** @type {?} */ i = 0; i < 7; i++) {
                let /** @type {?} */ disabled = (minDate != null && curDate.isBefore(minDate)) ||
                    (maxDate != null && curDate.isAfter(maxDate));
                let /** @type {?} */ date = new Date(curDate.toDate().valueOf());
                let /** @type {?} */ newEntry = new IonCalendarEntry({
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
    }
    /**
     * @return {?}
     */
    _buildMonthViewWeekDays() {
        let /** @type {?} */ curMoment = momentConstructor().startOf('week');
        let /** @type {?} */ weekDayNames = [];
        for (let /** @type {?} */ i = 0; i < 7; i++) {
            weekDayNames.push(curMoment.format('ddd'));
            curMoment.add(1, 'd');
        }
        this._weekDays = weekDayNames;
    }
    /**
     * @param {?} entryType
     * @return {?}
     */
    _periodOrder(entryType) {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    _isEntrySelected(entry) {
        if (this._selectedPeriod != null && this._selectedPeriod.type != null &&
            this._selectedPeriod.startDate != null && this._selectedPeriod.endDate != null) {
            let /** @type {?} */ selectionStart = momentConstructor(this._selectedPeriod.startDate)
                .startOf('day');
            let /** @type {?} */ selectionEnd = momentConstructor(this._selectedPeriod.endDate)
                .endOf('day');
            let /** @type {?} */ selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
            let /** @type {?} */ entryPeriodOrder = this._periodOrder(entry.type);
            let /** @type {?} */ entryRange = entry.getRange();
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
    }
    /**
     * @return {?}
     */
    _refreshSelection() {
        for (let /** @type {?} */ row of this._calendarRows) {
            for (let /** @type {?} */ entry of row) {
                entry.selected = this._isEntrySelected(entry);
            }
        }
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    _canSelectEntry(entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type !== 'day') {
            return false;
        }
        if (this._selectionMode === 'month' && entry.type === 'year') {
            return false;
        }
        return true;
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    _nextViewMode(entry) {
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
    }
}
IonCalendar.decorators = [
    { type: Component, args: [{selector: 'ion-calendar',
                template: "<div class=\"ion-calendar-header\"> <button ion-fab left [disabled]=\"disabled\" (click)=\"prevPage()\">&#8592;</button> <button ion-button [disabled]=\"disabled\" (click)=\"previousViewMode()\" light class=\"ion-calendar-header-title\"> {{ viewHeader }} </button> <button ion-fab right [disabled]=\"disabled\" (click)=\"nextPage()\">&#8594;</button> </div> <div class=\"ion-calendar-row\" *ngIf=\"viewMode == 'month'\"> <div *ngFor=\"let weekDay of weekDays\"> <div class=\"button-label\">{{ weekDay }}</div> </div> </div> <div class=\"ion-calendar-row\" *ngFor=\"let row of calendarRows\"> <button ion-button [color]=\"entry.selected == 'none' ? 'light' : 'danger'\" [disabled]=\"disabled || entry.disabled\" [class.ion-calendar-partial-selection]=\"entry.selected == 'partial'\" [class.ion-calendar-highlight]=\"entry.selected === 'none' && entry.highlight\" (click)=\"selectEntry(entry)\" *ngFor=\"let entry of row\"> {{ entry.toString() }} </button> </div> ",
                styles: [":host{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}:host .ion-calendar-header,:host .ion-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}:host .ion-calendar-header{height:40px}:host .ion-calendar-header button[ion-fab]{width:40px;height:40px;margin:0;position:relative;left:0;right:0}:host .ion-calendar-header .ion-calendar-header-title{flex:1;margin:0 10px}:host .ion-calendar-row{flex:1}:host .ion-calendar-row button,:host .ion-calendar-row div{flex:1;margin:3px;height:auto}:host .ion-calendar-row div{line-height:40px;text-align:center}:host .ion-calendar-row .ion-calendar-partial-selection ::before{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}:host .ion-calendar-row .ion-calendar-highlight{background-color:#fcd739} /*# sourceMappingURL=calendar.css.map */ "],
                providers: [ION_CALENDAR_CONTROL_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
IonCalendar.ctorParameters = () => [
    { type: Form, },
];
IonCalendar.propDecorators = {
    'ionChange': [{ type: Output },],
    'viewDate': [{ type: Input, args: ['view-date',] },],
    'disabled': [{ type: Input },],
    'dateOnlyForDay': [{ type: Input },],
    'viewMode': [{ type: Input, args: ['view-mode',] },],
    'selectionMode': [{ type: Input, args: ['selection-mode',] },],
    'startOfWeekDay': [{ type: Input, args: ['start-of-week-day',] },],
    'minDate': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'change': [{ type: Output },],
};
const ION_CALENDAR_DIRECTIVES = [IonCalendar];
class IonCalendarModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IonCalendarModule,
            providers: []
        };
    }
}
IonCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IonicModule],
                exports: [IonCalendar],
                declarations: [IonCalendar],
                entryComponents: [IonCalendar],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
IonCalendarModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { ION_CALENDAR_CONTROL_VALUE_ACCESSOR, IonCalendarPeriod, IonCalendarChange, IonCalendarEntry, IonCalendar, ION_CALENDAR_DIRECTIVES, IonCalendarModule };
