import { TextFormatterHtmlPipe } from './editable-form/textFormatter/textFormatter.pipe';
import { LuceneComponentDirective } from './lucene-query-input/lucene-component-directive';
import { LuceneComponentInputComponent } from './lucene-query-input/lucene-component-input/lucene-component-input.component';
/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NbCardModule, NbSpinnerModule, NbButtonModule, NbIconModule, NbDatepickerModule, NbSelectModule, NbInputModule, NbTabsetModule, NbCalendarModule, NbCalendarRangeModule, NbAutocompleteModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableFormComponent } from './editable-form/editable-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './certificates/certificates.component';
import { CertIssueDialogComponent } from './certificates/cert-issue-dialog/cert-issue-dialog.component';
import { CertRevokeDialogComponent } from './certificates/cert-revoke-dialog/cert-revoke-dialog.component';
import { ThemeModule } from '../@theme/theme.module';
import { XmlEditDialogComponent } from './xml-edit-dialog/xml-edit-dialog.component';
import { InputButtonListComponent } from './input-button-list/input-button-list.component';
import { InputImageComponent } from './input-image/input-image.component';
import { InputMcpEntityComponent } from './input-mcp-entity/input-mcp-entity.component';
import { InputFileListComponent } from './input-file-list/input-file-list.component';
import { InputGeometryComponent } from './input-geometry/input-geometry.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { LuceneQueryInputComponent } from './lucene-query-input/lucene-query-input.component';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { LuceneSingleQueryInputComponent } from './lucene-query-input/lucene-single-query-input/lucene-single-query-input.component';
import { LuceneLogicInputComponent } from './lucene-query-input/lucene-logic-input/lucene-logic-input.component';
import { ListViewComponent } from './list-view/list-view.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ListViewModule } from './list-view/list-view.module';

@NgModule({
  declarations: [
    EditableFormComponent,
    CertificatesComponent,
    CertIssueDialogComponent,
    CertRevokeDialogComponent,
    XmlEditDialogComponent,
    InputButtonListComponent,
    InputImageComponent,
    InputMcpEntityComponent,
    InputFileListComponent,
    InputGeometryComponent,
    CalendarComponent,
    DayCellComponent,
    LuceneQueryInputComponent,
    LuceneSingleQueryInputComponent,
    LuceneComponentInputComponent,
    LuceneLogicInputComponent,
    LuceneComponentDirective,
    ListViewComponent,
    TextFormatterHtmlPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbIconModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbDatepickerModule,
    NbSelectModule,
    NbInputModule,
    NbTabsetModule,
    NbButtonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbSelectModule,
    AutoSizeInputModule,
    NbAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      }
    }),
  ],
  exports: [
    EditableFormComponent,
    InputGeometryComponent,
    LuceneQueryInputComponent,
  ],
  providers: [
    TextFormatterHtmlPipe,
  ],
})
export class SharedModule { }
