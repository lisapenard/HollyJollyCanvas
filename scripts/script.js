let isChristmasHere = false
let ballsReady = false;

window.addEventListener('load', () => {
    
    const height = info.height,
          width = info.width;

    const canvas = document.querySelector('canvas'); // canvas intialization
    const context = canvas.getContext('2d'); // canvas initialization
    canvas.height = height; // canvas height initialization
    canvas.width = width; // canvas width intitialization 
    const image = new Image();
    image.src = 'images/winterforest.png';
	
	const $santaBtn = document.querySelector('.btnSanta')
	
	$santaBtn.addEventListener('click', () => {isChristmasHere=true; console.log(isChristmasHere);})
	
	

    const config = { // properties initial configuration  
        minSize: 2,
        maxSize: 4,
        speed: 3,
        minSpeed: 1,
        maxSpeed: 10,
        quantity: 2050,
        windSpeed: 0,
        maxWindSpeed: 1,
    };

    let particles = []; // particles configuration
    for (let i = 0; i < config.quantity; i++) { // remplissage du tableau particules
        particles[i] = [];
        particles[i]['size'] = Math.rnd(config.minSize, config.maxSize);
        particles[i]['x'] = null;
        particles[i]['y'] = null;
        particles[i]['fillAlpha'] = Math.rnd(0.5, 1);
        particles[i]['translate'] = 0;
        particles[i]['clockwise'] = Math.rnd();
        particles[i]['offset'] = Math.rnd(50, 400);
        particles[i]['offsetValue'] = Math.rnd(0,1);
    }

    const particlesAnimation = () => { // particles animation 

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < config.quantity; i++) {

            context.save();
            const p = particles[i]; // configuration of the variable p = particles 

            context.fillStyle = `rgba(255,255,255,${p.fillAlpha})`; // particles's style configuration

            if (p.y > height + p.size) {
                p.y = null;
                p.x = null;
                p.translate = 0;
            }

            const speed = config.speed / p.size;
            p.translate += speed * config.windSpeed;
            p.rotate += speed;
            

            p.x = (p.x === null) ? Math.rnd(-width, width*2) : p.x;
            p.y = (p.y === null) ? -Math.rnd(p.size, height) : p.y + speed;

            context.translate(p.translate + p.x + (p.offsetValue*p.offset), p.y); // pour que les particules ne soient pas collées
            
            context.fillRect(0, 0, p.size, p.size);
            context.restore();

        }
		
        
		
			console.log("ok lets ball");
			drawBalls()
		
		context.globalAlpha = 1
        drawSanta()
		
		
		requestAnimationFrame(particlesAnimation); // exécution de la fonction
 
    };

    image.onload = particlesAnimation;
	

	function getRandomIntInclusive(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min +1)) + min;
	}
	
	var christmasBalls = []; 
	const ballsQty = 200
	const colorsTab = ["yellow", "red", "pink", "orange", "green", "violet", "cyan", "skyblue"]
	
	for (let i = 0; i < ballsQty; i++) // christmas decoration animation 
	{
		christmasBalls[i] = []
		christmasBalls[i]['coordXtarget'] = getRandomIntInclusive(0, width)
		//christmasBalls[i]['coordX'] = christmasBalls[i]['coordXtarget']
		christmasBalls[i]['coordYtarget'] = getRandomIntInclusive( (height - 384 + 120) , (height - 184))
		christmasBalls[i]['coordY'] = christmasBalls[i]['coordYtarget'] - 100
		christmasBalls[i]['color'] = colorsTab[getRandomIntInclusive(0, colorsTab.length)]
		christmasBalls[i]['opacity'] = 0
		christmasBalls[i]['size'] = getRandomIntInclusive( 3 , 8)
	}
  
	function drawBalls() // christmas balls configuration
	{
		for (let i = 0; i < ballsQty; i++)
		{
			context.save();
			if(isChristmasHere && !ballsReady)
			{
				context.save();
				if(parseInt(christmasBalls[i]['opacity']) < 100)
				{
					christmasBalls[i]['opacity'] = parseInt(christmasBalls[i]['opacity']) + 1
				}
				else
				{
					console.log("ballsReady true;");
					ballsReady = true;
				}
				
				context.beginPath()
				context.arc(christmasBalls[i]['coordXtarget'], christmasBalls[i]['coordYtarget'], christmasBalls[i]['size'], 0, Math.PI * 2)
				context.globalAlpha = christmasBalls[i]['opacity'] / 100
				context.fillStyle = christmasBalls[i]['color']
				context.fill()
				context.restore();
			}
			else if(isChristmasHere && ballsReady)
			{
				context.save();
				context.beginPath()
				context.arc(christmasBalls[i]['coordXtarget'], christmasBalls[i]['coordYtarget'], christmasBalls[i]['size'], 0, Math.PI * 2)
				context.globalAlpha = 1
				context.fillStyle = christmasBalls[i]['color']
				context.fill()
				context.restore();
			}
		}
	}
	


