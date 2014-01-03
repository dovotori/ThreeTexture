
window.addEventListener("load", setup, false);





var canvas;







function setup() 
{
	canvas = new Canvas();
	canvas.setup(window.innerWidth, window.innerHeight);
	canvas.draw();
}








function generateTexture( data, width, height ) {

				var canvas, context, image, imageData,
				level, diff, vector3, sun, shade;

				vector3 = new THREE.Vector3( 0, 0, 0 );

				sun = new THREE.Vector3( 1, 1, 1 );
				sun.normalize();

				canvas = document.createElement( 'canvas' );
				canvas.width = width;
				canvas.height = height;

				context = canvas.getContext( '2d' );
				context.fillStyle = '#000';
				context.fillRect( 0, 0, width, height );

				image = context.getImageData( 0, 0, width, height );
				imageData = image.data;

				for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++  ) {

					vector3.x = data[ j - 1 ] - data[ j + 1 ];
					vector3.y = 2;
					vector3.z = data[ j - width ] - data[ j + width ];
					vector3.normalize();

					shade = vector3.dot( sun );

					imageData[ i ] = ( 96 + shade * 128 ) * ( data[ j ] * 0.007 );
					imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( data[ j ] * 0.007 );
					imageData[ i + 2 ] = ( shade * 96 ) * ( data[ j ] * 0.007 );

				}

				context.putImageData( image, 0, 0 );

				return canvas;

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
		this.camera.up = new THREE.Vector3(0, 0, 1);
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
		var texture = THREE.ImageUtils.loadTexture("uvmap.png");
		texture.wrapS = THREE.RepeatWrapping; 
		texture.wrapT = THREE.RepeatWrapping;



		//MATERIAL
		var materialMesh = new THREE.MeshLambertMaterial({ 
	    	map: texture,
	    	//color:0xffee99,
	    	side: THREE.DoubleSide
	    });

	    materialMesh = new THREE.MeshBasicMaterial({ 
	    	vertexColors: THREE.VertexColors 
	    });





		// MESH
		var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), materialMesh);
	    cube.overdraw = true;
	    
    

	    var points = []; var cpt = 0;
	    var size = 2;
	    for(var j = 0; j < size; j++)
	    {
	    	for(var i = 0; i < size; i++)
	    	{
	    		points[cpt] = [ i*100, j*100, getRandom(0, 100) ];
	    		cpt++;
	    	}	
	    }
	    var triangles = d3.geom.delaunay(points);


<<<<<<< HEAD



	    	}

	    	for(var j = 0; j < 3; j++)
	    	{
	    		pointMesh[j][0] = map(pointMesh[j][0], 0, 400, 0, 1);
	    		pointMesh[j][1] = map(pointMesh[j][1], 0, 400, 0, 1);
	    	}
=======
	    // var materialMesh = new THREE.Texture( generateTexture( triangles, 1024, 1024 ) );
>>>>>>> cab8d5a4122e423b5c3767bf1f88dafc9702fae4

	    
	 //    var geometrie = new THREE.Geometry();
	 //    for(var i = 0; i < triangles.length; i++)
	 //    {
	 //    	var pointMesh = [];
	 //    	for(var j = 0; j < 3; j++)
	 //    	{
	 //    		pointMesh[j] = [ triangles[i][j][0], triangles[i][j][1] ];
	 //    		geometrie.vertices.push(new THREE.Vector3(pointMesh[j][0], pointMesh[j][1], triangles[i][j][2] ));

	 //    	}


	 //    	for(var j = 0; j < 3; j++)
	 //    	{
	 //    		pointMesh[j][0] = map(pointMesh[j][0], 0, (size/2)*100, 0, 1);
	 //    		pointMesh[j][1] = map(pointMesh[j][1], 0, (size/2)*100, 0, 1);
	 //    	}
	    	
	 //    	//console.log((i * 3)+" "+((i * 3) + 1)+" "+((i * 3) + 2));
	 //    	//geometrie.faces.push( new THREE.Face3(i * 3, (i * 3) + 1, (i * 3) + 2));

	 //    	//console.log(pointMesh[0][0]+" "+pointMesh[0][1]+" / "+pointMesh[1][0]+" "+pointMesh[1][1]+" / "+pointMesh[2][0]+" "+pointMesh[2][1]);

<<<<<<< HEAD
	    	point = geometrie.vertices[ i ];
		    color = new THREE.Color( 0xffffff );
		    color.setRGB( 0.5 + point.x / size, 0.5 + point.y / size, 0.5 + point.z / size );
		    geometrie.colors[i] = color;

	    	

	    	geometrie.faceVertexUvs[0].push(
	    		new THREE.Vector2( pointMesh[0][0], pointMesh[0][1] ), 
	    		new THREE.Vector2( pointMesh[1][0], pointMesh[1][1] ), 
	    		new THREE.Vector2( pointMesh[2][0], pointMesh[2][1] )
	    	);
=======
	 //    	geometrie.faceVertexUvs[0].push(
	 //    		new THREE.Vector2( pointMesh[0][0], pointMesh[0][1] ), 
	 //    		new THREE.Vector2( pointMesh[1][0], pointMesh[1][1] ), 
	 //    		new THREE.Vector2( pointMesh[2][0], pointMesh[2][1] )
	 //    	);
>>>>>>> cab8d5a4122e423b5c3767bf1f88dafc9702fae4

	 //    }
	 //    geometrie.computeFaceNormals();
		// //*/








		// //*
	 //    var geometrie = new THREE.Geometry();
	 //    for(var i = 0; i < triangles.length; i++)
	 //    {
	 //    	for(var j = 0; j < 3; j++)
	 //    	{
	 //    		var pointMesh[j] = [ triangles[i][j][0], triangles[i][j][1] ];
	 //    		geometrie.vertices.push(new THREE.Vector3(pointMesh[j][0], pointMesh[j][1], triangles[i][j][2] ));

	 //    	}

	 //    }
	 //    geometrie.computeFaceNormals();
		// //*/











		var randomPoints = [];
		for (var i=0; i<1000; i++ ){
			randomPoints.push([getRandom(1,1000),getRandom(1,1000),getRandom(1,100)])
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
	    

	

	    // geometrie.vertices.push(new THREE.Vector3(0, 0, 100));
	    // geometrie.vertices.push(new THREE.Vector3(200, 0, 0));
	    // geometrie.vertices.push(new THREE.Vector3(200, 200, 0));

	    // geometrie.vertices.push(new THREE.Vector3(200, 200, 0));
	    // geometrie.vertices.push(new THREE.Vector3(0, 200, 0));
	    // geometrie.vertices.push(new THREE.Vector3(0, 0, 0));

	    // geometrie.faces.push( new THREE.Face3( 0, 1, 2 ) );
	    // geometrie.faces.push( new THREE.Face3( 3, 4, 5 ) );
	    
	    // geometrie.faceVertexUvs[0].push([
	    //     new THREE.Vector2( 0, 0 ),
	    //     new THREE.Vector2( 1, 0 ),
	    //     new THREE.Vector2( 1, 1 )
     //    ]);
     //    geometrie.faceVertexUvs[0].push([
	    //     new THREE.Vector2( 1, 1 ),
	    //     new THREE.Vector2( 0, 1 ),
	    //     new THREE.Vector2( 0, 0 )
     //    ]);

		geometrie.computeFaceNormals();
		console.log(geometrie.faces)
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
		//document.addEventListener("mousemove", function(event){ clone.interaction(event); }, false);
		
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







