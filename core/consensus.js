class FluidityConsensus {
	static nextForger(addressData, hash) {
		
	}
	
	static isValidDrop(drop) {
		// 1. Check that the input amounts are less than or equal to the output amounts
		let values_currency = {};
		for(let i = 0; i < drop.inputs.length; i++) {
			if(values_currency[drop.inputs[i].currency] == null) {
				values_currency[drop.inputs[i].currency] = 0;
			}
			values_currency[drop.inputs[i].currency] += drop.inputs[i].amount;
		}
		for(let i = 0; i < drop.outputs.length; i++) {
			if(values_currency[drop.outputs[i].currency] == null) {
				values_currency[drop.outputs[i].currency] = 0;
			}
			values_currency[drop.outputs[i].currency] -= drop.outputs[i].amount;
		}
		let values = Object.values(values_currency);
		for(let i = 0; i < values.length; i++) {
			if(values[i] < 0n) {
				return false;
			}
		}
		
		// 2. Check that the balance of the input addresses is enough to cover the transaction
		// TODO
		
		// 3. Check that the first input address has enough funds to cover the fee
		// TODO
		
		// 4. Check that all digital signatures are valid 
		// TODO
		
		// Return true if all above conditions are met
		return true;
	}
	
	static isValidWave(wave) {
		
	}
	
	static forgeDrop(drop) {
		
	}
}