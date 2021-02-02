class FluidityOcean() {
	constructor() {
		this.sea = [];
	}
	
	addSea(sea) {
		this.seas.push(sea);
	}
}

class FluiditySea() {
	constructor() {
		this.waves = [];
	}
	
	addWave(wave) {
		this.waves.push(wave);
	}
}

class FluidityWave() {
	constructor() {
		this.drops = [];
	}
	
	addDrop(drop) {
		this.drops.push(drop);
	}
}

class FluidityDrop() {
	constructor(inputs, outputs, fee, data) {
		this.inputs;
		this.outputs;
		this.fee;
		this.data;
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

class FluidityInput() {
	constructor(address, amount, currency) {
		
	}
}

class FluidityOutput() {
	constructor(address, amount, currency) {
		
	}
}