function drawSanta() // santa configuration
{
	
	const text = 'Le Père Noël n\'attend que votre clic !'

	context.font = '20px Arial'  // Font
	context.textAlign = 'center' // Alignement horizontal (left | center | right)
	context.textBaseline = 'middle' // Alignement vertical (top | bottom | middle | alphabetic | hanging)
	
	context.fillStyle = 'red';
	  
	const textHeight = context.measureText(text).height
	const textWidth = context.measureText(text).width
	
	context.fillText(text, (width / 2), (height - 40)) // Faire apparaitre le texte


		const posiCircleX = info.width /2 - 620
		const posiCircleY = info.height /2 - 300


        // 1st bg
        context.beginPath()
        context.arc(posiCircleX + 620, posiCircleY + 300, 160, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()
        
        // 2nd bg
        context.beginPath()
        context.arc(posiCircleX + 620, posiCircleY + 300, 152, 0, Math.PI * 2)
        context.fillStyle = 'rgb(45, 153, 76)'
        context.fill()
        
        // santa's body
        context.beginPath()
        /*
        context.moveTo(530, 422)
		context.bezierCurveTo(540, 400, 620, 250, 710, 422);*/
		
        context.moveTo(posiCircleX + 530, posiCircleY + 422)
        context.bezierCurveTo(posiCircleX + 540, posiCircleY + 400, posiCircleX + 620, posiCircleY + 250, posiCircleX + 710, posiCircleY + 422);
		
        context.moveTo(posiCircleX + 530, posiCircleY + 422)
        context.bezierCurveTo(posiCircleX + 575, posiCircleY + 458, posiCircleX + 650, posiCircleY + 468, posiCircleX + 710, posiCircleY + 422);
        context.fillStyle = 'rgb(212, 25, 38)'
        context.fill()

        // santa's head
        context.beginPath()
        context.arc(posiCircleX + 620, posiCircleY + 260, 60, 0, Math.PI * 2)
        context.fillStyle = 'rgb(230, 185, 153)'
        context.fill()
        
        // santa's beard
        context.beginPath()
        context.moveTo(posiCircleX + 560, posiCircleY + 270)
        context.bezierCurveTo(posiCircleX + 500, posiCircleY + 390, posiCircleX + 730, posiCircleY + 400, posiCircleX + 680, posiCircleY + 270);
        context.fillStyle = 'white'
        context.fill()

        // santa's nose
        context.beginPath()
        context.arc(posiCircleX + 620, posiCircleY + 270, 12, 0, Math.PI * 2)
        context.fillStyle = 'rgb(230, 185, 153)'
        context.fill()

        // santa's mouth
        context.beginPath()
        context.moveTo(posiCircleX + 612, posiCircleY + 290)
        context.bezierCurveTo(posiCircleX + 610, posiCircleY + 290, posiCircleX + 620, posiCircleY + 306, posiCircleX + 630, posiCircleY + 290)
        context.fillStyle = 'rgb(156, 119, 97)'
        context.fill()
        

        // santa's hat red
        context.beginPath()
        context.moveTo(posiCircleX + 565, posiCircleY + 225)
        context.bezierCurveTo(posiCircleX + 550, posiCircleY + 200, posiCircleX + 670, posiCircleY + 110, posiCircleX + 675, posiCircleY + 225)
        context.fillStyle = 'rgb(212, 25, 38)'
        context.fill()

        // santa's hat red part II
        context.beginPath()
        context.moveTo(posiCircleX + 635, posiCircleY + 168)
        context.bezierCurveTo(posiCircleX + 740, posiCircleY + 180, posiCircleX + 720, posiCircleY + 380, posiCircleX + 670, posiCircleY + 210)
        context.fillStyle = 'rgb(212, 25, 38)'
        context.fill()

        // santa's hair 
        context.beginPath()
        context.moveTo(posiCircleX + 568, posiCircleY + 230)
        // context.lineTo(566, 275)
        context.bezierCurveTo(posiCircleX + 570, posiCircleY + 230, posiCircleX + 560, posiCircleY + 240, posiCircleX + 566, posiCircleY + 270)
        context.lineWidth = 12       // Largeur de la ligne
        context.lineCap = 'round'  // Fin de ligne (round | butt | square)
        context.strokeStyle = 'white' // Couleur de la ligne
        context.stroke()

        context.beginPath()
        context.moveTo(posiCircleX + 670, posiCircleY + 225)
        context.bezierCurveTo(posiCircleX + 660, posiCircleY + 230, posiCircleX + 680, posiCircleY + 230, posiCircleX + 674, posiCircleY + 275)
        context.lineWidth = 12       // Largeur de la ligne
        context.lineCap = 'round'  // Fin de ligne (round | butt | square)
        context.strokeStyle = 'white' // Couleur de la ligne
        context.stroke()

        // santa's hat
        context.beginPath()
        context.moveTo(posiCircleX + 670, posiCircleY + 220)
        context.lineTo(posiCircleX + 570, posiCircleY + 220)
        context.lineWidth = 20       // Largeur de la ligne
        context.lineCap = 'round'  // Fin de ligne (round | butt | square)
        context.strokeStyle = 'white' // Couleur de la ligne
        context.stroke()

        // santa's hat tassel
        context.beginPath()
        context.arc(posiCircleX + 705, posiCircleY + 280, 12, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()

        // santa's right eye
        context.beginPath()
        context.arc(posiCircleX + 645, posiCircleY + 248, 10, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()

        context.beginPath()
        context.arc(posiCircleX + 644, posiCircleY + 250, 8, 0, Math.PI * 2)
        context.fillStyle = 'rgb(48, 49, 52)'
        context.fill()

        context.beginPath()
        context.arc(posiCircleX + 645, posiCircleY + 245, 2, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()

        // santa's left eye
        context.beginPath()
        context.arc(posiCircleX + 595, posiCircleY + 248, 10, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()

        context.beginPath()
        context.arc(posiCircleX + 596, posiCircleY + 250, 8, 0, Math.PI * 2)
        context.fillStyle = 'rgb(48, 49, 52)'
        context.fill()

        context.beginPath()
        context.arc(posiCircleX + 597, posiCircleY + 245, 2, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()

        // santa's shirt button
        context.beginPath()
        context.arc(posiCircleX + 620, posiCircleY + 385, 3, 0, Math.PI * 2)
        context.arc(posiCircleX + 620, posiCircleY + 405, 3, 0, Math.PI * 2)
        context.arc(posiCircleX + 620, posiCircleY + 425, 3, 0, Math.PI * 2)
        context.fillStyle = 'orange'
        context.fill()
}
    

}, false);

    
class info { // height and width of the window 
    static get height() {
        return document.documentElement.clientHeight;
    }
    static get width() {
        return document.documentElement.clientWidth;
    }
}

Math.rnd = (min, max) => {
    if (typeof min === 'undefined' || typeof max === 'undefined') return Math.round(Math.random());
    return (min + Math.random() * (max - min));
}



// audio player 

const $btnToggleMusic = document.querySelector('.btnMusic')
const $btnPlay = $btnToggleMusic.querySelector('.fa-play')
const $btnPause = $btnToggleMusic.querySelector('.fa-pause')

const $audioPlayer = document.querySelector('audio')

$audioPlayer.volume = 0.2

function loopMusic() {
    $audioPlayer.currentTime = 0;
	$audioPlayer.play();
}

function toggleMusic() {
	
    if ($audioPlayer.paused) {
        $audioPlayer.play();

        $btnPause.style.display = "inline-block";
        $btnPlay.style.display = "none";

    } else {
        $audioPlayer.pause();
        
        $btnPause.style.display = "none";
        $btnPlay.style.display = "inline-block";
    }
}

toggleMusic()

