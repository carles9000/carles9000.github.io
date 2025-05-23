/*
**	version....: 2.00
**  last update: 10/01/2025
**
**	(c) 2022-2025 by Carles Aubia
**	
*/

	function LoadData() {	

		var cPath = 'data/' + cLang + '/mydata.json'
		
		$.ajax({
			url: cPath,			
			dataType: "text",
			success: function(data) {

				var aData = $.parseJSON(data);								
				InitTree( aData )
			}
		}).fail(function(){
            console.log("An error has occurred.");
        });					
	}
	
	function InitTree( aData ) {
	

        var oTree = $('#mytree').jstree({
							'core': {
								'data' : aData,
								'animation': 200,								
								'themes': {
									'name': 'proton',
									'responsive': true									
								}
							},
							"plugins" : [ "themes", "html_data", "search" ],   // ui, sort, Wholerow marca tota la linea amb focus, Search permet fer busquedes													
							"search": {
								"case_sensitive": false,
								"show_only_matches": false,							
								"search_callback": function (str, node) {
									// Custom search logic
									if (node.text.toLowerCase().includes(str.toLowerCase())) {
										//console.log( node.text); // Log the matched items
										if (node.data){
											console.log( node.text, node); 
										}
										return true; // Match
									}
									return false; // No match
								}
							}							
						});	

		oTree.on('search.jstree', function (e, data) {
			console.log('Búsqueda finalizada.');
			console.log('Nodos encontrados:', data.nodes); // Lista de nodos que coinciden con la búsqueda
			    console.log( data.nodes.length );
				for (let i = 0; i <data.nodes.length; i++) {
					console.log( data.nodes[i] )
				}
				/*
			    console.log( data.nodes.forEach(function (nodeId) {
					var node = $('#tree').jstree(true).get_node(nodeId); // Obtener el nodo por su ID
					console.log('Propiedades del nodo:', node); // Mostrar todas las propiedades del nodo
					console.log('Datos del nodo (data):', node.data); // Mostrar el contenido de "data" si existe
				});
				*/
		});


		oTree.on( "click.jstree", function (e, data) {
			
			var oThisTree 	= $('#mytree').jstree(true);
			var oNode		=  oThisTree.get_node( e.target )						
			
			if ( (oNode.data) && (( oNode.data.length > 0 ) || ( $.type(oNode.data) == 'object' )) ){				
			
				var cFile = ''
				
				if ( $.type(oNode.data) == 'object' ) {
					var cFile 		= oNode.data.file 
					var lComment 	= true
				} else  {
					var cFile = oNode.data 
					var lComment 	= false 
				}
				
				if ( cFile ) { 
				
					if ( cFile == 'harbour_runner' ) {
						
						var baseUrl = window.location.origin; // Obtiene el dominio base						
						window.open( baseUrl + '/index_runner.html', '_self');																		
						return null						
					}
				
					if ( cFile.substr( 0, 7 ) == 'http://' || cFile.substr( 0, 8 ) == 'https://' ) {
						window.open( cFile )
						return null
					}
					
					cExt = cFile.substr( (cFile.lastIndexOf('.') +1) );
					
					switch ( cExt ) {
					
						case 'html':
						case 'htm':
						
							LoadFrame( cFile, 'data/' )
							break;												
							
							
						case 'pdf':							
							LoadFrame( cFile, 'data/' )
							break;			
							
						case 'proc':	

							break;
							
						default: 					
						
					}
				}
				
			} else {
				$('#mybody').html( '' )
			}												
		})

		oTree.on( "ready.jstree", function (e, data) {
		
		//	https://www.sitepoint.com/get-url-parameters-with-javascript/
		
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const search = urlParams.get('search') 
			
			if ( typeof search == 'string' ){
				console.log( 'Search ->', search )
				TreeSearch( search )
			}

		})		
			

	}
	
	function TreeSearch( cSearch ) {

		if ( typeof cSearch == 'string' )
			var cTxt 	= cSearch 
		else
			var cTxt 	= $('#tree_search').val()		
	
		var oTree = $('#mytree').jstree(true);
			oTree.close_all();
			console.log( oTree.search( cTxt ) );
	
	}


	
	function LoadFrame( cFile, cUrl ) {				
	
		cUrl = ( typeof( cUrl ) === 'string') ? cUrl : ''; 

		var cHtml = '<iframe class="myiframe" src="' + cUrl +  cFile + '" ></iframe>'

		$('#mybody').addClass( 'es_pdf' )
		$('#mybody').html( cHtml )
	}	

	$(document).ready(function(){
		console.log( 'Ready...') 														
		
		// https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
		
		var urlParams = new URLSearchParams(window.location.search);
		var cLang = urlParams.get('lang');	
		
		if ( cLang ) {
			
			switch (cLang) {
				
				case 'en' :
					window.location.replace("index_doc_en.html");
					break;
					
				case 'es' :
					window.location.replace("index_doc.html");
					break;								
			}			
		}			
		
		LoadData()
		$('#tree_search').change( TreeSearch ) 	
		
		
	})	
	
	
	var _lOpen = true;
	function view() {
		
		if ( _lOpen ) {
			//$("#mytree").css("display", "none");	
			//$("#mybody").css("top", "50px");
			$("#mybody").animate( {top:50},300 )
			$("#view").html( '<i class="fa fa-list-ul" aria-hidden="true"></i>&nbsp;Index' )
			switch( cLang ) {
				case 'es':
					$("#view").html( '<i class="fa fa-list-ul" aria-hidden="true"></i>&nbsp;Indice' )
					break;
				case 'en':
					$("#view").html( '<i class="fa fa-list-ul" aria-hidden="true"></i>&nbsp;Index' )
					break;
			}			
		} else {
			//$("#mytree").css("display", "block");				
			//$("#mybody").css("top", "350px");	
			$("#mybody").animate( {top:350},300 )
			
			switch( cLang ) {
				case 'es':
					$("#view").html( '<i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Ver' )
					break;
				case 'en':
					$("#view").html( '<i class="fa fa-eye" aria-hidden="true"></i>&nbsp;View' )
					break;
			}
		}
		
		_lOpen = ! _lOpen
		
	}
	
	
	

	