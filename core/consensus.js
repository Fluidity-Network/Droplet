class FluidityConsensus {
	static nextForger(addressData, hash) {
		
	}
	
	static isValidDrop(drop) {
		// 1. Check that the input amounts are less than or equal to the output amounts
		let values_currency = {};
		for(let i = 0; i < inputs.length; i++) {
			if(values_currency[inputs[i].currency] == null) {
				values_currency[inputs[i].currency] = 0;
			}
			values_currency[inputs[i].currency] += inputs[i].amount;
		}
		for(let i = 0; i < outputs.length; i++) {
			if(values_currency[outputs[i].currency] == null) {
				values_currency[outputs[i].currency] = 0;
			}
			values_currency[outputs[i].currency] -= outputs[i].amount;
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