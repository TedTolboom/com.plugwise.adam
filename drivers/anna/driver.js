'use strict';

const PlugwiseAnnaDriver = require('../../lib/PlugwiseAnnaDriver');

module.exports = class extends PlugwiseAnnaDriver {

  onPairFilterAppliance({ appliance }) {
    if (appliance.type === 'zone_thermostat') return true;
    if (appliance.type === 'thermostat') return true;
    return false;
  }

};
