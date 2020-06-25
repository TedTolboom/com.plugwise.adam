'use strict';

const Homey = require('homey');
const PlugwiseThermostatDevice = require('../../lib/PlugwiseThermostatDevice');

module.exports = class PlugwiseAdamValveDevice extends PlugwiseThermostatDevice {
	onPoll({ appliance }) {
  	super.onPoll({ appliance });
    if( appliance.logs
     && Array.isArray(appliance.logs.point_log) ) {
       appliance.logs.point_log.forEach(log => {
         if( log.type === 'valve_position'
          && log.period
          && log.period.measurement ) {
           const value = parseFloat(log.period.measurement.$text) * 100;
           this.setCapabilityValue('valve_position', value).catch(this.error);
         };

				 if( log.type === 'battery'
          && log.period
          && log.period.measurement ) {
           const value = parseFloat(log.period.measurement.$text) * 100;
           this.setCapabilityValue('measure_battery', value).catch(this.error);
         }
       });
    }
	}
}
