
window.addEventListener("load", setup, false);





var canvas;



var w = 1000;
var h = 1000



function setup() 
{


	canvas = new Canvas();
	canvas.setup(w*1.2, h*1.2);
	canvas.draw();
}




/////////////////////////////////////////////
//////////// CANVAS ////////////////////////
////////////////////////////////////////////

var Canvas = function()
{

	this.camera;
	this.renderer;
	this.scene;
	

	this.setup = function(WIDTH, HEIGHT)
	{

	
		this.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 0.1, 10000 );
		this.camera.position.set(WIDTH, -HEIGHT+500, -500);
		this.camera.up = new THREE.Vector3(0, 0, 1);
		this.camera.lookAt(new THREE.Vector3(WIDTH/2, HEIGHT/2, 0));

		this.scene = new THREE.Scene();
	
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(WIDTH, HEIGHT);
		this.renderer.setClearColor("#ffffff", 1);

		
	


		// LIGHT
		var directionalLight = new THREE.DirectionalLight(0x555599, 1.0); 
		directionalLight.position.set(-1, -1, -1); 
		var ambientLight = new THREE.AmbientLight(0x995555);
		



		// TEXTURE
		var texture = THREE.ImageUtils.loadTexture("uvmap.png");
		texture.wrapS = THREE.RepeatWrapping; 
		texture.wrapT = THREE.RepeatWrapping;



		//MATERIAL
		var materialMesh = new THREE.MeshLambertMaterial({ 
	    	map: texture,
	    	//color:0xffee99,
	    	side: THREE.DoubleSide
	    });


		var randomPoints = [];

;

		randomPoints.push([w,0,0])
		randomPoints.push([w,0,0])
		randomPoints.push([0,h,0])
		randomPoints.push([0,h,0])
		randomPoints.push([w,h,0])

		for (var i=0; i<200; i++ ){
			randomPoints.push([getRandom(1,w-1),getRandom(1,h-1),getRandom(1,60)])
		}

		var delaunay = d3.geom.delaunay(randomPoints);

	    var geometrie = new THREE.Geometry();

	    for (var i=0; i < delaunay.length; i++ ){
	    	geometrie.vertices.push(new THREE.Vector3(delaunay[i][0][0],delaunay[i][0][1],delaunay[i][0][2]));
			geometrie.vertices.push(new THREE.Vector3(delaunay[i][1][0],delaunay[i][1][1],delaunay[i][1][2]));
			geometrie.vertices.push(new THREE.Vector3(delaunay[i][2][0],delaunay[i][2][1],delaunay[i][2][2]));
			geometrie.faces.push( new THREE.Face3( 3*i,1+3*i,2+3*i ));

		    geometrie.faceVertexUvs[0].push([
		        new THREE.Vector2( map(delaunay[i][0][0],1,1000,0,1), map(delaunay[i][0][1],1,1000,0,1) ),
		        new THREE.Vector2( map(delaunay[i][1][0],1,1000,0,1), map(delaunay[i][1][1],1,1000,0,1) ),
		        new THREE.Vector2( map(delaunay[i][2][0],1,1000,0,1), map(delaunay[i][2][1],1,1000,0,1) )
	        ]);

	    }
	    


		geometrie.computeFaceNormals();
		console.log(geometrie.faces)
		//*/



	    var mesh = new THREE.Mesh(geometrie, materialMesh);
	    mesh.doubleSided = true;		



	    // RENDU
	    this.scene.add(directionalLight); 
	    this.scene.add(ambientLight);

	    this.scene.add(mesh);
		this.renderer.render(this.scene, this.camera);

		document.body.appendChild(this.renderer.domElement);
		
		var clone = this;
		document.addEventListener("mousemove", function(event){ clone.interaction(event); }, false);
		


	}
	
	



	this.draw = function()
	{

      	

	}





	this.interaction = function(event)
	{
		var xMouse = event.clientX;
		var yMouse = event.clientY;
		this.camera.position.x = map(-xMouse, 0, window.innerWidth, -w*2, w*2);
		//this.camera.position.y = map(yMouse, 0, window.innerHeight, -2000, 2000);
		this.camera.position.z = map(yMouse, 0, window.innerHeight, -h*2, h*2);
		//this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.camera.lookAt(new THREE.Vector3(w/2, h/2, 0));

		this.renderer.render(this.scene, this.camera);
	}
	
	
}







