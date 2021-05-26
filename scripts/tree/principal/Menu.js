/* global game */

var Technotip = {};

Technotip.Menu = function (game) {
	let fondo_n1;
	let instruccion;
	let nivel1;
	let nivel2;
	let estoySobre;
	let intrucciones;
	let intFx;
	let contador;
	let posicionx;
	var twennDerecha;
	var twennIzquierda;
	var twennAbajo;
	var twennArriba;
};

Technotip.Menu.prototype = {
	init: function (datosLink) {
		//this.tipoActividad=tipoActividad;
		//this.idActividad=idActividad;
		this.datosSeccionAnterior = datosLink;
		// este metodo recibe los valores de los parametros si hay, se deben declarar dentro de init function(param1,param2,param3...);
		contador = 0;
		arraySon = [
			'sonCero',
			'sonUno',
			'sonDos',
			'sonTres',
			'sonCuatro',
			'sonCinco',
			'sonSeis',
			'sonSiete',
			'sonOcho',
		];
		posicionx = -80;
		posx = 0;
		contadoSubidas = 0;
		contadoNivel = 0;
		contadorPuntos = 0;
		activarDerecha = false;
		activarIzquierda = false;
		contadorMonedas = 0;
		activarAbajo = false;
		activarArriba = false;
	},

	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		game.load.image('fondo', 'img/fondo.png');
		game.load.image('bocina', 'img/bocina.png');
		game.load.audio('instruccion', 'audio/instrucciones.mp3');
		game.load.audio('sonMoneda', 'audio/agarrarMonedas-2.mp3');
		game.load.audio('sonMuerto', 'audio/agarrarMonedas-1.mp3');
		game.load.image('seguir', 'img/agarrarMonedas-49.png');

		game.load.image('pajaro', 'img/agarrarMonedas-6.png');
		game.load.image('monedas', 'img/moneda.png');
		game.load.image('pez', 'img/agarrarMonedas-3.png');
		game.load.image('aguila', 'img/agarrarMonedas-37.png');

		game.load.image('imgBuena1', 'img/CS_correcta_1.png');
		game.load.image('imgBuena2', 'img/CS_correcta_2.png');
		game.load.image('imgBuena3', 'img/CS_correcta_3.png');
		game.load.image('imgBuena4', 'img/CS_correcta_4.png');
		game.load.image('imgBuena5', 'img/CS_correcta_5.png');
		game.load.image('imgBuena6', 'img/CS_correcta_6.png');

		game.load.image('imgMala1', 'img/CS_incorrecta_1.png');
		game.load.image('imgMala2', 'img/CS_incorrecta_2.png');
		game.load.image('imgMala3', 'img/CS_incorrecta_3.png');
		game.load.image('imgMala4', 'img/CS_incorrecta_4.png');
		game.load.image('imgMala5', 'img/CS_incorrecta_5.png');
		game.load.image('imgMala6', 'img/CS_incorrecta_6.png');
	},

	create: function () {
		this.instruccionesFx = this.add.audio('instruccion', 1, false);
		this.sonMonedaFX = this.add.audio('sonMoneda', 1, false);
		this.sonMuertoFX = this.add.audio('sonMuerto', 1, false);

		this.dibujaPantalla();
	},

	//----- aqui se pueden iniciar los metodos que se necesiten
	dibujaPantalla: function () {
		gameWidth = game.width;
		gameHeight = game.height;

		/*Se cambia el color del fondo*/
		this.game.stage.backgroundColor = 'ffffff';

		/*Agregar el fondo del juego*/
		fondo_n1 = game.add.sprite(0, 0, 'fondo');
		this.generaFondo(fondo_n1);

		/*Colocar las instrucciones */

		intrucciones = game.add.text(
			295,
			-95,
			'Ayuda al pajarito a volar. Mueve las flechas de las teclas para \nrecoger las monedas, tener puntos. Cuida que la piraña o el aguila, \nno se coman al pajarito.',
			{
				fontSize: '20px',
				fill: '#404040',
			}
		);
		iconoBocina = game.add.image(220, 14, 'bocina');
		iconoBocina.inputEnabled = true;
		iconoBocina.input.useHandCursor = true;
		iconoBocina.events.onInputOver.add(over, this);
		iconoBocina.events.onInputOut.add(out, this);
		iconoBocina.scale.setTo(0.8);
		iconoBocina.events.onInputDown.add(this.clickIconoBocina, this);
		game.add.tween(intrucciones).to({ y: 11 }, 2000, Phaser.Easing.Bounce.Out, true);

		nivel1 = game.add.sprite(1000, 700, 'seguir');
		nivel1.anchor.setTo(0.5, 0.5);
		nivel1.scale.setTo(1);
		nivel1.alpha = 1;
		nivel1.inputEnabled = true;
		nivel1.events.onInputOver.add(over2, this);
		nivel1.events.onInputOut.add(out2, this);
		nivel1.input.useHandCursor = true;
		nivel1.events.onInputDown.add(this.siguiente, this);

		txtSiguiente = game.add.text(nivel1.x, nivel1.y - 35, 'Empezar', {
			fontSize: '25px',
			fill: '#404040',
		});
		txtSiguiente.anchor.setTo(0.5);

		lienzo = game.add.graphics(0, 0);
		lienzo.beginFill(0xb27db2);
		lienzo.drawRect(0, 0, 200, 80);
		lienzo.endFill();
		lienzo.alpha = 0.9;
		txtNivel = game.add.text(100, 40, 'Nivel: ' + contadoNivel, {
			fontSize: '35px',
			fill: '#ffffff',
		});
		txtNivel.anchor.setTo(0.5);

		lienzo2 = game.add.graphics(0, 0);
		lienzo2.beginFill(0xab71ab);
		lienzo2.drawRect(1100, 0, 200, 80);
		lienzo2.endFill();
		lienzo2.alpha = 0.8;
		txtPuntos = game.add.text(1200, 40, 'Puntos: ' + contadorPuntos, {
			fontSize: '35px',
			fill: '#ffffff',
		});
		txtPuntos.anchor.setTo(0.5);

		// nivel1.inputEnabled=false
		game.physics.startSystem(Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();
		activarFlechas = false;

		group = game.add.physicsGroup();

		function over(imagen) {
			imagen.scale.setTo(0.85, 0.85);

			this.estoySobre = imagen;
		}
		function out(imagen) {
			imagen.scale.setTo(0.8, 0.8);
		}

		function over2(imagen) {
			imagen.scale.setTo(1.05, 1.05);

			this.estoySobre = imagen;
		}
		function out2(imagen) {
			imagen.scale.setTo(1, 1);
		}
	},
	clickIconoBocina: function () {
		this.instruccionesFx.play();
	},
	update: function () {
		if (activarFlechas) {
			game.physics.arcade.collide(
				imgPajaro,
				group,
				this.collisionHandler,
				this.processHandler,
				this
			);
			game.physics.arcade.collide(
				imgPajaro,
				imgAguila,
				this.collisionHandler2,
				this.processHandler,
				this
			);
			game.physics.arcade.collide(
				imgPajaro,
				imgPez,
				this.collisionHandler3,
				this.processHandler,
				this
			);

			imgPajaro.body.velocity.x = 0;
			imgPajaro.body.velocity.y = 0;

			if (cursors.left.isDown) {
				imgPajaro.body.velocity.x = -300;
			} else if (cursors.right.isDown) {
				imgPajaro.body.velocity.x = 300;
			}

			if (cursors.up.isDown) {
				imgPajaro.body.velocity.y = -300;
			} else if (cursors.down.isDown) {
				imgPajaro.body.velocity.y = 300;
			}
		}
	},
	clicSonido: function () {
		this.sonUnoFX = this.add.audio(arraySon[contador], 1, false);
		this.sonUnoFX.play();
	},

	siguiente: function (n) {
		contadoNivel += 1;

		if (contadoNivel == 6) {
			this.onClickRepetir();
		} else {
			txtNivel.text = 'Nivel: ' + contadoNivel;

			nivel1.alpha = 0;
			nivel1.inputEnabled = false;
			txtSiguiente.alpha = 0;

			this.colocarPajaro();
			group = game.add.physicsGroup();

			for (var i = 0; i < 10; i++) {
				posicionx = posicionx + 120;
				var dropOffset = this.numeroAleatorio(100, 400);
				group.create(posicionx, dropOffset, 'monedas');
				game.add
					.tween(group)
					.to({ x: 40, y: 150 }, 1500, 'Sine.easeInOut', true, 0, false)
					.yoyo(true);
			}

			this.moverPe();
			this.moverAguila();
		}
	},
	/*Funcion para colocar el pajaro que se movera*/
	colocarPajaro: function () {
		imgPajaro = game.add.sprite(650, 400, 'pajaro');
		imgPajaro.anchor.setTo(0.5, 0.5);
		imgPajaro.scale.setTo(1);
		game.physics.arcade.enable(imgPajaro);
		imgPajaro.body.collideWorldBounds = true;
		activarFlechas = true;
	},
	/*funcion para mover el aguila de un lado*/
	moverAguila: function () {
		posx = this.numeroAleatorio(150, 500);
		imgAguila = game.add.sprite(0, posx, 'aguila');
		imgAguila.anchor.setTo(0.5);
		game.physics.arcade.enable(imgAguila);
		derecha();

		function derecha() {
			console.log(imgAguila.x);

			twennDerecha = game.add
				.tween(imgAguila)
				.to({ x: 1300 }, 5000, Phaser.Easing.Bounce.in, true);
			twennDerecha.onComplete.add(izquierda, this);
			activarDerecha = true;
			activarIzquierda = false;
		}
		function izquierda() {
			console.log(imgAguila.x);

			twennIzquierda = game.add
				.tween(imgAguila)
				.to({ x: 0 }, 5000, Phaser.Easing.Bounce.in, true);
			twennIzquierda.onComplete.add(derecha, this);
			activarDerecha = false;
			activarIzquierda = true;
		}
	},
	/*Funcion par mover los peces*/
	moverPe: function () {
		imgPez = game.add.sprite(0, 700, 'pez');
		imgPez.anchor.setTo(0.5);
		game.physics.arcade.enable(imgPez);

		this.arriba();
	},
	/*se utiliza para mover hacia abajo al pez*/
	abajo: function () {
		if (contador == 6) {
			posx = 0;
			imgPez.kill();
			contador = 0;
			this.moverPe();
		} else {
			posx = posx + 150;
			twennAbajo = game.add
				.tween(imgPez)
				.to({ x: posx, y: 700 }, 1000, Phaser.Easing.Bounce.in, true);
			twennAbajo.onComplete.add(this.arriba, this);
			activarAbajo = true;
			activarArriba = false;
		}
	},
	/*Se utiliza para mover hacia arriba al pez*/
	arriba: function () {
		posx = posx + 150;
		contador += 1;
		twennArriba = game.add
			.tween(imgPez)
			.to({ x: posx, y: 600 }, 1000, Phaser.Easing.Bounce.in, true);
		twennArriba.onComplete.add(this.abajo, this);
		activarAbajo = false;
		activarArriba = true;
	},
	/*Cuando existe una colision con las monedas*/
	collisionHandler: function (player, veg) {
		this.sonMonedaFX.play();
		veg.kill();
		contadorPuntos += 1;
		txtPuntos.text = 'Puntos: ' + contadorPuntos;

		contadorMonedas += 1;

		if (contadorMonedas == 10 && contadoNivel == 5) {
			nivel1.alpha = 1;
			nivel1.inputEnabled = true;
			txtSiguiente.text = 'Repetir';
			txtSiguiente.alpha = 1;
			imgPajaro.kill();
			group.kill();

			imgPez.kill();

			imgAguila.kill();
			twennDerecha.stop();
			twennIzquierda.stop();
			if (activarAbajo) {
				twennAbajo.stop();
			}
			if (activarArriba) {
				twennArriba.stop();
			}
		} else {
			if (contadorMonedas == 10) {
				this.califica('bien');
				nivel1.alpha = 1;
				nivel1.inputEnabled = true;
				txtSiguiente.text = 'Siguiente';
				txtSiguiente.alpha = 1;
				imgPajaro.kill();
				group.kill();

				imgPez.kill();

				imgAguila.kill();
				twennDerecha.stop();
				twennIzquierda.stop();
				if (activarAbajo) {
					twennAbajo.stop();
				}
				if (activarArriba) {
					twennArriba.stop();
				}

				posx = 0;
				posicionx = -80;
				contadorMonedas = 0;
			}
		}
	},
	collisionHandler2: function (player, veg) {
		//colosion con el aguila
		this.sonMuertoFX.play();
		this.califica('mal');
		player.kill();
		imgAguila.kill();

		if (activarDerecha) {
			twennDerecha.stop();
		}
		if (activarIzquierda) {
			twennIzquierda.stop();
		}

		this.moverAguila();

		activarFlechas = false;
		this.colocarPajaro();
		imgPajaro.alpha = 0;
		var twenn = game.add.tween(imgPajaro).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.in, true);

		activarFlechas = true;
	},
	collisionHandler3: function (player, veg) {
		this.sonMuertoFX.play();
		this.califica('mal');
		player.kill();
		veg.kill();
		this.colocarPajaro();
		imgPajaro.alpha = 0;
		var twenn = game.add.tween(imgPajaro).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.in, true);

		imgPez = game.add.sprite(0, 700, 'pez');
		imgPez.anchor.setTo(0.5);
		game.physics.arcade.enable(imgPez);
		posx = 0;
		posx = posx + 150;
		var twenn = game.add
			.tween(imgPez)
			.to({ x: posx, y: 700 }, 1000, Phaser.Easing.Bounce.in, true);
	},
	processHandler: function (player, veg) {
		return true;
	},

	califica: function (tipo) {
		var icono;
		switch (tipo) {
			case 'bien':
				let arreglo = [
					'imgBuena1',
					'imgBuena2',
					'imgBuena3',
					'imgBuena4',
					'imgBuena5',
					'imgBuena6',
				];
				icono = game.add.sprite(0, 0, arreglo[this.numeroAleatorio3(5)]);
				this.imagenColocada = true;
				break;
			case 'mal':
				let arreglo2 = ['imgMala1', 'imgMala2', 'imgMala3', 'imgMala4', 'imgMala5', 'imgMala6'];
				icono = game.add.sprite(0, 0, arreglo2[this.numeroAleatorio3(5)]);
				this.imagenColocada = false;
				break;
		}
		icono.anchor.setTo(0.5);
		icono.x = 650;
		icono.y = 400;
		// el tween recibe el parametro del tiempo en milisegundos
		var tween = game.add.tween(icono).to({ alpha: 0, y: 400 - 120 }, 1500, 'Linear', true);
		tween.onComplete.add(borraIcono, this);
		function borraIcono() {
			icono.destroy();
		}
	},
	numeroAleatorio3: function (de) {
		return Math.floor(Math.random() * de);
	},
	onStart: function () {
		this.tadaFx.play();
	},
	numeroAleatorio: function (min, max) {
		return Math.round(Math.random() * (max - min) + min);
	},
	ajustaImagen: function (imagen) {
		imagen.width = imagen.width;
		imagen.heiht = imagen.height;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	ajustaImagen2: function (imagen) {
		imagen.width = imagen.width;
		imagen.heiht = imagen.height;
		imagen.scale.setTo(1.5, 1.5);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	ajustaImagen3: function (imagen) {
		imagen.width = imagen.width;
		imagen.heiht = imagen.height;
		imagen.scale.setTo(2.5, 2.5);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	ajustaImagenBloque: function (imagen) {
		imagen.width = imagen.width * 3;
		imagen.heiht = imagen.height * 3;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;

		this.grupoBotonesBloque.add(imagen);
		imagen.scale.setTo(0, 0);
		imagen.inputEnabled = true;
		imagen.input.useHandCursor = true;
		imagen.events.onInputDown.add(this.onClickButtonBloque, this);
	},
	ajustaCapa: function (imagen) {
		imagen.height = game.height;
		imagen.width = game.width;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	onClickRepetir: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		game.state.start('Menu');
	},
	onClickSiguiente: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		this.state.start('b1l1a2');
	},
	onClickIntermedio: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		this.state.start('intermedio');
	},
	onClickAvanzado: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		this.state.start('avanzado');
	},
	/*Se genera para el documento Cesar*/
	generaFondo: function (imagen) {
		//imagen = game.add.sprite(0,0,'fondo');
		imagen.height = game.height;
		imagen.width = game.width;
		imagen.anchor.x = 0.5;
		imagen.anchor.y = 0.5;
		imagen.x = game.width * 0.5;
		imagen.y = game.height * 0.5;
	},
	generaFondo2: function (imagen) {
		//imagen = game.add.sprite(0,0,'fondo');
		imagen.height = game.height - 250;
		imagen.width = game.width - 100;
		imagen.anchor.x = 0.5;
		imagen.anchor.y = 0.5;
		imagen.x = game.width * 0.5;
		imagen.y = game.height * 0.56;
		imagen.alpha = 0.5;
		console.log(imagen);
	},
};
