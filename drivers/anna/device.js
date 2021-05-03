'use strict';

const PlugwiseThermostatDevice = require('../../lib/PlugwiseThermostatDevice');

module.exports = class PlugwiseAnnaDevice extends PlugwiseThermostatDevice {

  onInit(...props) {
    super.onInit(...props);

    this.registerCapabilityListener('location_preset', this.onCapabilityLocationPreset.bind(this));
  }

  async onCapabilityLocationPreset(value) {
    const { applianceId } = this;

    return this.bridge.setPreset({
      applianceId,
      preset: value,
    });
  }

};
