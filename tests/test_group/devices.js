import config from '../../.testcaferc.json';
import devicesPage from '../page_model/devices_page';
import addDevicePage from '../page_model/add_device_page';
import devicesApi from '../helpers/devices_api';

fixture('Devices')
    .page(config.baseUrl);

test('Test 1 - Device List', async t => {
  // Test Data -----------------------------------------------------------------
  const expectedDeviceList = await devicesApi.getDeviceList(false);

  // Prerequisites -------------------------------------------------------------
  const deviceList = await devicesPage.getDeviceList();

  // Test ----------------------------------------------------------------------
  for(let count = 0; count < deviceList.length; count++) {
    const device = deviceList[0];
    const expectedDevice = expectedDeviceList.find(apiDevice => apiDevice.system_name === device.system_name);
    await t.expect(expectedDevice).ok();
    await t.expect(device).eql(expectedDevice);
    await t.expect((await devicesPage.getEditButtonByRow(count)).exists).ok();
    await t.expect((await devicesPage.getRemoveButtonByRow(count)).exists).ok();
  }

  // Restore Data --------------------------------------------------------------

});

test('Test 2 - Add Device', async t => {
  // Test Data -----------------------------------------------------------------
  const newDevice = {
    'system_name': 'TestDevice',
    'type': 'MAC',
    'hdd_capacity': '1'
  }
  // Prerequisites -------------------------------------------------------------
  await devicesPage.openAddDevicePage();

  // Test ----------------------------------------------------------------------
  await addDevicePage.addDevice(newDevice);

  const device = await devicesPage.getDeviceByName(newDevice.system_name);
  await t.expect(device).eql(newDevice);

  // Restore Data --------------------------------------------------------------
  await devicesPage.deleteDeviceByName(newDevice.system_name);
  await t.expect((await devicesPage.getDeviceElementByName(newDevice.system_name)).exists).notOk();
});

test('Test 3 - Rename Device', async t => {
  // Test Data -----------------------------------------------------------------
  const deviceList = await devicesApi.getDeviceList();
  const oldDevice = deviceList[0];
  const newDevice = {
    'system_name': 'TestDevice',
    'type': 'MAC',
    'hdd_capacity': '2'
  }

  // Prerequisites -------------------------------------------------------------
  await devicesApi.updateDeviceById(oldDevice.id, newDevice);
  await t.eval(() => location.reload(true));

  // Test ----------------------------------------------------------------------
  const device = await devicesPage.getDeviceByName(newDevice.system_name);
  await t.expect(device).eql(newDevice);

  // Restore Data --------------------------------------------------------------
  await devicesApi.updateDeviceById(oldDevice.id, oldDevice);
});

test('Test 4 - Delete Device', async t => {
  // Test Data -----------------------------------------------------------------
  const deviceList = await devicesApi.getDeviceList();
  const expectedDevice = deviceList[deviceList.length - 1];

  // Prerequisites -------------------------------------------------------------
  await devicesApi.deleteDeviceById(expectedDevice.id);
  await t.eval(() => location.reload(true));

  // Test ----------------------------------------------------------------------
  const device = await devicesPage.getDeviceElementByName(expectedDevice.system_name);
  await t.expect(device.exists).notOk();

  // Restore Data --------------------------------------------------------------

});
