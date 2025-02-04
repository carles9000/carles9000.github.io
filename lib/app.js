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
								"show_only_matches": false
							}							
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
			oTree.search( cTxt );									
	
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
	
	
	

	