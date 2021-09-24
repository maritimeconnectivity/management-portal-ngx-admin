import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { DocResourceService } from './api/docResource.service';
import { ElasticsearchIndexResourceService } from './api/elasticsearchIndexResource.service';
import { ServiceInstanceResourceService } from './api/serviceInstanceResource.service';
import { ServiceSpecificationResourceService } from './api/serviceSpecificationResource.service';
import { SpecificationTemplateResourceService } from './api/specificationTemplateResource.service';
import { TechnicalDesignResourceService } from './api/technicalDesignResource.service';
import { XmlResourceService } from './api/xmlResource.service';
import { XsdResourceService } from './api/xsdResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    DocResourceService,
    ElasticsearchIndexResourceService,
    ServiceInstanceResourceService,
    ServiceSpecificationResourceService,
    SpecificationTemplateResourceService,
    TechnicalDesignResourceService,
    XmlResourceService,
    XsdResourceService ]
})
export class ServiceRegistryApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ServiceRegistryApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ServiceRegistryApiModule,
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
