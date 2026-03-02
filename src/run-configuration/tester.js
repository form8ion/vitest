import {directoryExists} from '@form8ion/core';

export default function jetbrainsIdeInUse({projectRoot}) {
  return directoryExists(`${projectRoot}/.idea`);
}
