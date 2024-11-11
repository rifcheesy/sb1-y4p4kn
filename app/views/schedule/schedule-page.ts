import { NavigatedData, Page } from '@nativescript/core';
import { ScheduleViewModel } from './schedule-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ScheduleViewModel();
}