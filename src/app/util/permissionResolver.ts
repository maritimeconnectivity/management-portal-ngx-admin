import { EditableFormComponent } from './../shared/editable-form/editable-form.component';
import { AuthService } from './../auth/auth.service';
import { MenuType } from './../shared/models/menuType';
import { AuthPermission, AuthPermissionForMSR } from '../auth/auth.permission';

export const hasPermission = (context: MenuType, authService: AuthService,
        editableForm?: EditableFormComponent): boolean => {
    // MIR
    if (context !== MenuType.Instance) {
      if (authService.authState.hasPermissionInMIR(AuthPermission.SiteAdmin)) { // super admin
        return true;
      } else if (context === MenuType.User) {
        return authService.authState.hasPermissionInMIR(AuthPermission.UserAdmin);
      } else if (context === MenuType.Device) {
        return authService.authState.hasPermissionInMIR(AuthPermission.DeviceAdmin);
      } else if (context === MenuType.Vessel) {
        return authService.authState.hasPermissionInMIR(AuthPermission.VesselAdmin);
      } else if (context === MenuType.MMS) {
        return authService.authState.hasPermissionInMIR(AuthPermission.MMSAdmin);
      } else if (context === MenuType.Service) {
        return authService.authState.hasPermissionInMIR(AuthPermission.ServiceAdmin);
      } else if (context === MenuType.Organization || context === MenuType.Role) {
        return authService.authState.hasPermissionInMIR(AuthPermission.OrgAdmin);
      }
    } else {
    // MSR
      return editableForm ? // for editing
        // when it is for editing
        authService.authState.hasPermissionInMSR(AuthPermissionForMSR.MSRAdmin) ||
          (editableForm && editableForm.isOurServiceInstance() &&
          authService.authState.hasPermissionInMSR(AuthPermissionForMSR.OrgServiceAdmin)) :
        // for creating
        authService.authState.hasPermissionInMSR(AuthPermissionForMSR.OrgServiceAdmin) ||
        authService.authState.hasPermissionInMSR(AuthPermissionForMSR.MSRAdmin);
    }
  }