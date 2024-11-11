import { NavigatedData, Page } from '@nativescript/core';
import { DiagnosisViewModel } from './diagnosis-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new DiagnosisViewModel();
}