import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AgentControllerService } from './api/agentController.service';
import { CertificateControllerService } from './api/certificateController.service';
import { DeviceControllerService } from './api/deviceController.service';
import { LogoControllerService } from './api/logoController.service';
import { MmsControllerService } from './api/mmsController.service';
import { OrganizationControllerService } from './api/organizationController.service';
import { RoleControllerService } from './api/roleController.service';
import { ServiceControllerService } from './api/serviceController.service';
import { UserControllerService } from './api/userController.service';
import { VesselControllerService } from './api/vesselController.service';
import { VesselImageControllerService } from './api/vesselImageController.service';
import { AppConfig } from '../../app.config';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    {
        provide: AgentControllerService,
        useFactory: (http: HttpClient) => {
          return new AgentControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: CertificateControllerService,
        useFactory: (http: HttpClient) => {
          return new CertificateControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: DeviceControllerService,
        useFactory: (http: HttpClient) => {
          return new DeviceControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: LogoControllerService,
        useFactory: (http: HttpClient) => {
          return new LogoControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: MmsControllerService,
        useFactory: (http: HttpClient) => {
          return new MmsControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: OrganizationControllerService,
        useFactory: (http: HttpClient) => {
          return new OrganizationControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: RoleControllerService,
        useFactory: (http: HttpClient) => {
          return new RoleControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: ServiceControllerService,
        useFactory: (http: HttpClient) => {
          return new ServiceControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: UserControllerService,
        useFactory: (http: HttpClient) => {
          return new UserControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: VesselControllerService,
        useFactory: (http: HttpClient) => {
          return new VesselControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    {
        provide: VesselImageControllerService,
        useFactory: (http: HttpClient) => {
          return new VesselImageControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
