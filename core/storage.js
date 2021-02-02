class FluidityOcean {
	constructor() {
		this.sea = [];
	}
	
	addSea(sea) {
		this.seas.push(sea);
	}
}

class FluiditySea {
	constructor() {
		this.waves = [];
	}
	
	addWave(wave) {
		this.waves.push(wave);
	}
}

class FluidityWave {
	constructor() {
		this.drops = [];
	}
	
	addDrop(drop) {
		this.drops.push(drop);
	}
}

class FluidityDrop {
	constructor(inputs, outputs, fee, data) {
		this.inputs = inputs || [];
		this.outputs = outputs || [];
		this.fee = fee || 0;
		this.data = data || "";
	}
	getInputs() {
		return this.inputs;
	}
	setInputs(inputs) {
		this.inputs = inputs;
	}
	addInput(input) {
		this.inputs.push(input);
	}
	getOutputs() {
		return this.outputs;
	}
	setOutputs(outputs) {
		this.outputs = outputs;
	}
	addOutput(output) {
		this.outputs.push(output);
	}
	getFee() {
		return this.fee;
	}
	setFee(fee) {
		this.fee = fee;
	}
	getData() {
		return this.data;
	}
	setData(fee) {
		this.fee = data;
	}
	stringify() {
		let stringify_inputs = [];
		for(let i = 0; i < this.inputs.length; i++) {
			stringify_inputs.push(this.inputs[i].stringify());
		}
		let stringify_outputs = [];
		for(let i = 0; i < this.outputs.length; i++) {
			stringify_outputs.push(this.outputs[i].stringify());
		}
		return '{"inputs":' + JSON.stringify(stringify_inputs) + ',"outputs":' + JSON.stringify(stringify_outputs) + ',"fee":' + this.fee + ',"data":"' + this.data + '"}';
	}
}

class FluidityInput {
	constructor(address, amount, currency, nonce, key) {
		this.address = address || "";
		this.amount = amount || 0;
		this.currency = currency || "flow";
		this.nonce = nonce || 0;
		this.key = key || null;
		this.hash;
		this.signature;
		this.getHash();
		this.sign();
	}
	getHash() {
		this.hash = FluidityCrypto.hash(this.stringify(true));
		return this.hash;
	}
	sign() {
		this.signature = FluidityCrypto.sign(this.key, this.getHash());
		return this.signature;
	}
	stringify(bodyOnly) {
		if(bodyOnly == null) {
			bodyOnly = false;
		}
		if(bodyOnly) {
			return '{"address":"' + this.address + '","amount":' + this.amount + ',"currency":"' + this.currency + '","nonce":' + this.nonce + '}';
		} else {
			this.getHash();
			this.sign();
			return '{"header":{"hash":"' + this.hash + '","signature":"' + this.signature + '"},"body":{"address":"' + this.address + '","amount":' + this.amount + ',"currency":"' + this.currency + '","nonce":' + this.nonce + '}}';
		}
	}
}

class FluidityOutput {
	constructor(address, amount, currency) {
		this.address = address || "";
		this.amount = amount || 0;
		this.currency = currency || "flow";
	}
	getAddress() {
		return address;
	}
	setAddress(address) {
		this.address = address;
	}
	getAmount() {
		return amount;
	}
	setAmount(amount) {
		this.amount = amount;
	}
	getCurrency() {
		return this.currency;
	}
	setCurrency(currency) {
		this.currency = currency;
	}
	stringify() {
		return '{"address":"' + this.address + '","amount":' + this.amount + ',"currency":"' + this.currency + '"}';
	}
}