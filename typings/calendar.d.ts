import { AfterContentInit, EventEmitter, ModuleWithProviders, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Form } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/es.js';
export declare const ION_CALENDAR_CONTROL_VALUE_ACCESSOR: any;
export declare type IonCalendarViewMode = ('month' | 'year' | 'decade');
export declare type IonCalendarPeriodType = ('day' | 'week' | 'month' | 'year');
export declare type IonCalendarEntryType = ('day' | 'month' | 'year');
export declare type IonCalendarWeekDay = ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
export declare type IonCalendarEntrySelectedState = ('none' | 'partial' | 'full');
export declare class IonCalendarPeriod {
    type: IonCalendarPeriodType;
    startDate: Date;
    endDate: Date;
}
export declare class IonCalendarChange {
    source: IonCalendar;
    period: IonCalendarPeriod;
}
export declare class IonCalendarEntry {
    type: IonCalendarEntryType;
    date: Date;
    selected: IonCalendarEntrySelectedState;
    disabled: boolean;
    highlight: boolean;
    constructor(params: {
        type: IonCalendarEntryType;
        date: Date;
        selected: IonCalendarEntrySelectedState;
        highlight?: boolean;
        disabled?: boolean;
    });
    toString(): string;
    getRange(): {
        start: moment.Moment;
        end: moment.Moment;
    };
}
export declare class IonCalendar implements AfterContentInit, ControlValueAccessor, OnInit, OnDestroy {
    private _form;
    ionChange: EventEmitter<IonCalendar>;
    viewDate: Date;
    private _disabled;
    disabled: boolean;
    private _dateOnlyForDay;
    dateOnlyForDay: boolean;
    private _viewMode;
    viewMode: IonCalendarViewMode;
    private _selectionMode;
    selectionMode: IonCalendarPeriodType;
    private _startOfWeekDay;
    startOfWeekDay: IonCalendarWeekDay;
    private _minDate;
    minDate: Date;
    private _maxDate;
    maxDate: Date;
    private _change;
    readonly change: Observable<IonCalendarChange>;
    private _selectedPeriod;
    private selectedPeriod;
    value: IonCalendarPeriod | Date;
    readonly calendarRows: IonCalendarEntry[][];
    readonly viewHeader: string;
    readonly weekDays: string[];
    private _viewDate;
    private _viewMoment;
    private _viewHeader;
    private _calendarRows;
    private _weekDays;
    private _init;
    constructor(_form: Form);
    prevPage(): void;
    nextPage(): void;
    previousViewMode(): void;
    selectEntry(entry: IonCalendarEntry): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private _onChangeCallback;
    private _onTouchedCallback;
    private _getMonthName(date);
    private _setViewDate(date);
    private _buildCalendar();
    private _buildDecadeView();
    private _buildYearView();
    private _buildMonthView();
    private _buildMonthViewWeekDays();
    private _periodOrder(entryType);
    private _isEntrySelected(entry);
    private _refreshSelection();
    private _canSelectEntry(entry);
    private _nextViewMode(entry);
}
export declare const ION_CALENDAR_DIRECTIVES: typeof IonCalendar[];
export declare class IonCalendarModule {
    static forRoot(): ModuleWithProviders;
}
