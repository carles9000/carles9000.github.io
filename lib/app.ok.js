	function LoadData() {			
		
		$.ajax({
			url: 'data/mydata.json',			
			dataType: "text",
			success: function(data) {

				var aData = $.parseJSON(data);
				
				console.log( aData )
				InitTree( aData )
			}
		}).fail(function(){
            console.log("An error has occurred.");
        });					
	}
	
	function InitTree( aData ) {
			
		oTree = $( '#mytree' )
			.jstree( {
					'core' : {
						'multiple' : false,
						'animation': 200,
						'themes' : { "theme" : "default-dark", "stripes" : false },
						'data' : aData
						},												
					"plugins" : [ "search" ],   // Wholerow marca tota la linea amb focus, Search permet fer busquedes						
					"search": {
						"case_sensitive": false,
						"show_only_matches": false
					}
				})

		oTree.on( "dblclick.jstree", function (e, data) {
			
			var oThisTree 	= $('#mytree').jstree(true);
			var oNode		=  oThisTree.get_node( e.target )
			
			
			console.log( oNode )
			
			//$('#user').data( 'key', '' )


			if ( oNode.state.disabled == false ) {									
				//SelectDbf( oNode )
			}
			if ( (oNode.data) && (( oNode.data.length > 0 ) || ( $.type(oNode.data) == 'object' )) ){				

				console.log( 'NODE', oNode )
				
				//$('#user').data( 'key', oNode.id )
			
				
				if ( $.type(oNode.data) == 'object' ) {
					var cFile 		= oNode.data.file 
					var lComment 	= true
				} else  {
					var cFile = oNode.data 
					var lComment 	= false 
				}					
				if ( cFile.substr( 0, 7 ) == 'http://' || cFile.substr( 0, 8 ) == 'https://' ) {
					window.open( cFile )
					return null
				}
				
				cExt = cFile.substr( (cFile.lastIndexOf('.') +1) );
			
				console.log( 'ext', cExt )
				
				switch ( cExt ) {
				
					case 'html':
					case 'htm':
						//LoadHtm( oNode.id, cFile, lComment )
						LoadFrame( cFile, 'data/' )
						break;												
						
						
					case 'pdf':							
						LoadFrame( cFile, 'data/' )
						break;			
						
					case 'proc':	

						break;
						
					default: 					
					
				}
				
			} else {
				$('#mybody').html( '' )

			}				
		});		
	
	}

	$(document).ready(function(){
		console.log( 'ready...')							
		LoadData()
		$('#tree_search').change( TreeSearch ) 		
	})
	
	function LoadFrame( cFile, cUrl ) {				
	
		cUrl = ( typeof( cUrl ) === 'string') ? cUrl : '';
 
	console.log( cUrl + cFile )	
		var cHtml = '<iframe class="myiframe" src="' + cUrl +  cFile + '" ></iframe>'

		$('#mybody').addClass( 'es_pdf' )
		$('#mybody').html( cHtml )
	}

	function TreeSearch( cSearch ) {

		if ( typeof cSearch == 'string' )
			var cTxt 	= cSearch 
		else
			var cTxt 	= $('#tree_search').val()

		console.log( 'TreeSearch', cTxt)
			
		
		var oTree = $('#mytree').jstree(true);
			oTree.search( cTxt );					
		
		//o = oTree.get_selected(true)
		
		//console.log('ccc', o )						
	}	
	