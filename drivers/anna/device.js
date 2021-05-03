'use strict';

const PlugwiseThermostatDevice = require('../../lib/PlugwiseThermostatDevice');

module.exports = class PlugwiseAnnaDevice extends PlugwiseThermostatDevice {

  onInit(...props) {
    super.onInit(...props);

    this.registerCapabilityListener('location_preset', this.onCapabilityLocationPreset.bind(this));
  }

  async onCapabilityLocationPreset(value) {
    await this.setPreset(value);
  }

  onPoll({ appliance, payload }) {
    // console.log(JSON.stringify(Object.keys(payload), false, 2));

    if (appliance
     && appliance.location
     && appliance.location.$attr
     && appliance.location.$attr.id) {
      this.locationId = appliance.location.$attr.id;
    }

    if (payload
     && payload.location
     && Array.isArray(payload.location)
     && this.locationId) {
      const location = payload.location.find(location => {
        if (!location.$attr) return false;
        return location.$attr.id === this.locationId;
      });

      if (location
       && location.preset) {
        this.setCapabilityValue('location_preset', location.preset || null).catch(this.error);
      }
    }
  }

  async setPreset(preset) {
    const { applianceId } = this;

    return this.bridge.setPreset({
      applianceId,
      preset,
    });
  }

};
