const monsters = {
	Zombie: {
		position: {
	    	x: 280,
	    	y: 325
	 	},
		image: {
			src: './img/zombie.png'
		},
	 	frames: {
	    	max: 3,
	    	hold: 80
	  	},
	  	animate: true,
		name: 'Zombie',
		attacks: [attacks.Tackle, attacks.Fireball]
	},
	Charmander: {
		position: {
			x: 800,
		    y: 100
		},
		image: {
			src: './img/Charmander.png'
		},
		frames: {
		    max: 9,
		    hold: 40
		},
		animate: true,
		isEnemy: true,
		name: 'Charmander',
		attacks: [attacks.Tackle, attacks.Fireball]
	}
}
