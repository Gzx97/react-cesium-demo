import SignInApi from './account/sign-in.api';
import AlarmApi from './alarm/alarm.api';
import AreaApi from './area/area.api';
import BeltApi from './belt/belt-management.api';
import DeviceApi from './device/device.api';
import GlobalApi from './global/global.api';

export const signInApi = new SignInApi();
export const beltApi = new BeltApi();
export const areaApi = new AreaApi();
export const globalApi = new GlobalApi();
export const deviceApi = new DeviceApi();
export const alarmApi = new AlarmApi();
