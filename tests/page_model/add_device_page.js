import {t, Selector} from 'testcafe';

class AddDevicePage {
  constructor () {
    this.system_name = Selector('#system_name');
    this.type = Selector('#type');
    this.hdd_capacity = Selector('#hdd_capacity');
    this.saveButton = Selector('.submitButton').withExactText('SAVE');
  }

  async addDevice(device) {
    await this.setDeviceName(device.system_name);
    await this.setDeviceType(device.type);
    await this.setHddCapacity(device.hdd_capacity);
    await this.pressSaveButton();
  }

  async setDeviceName(name) {
    await t.typeText(this.system_name, name);
  }

  async setDeviceType(type) {
    await t.click(this.type)
            .click(this.type.find('option').withExactText(type));
  }

  async setHddCapacity(hdd_capacity) {
    await t.typeText(this.hdd_capacity, hdd_capacity);
  }

  async pressSaveButton() {
    await t.click(this.saveButton);
  }
}

export default new AddDevicePage();
