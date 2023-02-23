import {t, Selector } from 'testcafe';

class DevicesPage {
  constructor () {
    // Options -----------------------------------------------------------------
    this.addDeviceButton = Selector('.submitButton').withExactText('ADD DEVICE');

    // Devices -----------------------------------------------------------------
    this.deviceList = Selector('.device-main-box');
  }

  // Options -------------------------------------------------------------------
  async openAddDevicePage() {
    await t.click(this.addDeviceButton);
  }

  // Devices -------------------------------------------------------------------
  async getDeviceList() {
    const devices = [];

    for(let count = 0; count < await this.deviceList.count; count++) {
      devices.push(await this.getDeviceByRow(count));
    }

    return devices;
  }

  async getDeviceByRow(row) {
    const device = {}

    device.system_name = await this.deviceList.nth(row).find('.device-name').innerText;
    device.type = await this.deviceList.nth(row).find('.device-type').innerText;
    device.hdd_capacity = (await this.deviceList.nth(row).find('.device-capacity').innerText).replace(' GB', '');

    return device;
  }

  async getEditButtonByRow(row) {
    return this.deviceList.nth(row).find('.device-edit');
  }

  async getRemoveButtonByRow(row) {
    return this.deviceList.nth(row).find('.device-remove');
  }

  async getDeviceElementByName(name) {
    return this.deviceList.withText(name);
  }

  async getDeviceByName(name) {
    const device = {}

    const elementDevice = await this.getDeviceElementByName(name);
    device.system_name = await elementDevice.find('.device-name').innerText;
    device.type = await elementDevice.find('.device-type').innerText;
    device.hdd_capacity = (await elementDevice.find('.device-capacity').innerText).replace(' GB', '');

    return device;
  }

  async deleteDeviceByName(name) {
    await t.click((await this.getDeviceElementByName(name)).find('.device-remove'));
  }
}

export default new DevicesPage();
