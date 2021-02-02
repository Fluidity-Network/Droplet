class FluidityCrypto {
	static generate12Words() {
		return envoy.randomWords({length: 12});
	}
	static generate24Words() {
		return envoy.randomWords({length: 24});
	}
	static getWalletKey(words, nonce) {
		let nums = envoy.wordsToNumbers({string: words});
		let key = envoy.genKeys({seed: nonce + ":" + nums, bits: 2048});
		return key;
	}
	static generateWalletAddress(words, nonce) {
		let key = FluidityCrypto.getWalletKey(words, nonce);
		let pub = envoy.publicKeyString(key);
		let hex = envoy.stringToHex(pub);
		let addr = "0FAx" + hex.substring(hex.length - 46, hex.length - 6);
		return addr;
	}
	static hash(data) {
		return envoy.sha256(data);
	}
}
let envoy = new tEnvoy();