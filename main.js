
window.addEventListener("load", setup, false);





var canvas;







function setup() 
{
	canvas = new Canvas();
	canvas.setup(window.innerWidth, window.innerHeight);
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

	
		this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 10000 );
		this.camera.position.set(400, 400, -400);
		this.camera.up = new THREE.Vector3(0, 1, 0);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.scene = new THREE.Scene();
	
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(WIDTH, HEIGHT);
		this.renderer.setClearColor("#ffffff", 1);

		
	


		// LIGHT
		var directionalLight = new THREE.DirectionalLight(0x555599, 1.0); 
		directionalLight.position.set(-1, -1, -1); 
		var ambientLight = new THREE.AmbientLight(0x995555);
		



		// TEXTURE
		var texture = THREE.ImageUtils.loadTexture("texture.jpg");
		texture.wrapS = THREE.RepeatWrapping; 
		texture.wrapT = THREE.RepeatWrapping;



		// MATERIAL
		var materialMesh = new THREE.MeshLambertMaterial({ 
	    	//map: texture,
	    	color: 0x999999,
	    	side: THREE.DoubleSide
	    });



		// MESH
		var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), materialMesh);
	    cube.overdraw = true;
	    

	    

	    var points = []; var cpt = 0;
	    var size = 4;
	    for(var j = 0; j < size; j++)
	    {
	    	for(var i = 0; i < size; i++)
	    	{
	    		points[cpt] = [ i*100, j*100, getRandom(0, 100) ];
	    		cpt++;
	    	}	
	    }
	    var triangles = d3.geom.delaunay(points);

	    //*
	    var geometrie = new THREE.Geometry();
	    for(var i = 0; i < triangles.length; i++)
	    {
	    	var pointMesh = [];
	    	for(var j = 0; j < 3; j++)
	    	{
	    		pointMesh[j] = [ triangles[i][j][0], triangles[i][j][1] ];
	    		geometrie.vertices.push(new THREE.Vector3(pointMesh[j][0], pointMesh[j][1], triangles[i][j][2] ));

	    	}

	    	for(var j = 0; j < 3; j++)
	    	{
	    		pointMesh[j][0] = map(pointMesh[j][0], 0, 400, 0, 1);
	    		pointMesh[j][1] = map(pointMesh[j][1], 0, 400, 0, 1);
	    	}

	    	// console.log(pointMesh[0][0]+" "+pointMesh[0][1]+" / "+pointMesh[1][0]+" "+pointMesh[1][1]+" / "+pointMesh[2][0]+" "+pointMesh[2][1]);
	    	

	    	geometrie.faces.push( new THREE.Face3(i * 3, (i * 3) + 1, (i * 3) + 2));

	    	geometrie.faceVertexUvs[0].push(
	    		new THREE.Vector2( pointMesh[0][0], pointMesh[0][1] ), 
	    		new THREE.Vector2( pointMesh[1][0], pointMesh[1][1] ), 
	    		new THREE.Vector2( pointMesh[2][0], pointMesh[2][1] )
	    	);


	    }
	    geometrie.computeFaceNormals();
		//*/



	    /*
	    var geometrie = new THREE.Geometry();
	    geometrie.vertices.push(new THREE.Vector3(0, 0, 0));
	    geometrie.vertices.push(new THREE.Vector3(200, 0, 0));
	    geometrie.vertices.push(new THREE.Vector3(200, 200, 0));
	    geometrie.faces.push( new THREE.Face3( 0, 1, 2 ) );
	    geometrie.computeFaceNormals();
	    geometrie.faceVertexUvs[0].push([
	        new THREE.Vector2( 0, 0 ),
	        new THREE.Vector2( 0, 1 ),
	        new THREE.Vector2( 1, 1 )
        ]);
		//*/



	    var mesh = new THREE.Mesh(geometrie, materialMesh);
	    mesh.doubleSided = true;		



	    // RENDU
	    this.scene.add(directionalLight); 
	    this.scene.add(ambientLight);
	    //this.scene.add(cube);
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
		this.camera.position.x = map(xMouse, 0, window.innerWidth, -2000, 2000);
		this.camera.position.y = map(yMouse, 0, window.innerHeight, -2000, 2000);
		this.camera.position.z = map(xMouse, 0, window.innerHeight, -1000, 1000);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.renderer.render(this.scene, this.camera);
	}
	
	
}







