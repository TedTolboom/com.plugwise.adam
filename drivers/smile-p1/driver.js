'use strict';

const Homey = require('homey');
const PlugwiseDriver = require('../../lib/PlugwiseDriver');

module.exports = class PlugwiseSmileP1Driver extends PlugwiseDriver {
  
  static get BRIDGE_PRODUCTS() {
    return [ 'smile' ];
  }
  
  onPairFilterAppliance({ appliance, bridge }) {
    const bridgeVersionMajor = parseInt(bridge.version.split('.'));
    if( bridgeVersionMajor < 3 ) return false;
    appliance.name = 'Smile P1';
    return appliance.type === 'gateway';
  }
	
}