class FluidityPeer {
	constructor(id = "") {
		return new Promise((resolve, reject) => {
			if(id == "") {
				this.peer = new Peer();
			} else {
				this.peer = new Peer(id);
			}
			this.peer.on('open', (id) => {
				this.id = id;
				this.connections = [];
				this.onConnect = function(conn_id, peer_id) {}
				this.onReceive = function(data, conn_id, peer_id, encrypted) {}
				this.onDisconnect = function(conn_id, peer_id) {}
				this.encrypted = true;
				this.AESKey = null;
				this.tEnvoy = null;
				if(window.TogaTech != null) {
					this.tEnvoy = window.TogaTech.tEnvoy;
				}
				this.peer.on('connection', (conn) => {
					let fluidityConn = new FluidityConnection(conn, this);
					fluidityConn.onReceive = this.onReceive;
					fluidityConn.onDisconnect = this.onDisconnect;
					fluidityConn.encrypted = this.encrypted;
					fluidityConn.AESKey = this.AESKey;
					fluidityConn.tEnvoy = this.tEnvoy;
					this.connections.push(fluidityConn);
					this.onConnect(fluidityConn.id, fluidityConn.peer);
				});
				resolve(this);
			});
		});
	}
	connect(id) {
		return new Promise((resolve, reject) => {
			let conn = this.peer.connect(id);
			conn.on('open', () => {
				let fluidityConn = new FluidityConnection(conn, this);
				fluidityConn.onReceive = this.onReceive;
				fluidityConn.onDisconnect = this.onDisconnect;
				fluidityConn.encrypted = this.encrypted;
				fluidityConn.AESKey = this.AESKey;
				fluidityConn.tEnvoy = this.tEnvoy;
				this.connections.push(fluidityConn);
				resolve(fluidityConn);
			});
		});
	}
	send(id, message, encrypted = true) {
		return new Promise((resolve, reject) => {
			let conn;
			if(typeof id == "object") {
				conn = this.connections.find(c => c.id == id.id && c.peer == id.peer);
			} else {
				conn = this.connections.find(c => c.id == id);
			}
			if(conn != null) {
				conn.send(message, encrypted);
				resolve(true);
			} else {
				reject("No peer found!");
			}
		});
	}
	broadcast(message, encrypted = true) {
		return new Promise(async (resolve, reject) => {
			for(let i = 0; i < this.connections.length; i++) {
				await this.send(this.connections[i].id, message, encrypted);
			}
			resolve(true);
		});
	}
	close(id) {
		return new Promise((resolve, reject) => {
			let conn;
			if(typeof id == "object") {
				conn = this.connections.find(c => c.id == id.id && c.peer == id.peer);
			} else {
				conn = this.connections.find(c => c.id == id);
			}
			let connIndex = this.connections.indexOf(conn);
			if(conn != null) {
				try {
					conn.close();
				} catch(err) {

				}
				this.connections.splice(connIndex, 1);
				resolve(true);
			} else {
				reject("No peer found!");
			}
		});
	}
}

class FluidityConnection {
	constructor(conn, parent) {
		this.conn = conn;
		this.parent = parent;
		this.id = this.conn.connectionId;
		this.peer = this.conn.peer;
		this.onReceive = function(data, conn_id, peer_id, encrypted) {}
		this.onDisconnect = function(conn_id, peer_id) {}
		this.encrypted = true;
		this.AESKey = null;
		this.tEnvoy = null;
		if(window.TogaTech != null) {
			this.tEnvoy = window.TogaTech.tEnvoy;
		}
		conn.on('data', (data) => {
			let decrypted = this.decryptReceive(data);
			this.onReceive(decrypted.message, this.id, this.peer, decrypted.encrypted);
		});
		conn.on('close', () => {
			this.parent.close(this.id);
			this.onDisconnect(this.id, this.peer);
		})
	}
	send(message, encrypted = true) {
		let messageType = "string";
		if(typeof message != "string") {
			try {
				message = JSON.stringify(message);
				messageType = "object";
			} catch(err) {

			}
			
		}
		if(encrypted && this.encrypted && this.AESKey != null && this.tEnvoy != null && this.tEnvoy.encrypt != null) {
			message = {
				encrypted: true,
				type: messageType,
				packet: this.tEnvoy.encrypt({
					AESKey: this.AESKey,
					string: message
				})
			};
		} else {
			message = {
				encrypted: false,
				type: messageType,
				packet: message
			}
		}
		this.conn.send(message);
	}
	decryptReceive(message) {
		let messageType = message.type;
		let encrypted = false;
		if(message.encrypted && this.encrypted && this.AESKey != null && this.tEnvoy != null && this.tEnvoy.decrypt != null) {
			message = this.tEnvoy.decrypt({
				AESKey: this.AESKey,
				string: message.packet
			});
			encrypted = true;
		} else {
			message = message.packet;
		}
		if(messageType == "object") {
			try {
				message = JSON.parse(message);
			} catch(err) {
			}
		}
		return {
			message: message,
			encrypted: encrypted
		};
	}
	close() {
		this.conn.close();
	}
}