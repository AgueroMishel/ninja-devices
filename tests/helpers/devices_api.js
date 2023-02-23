import config from '../../.testcaferc.json';
import {t} from 'testcafe';

class DevicesApi {
  constructor () {
    this.url = `${config.apiUrl}/devices`;
  }

  async getDeviceList(includeId = true) {
    const deviceList = await t.request(this.url).body;

    if(!includeId) {
      const newDeviceList = [];

      for(let count = 0; count < deviceList.length; count++) {
        delete deviceList[count].id
        newDeviceList.push(deviceList[count]);
      }

      return newDeviceList;
    } else {
      return deviceList;
    }
  }

  async updateDeviceById(id, newDevice) {
    const updateRequest = {
      'url': `${this.url}/${id}`,
      'method': 'put',
      'body': newDevice
    }

    const updateResponse = await t.request(updateRequest);
    await t.expect(updateResponse.status).eql(200);
  }

  async deleteDeviceById(id) {
    const deleteRequest = {
      'url': `${this.url}/${id}`,
      'method': 'delete'
    }

    const deleteResponse = await t.request(deleteRequest);
    await t.expect(deleteResponse.status).eql(200);
  }
}

export default new DevicesApi
