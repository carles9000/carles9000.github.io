var lMode = localStorage.getItem('hb_mode');

if ( lMode == null )
	lMode = true 

$('#switch_dark').prop('checked', lMode  );

var editor = ace.edit("hb_editor");
var code, editor_width, right_margin_left;
	
	editor.setTheme("ace/theme/tomorrow_night_blue");
	editor.setTheme("ace/theme/textmate");
	editor.setFontSize(18);     
	editor.setHighlightActiveLine(true);
	editor.session.setMode("ace/mode/c_cpp");

	code = localStorage.getItem('hb_code');

	if ( code == null || code.trim() == '' ) {
		code =  'function Main()\n\n'
		code += '	? "Hello world at " + time()\n\n'
		code += 'return nil\n'	
		editor.setValue( code )		
	}
	
	if( code && code.length != 0 )
	   editor.session.setValue( code );
   
   	editor.session.selection.on('changeCursor', function(e) {
		var o = editor.selection.getCursor()
		$('#hb_footer_lin').html( 'Lin: ' + ( o.row + 1 ) )
		$('#hb_footer_col').html( 'Col: ' + ( o.column + 1 ))
	});

function Change_Mode(){
	
	var lMode = $('#switch_dark' ).is(':checked')	
	
	if ( lMode ) {
		//editor.setTheme("ace/theme/tomorrow_night_blue");
		editor.setTheme("ace/theme/twilight");
		$( "#hb_console" ).toggleClass('hb_console_nodark hb_console_dark')
	} else {
		editor.setTheme("ace/theme/textmate");
		$( "#hb_console" ).toggleClass('hb_console_dark hb_console_nodark')		
	}

	localStorage.setItem( 'hb_mode', lMode )
}

