class FluidityConsensus {
	static nextForger(addressData, hash) {
		
	}
	
	static isValidDrop(drop) {
		drop = JSON.parse(drop);
		// 1. Check that the input amounts are less than or equal to the output amounts
		let values_currency = {};
		for(let i = 0; i < drop.inputs.length; i++) {
			let input = JSON.parse(drop.inputs[i]).body;
			if(values_currency[input.currency] == null) {
				values_currency[input.currency] = 0;
			}
			values_currency[input.currency] += input.amount;
		}
		for(let i = 0; i < drop.outputs.length; i++) {
			let output = JSON.parse(drop.outputs[i]);
			if(values_currency[output.currency] == null) {
				values_currency[output.currency] = 0;
			}
			values_currency[output.currency] -= output.amount;
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
		
		// 4. Check that all hashes and digital signatures are valid 
		for(let i = 0; i < drop.inputs.length; i++) {
			let input = JSON.parse(drop.inputs[i]);
			let fluidity_input = new FluidityInput(input.body.address, input.body.amount, input.body.currency, input.body.nonce);
			if(fluidity_input.getHash() != input.header.hash) {
				return false;
			}
			let verify = FluidityCrypto.verify(input.header.signature);
			if(!verify.valid) {
				return false;
			}
			if(verify.string != input.header.hash) {
				return false;
			}
			if(FluidityCrypto.addressFromPublicKey(verify.publicKey) != input.body.address) {
				return false;
			}
		}
		
		// Return true if all above conditions are met
		return true;
	}
	
	static isValidWave(wave) {
		
	}
	
	static forgeWave(wave) {
		
	}
}