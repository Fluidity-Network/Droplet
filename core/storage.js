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
}

class FluidityInput {
	constructor(address, amount, currency, nonce) {
		this.address = address || "";
		this.amount = amount || 0;
		this.currency = currency || "flow";
		this.nonce = nonce || 0;
		this.hash;
		this.signature;
		this.getHash();
	}
	getHash() {
		this.hash = FluidityCrypto.hash(this.stringify());
		return this.hash;
	}
	sign(key) {
		this.signature = FluidityCrypto.sign(key, this.getHash());
		return FluidityCrypto.sign(key, this.getHash());
	}
	stringify() {
		return '{"address":"' + this.address + '","amount":' + this.amount + ',"currency":"' + this.currency + '","nonce":' + this.nonce + '}';
	}
}

class FluidityOutput {
	constructor(address, amount, currency) {
		this.address = address || "";
		this.amount = amount || 0;
		this.currency = currency || "flow";
	}
	stringify() {
		return '{"address":"' + this.address + '","amount":' + this.amount + ',"currency":"' + this.currency + '"}';
	}
}