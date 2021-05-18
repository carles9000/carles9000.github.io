#xcommand ? [<explist,...>] => AP_RPuts( '<br>' [,<explist>] )
#xcommand ?? <cText> => AP_RPuts( <cText> )
#xcommand BLOCKS ADDITIVE <v>[ PARAMS [<v1>] [,<vn>] ] => ;
	#pragma __cstream |<v>+= InlinePrg( ReplaceBlocks( %s, "{{", "}}" [,<(v1)>][+","+<(vn)>] [, @<v1>][, @<vn>] ) )
	
#xcommand TRY  => BEGIN SEQUENCE WITH {| oErr | Break( oErr ) }
#xcommand CATCH [<!oErr!>] => RECOVER [USING <oErr>] <-oErr->
#xcommand FINALLY => ALWAYS
	
function main()

	? time()
	
return nil