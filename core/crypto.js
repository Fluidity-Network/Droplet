class FluidityCrypto {
	static generate12Words(seed) {
		if(seed == null) {
			return envoy.randomWords({length: 12});
		} else {
			let nums = "";
			for(let i = 0; i < 11; i++) {
				nums += seed[i].toString() + ","
			}
			nums += seed[11].toString();
			return envoy.numbersToWords({string: nums});
		}
	}
	static generate24Words(seed) {
		if(seed == null) {
			return envoy.randomWords({length: 24});
		} else {
			let nums = "";
			for(let i = 0; i < 23; i++) {
				nums += seed[i].toString() + ","
			}
			nums += seed[23].toString();
			return envoy.numbersToWords({string: nums});
		}
	}
	static getWalletKey(words, nonce) {
		let nums = envoy.wordsToNumbers({string: words});
		let key = envoy.genKeys({seed: nonce + ":" + nums, bits: 2048});
		return key;
	}
	static addressFromPublicKey(publicKey) {
		let hex = envoy.stringToHex(publicKey);
		let addr = "0FAx" + hex.substring(hex.length - 46, hex.length - 6);
		return addr;
	}
	static generateWalletAddress(words, nonce) {
		let key = FluidityCrypto.getWalletKey(words, nonce);
		let pub = envoy.publicKeyString(key);
		return FluidityCrypto.addressFromPublicKey(pub);
	}
	static hash(data) {
		return envoy.sha256(data);
	}
	static sign(key, data) {
		return envoy.sign({privateKey: key, string: data});
	}
	static verify(data) {
		return envoy.verify({string: data});
	}
}
let envoy = new tEnvoy();