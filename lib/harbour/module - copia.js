
      var Module = {
        preRun: [function(u){ console.log('PRERUN',u); return 'charly';}],	//CAF
        postRun: [],
        print: (function() {
          var element = document.getElementById('hb_console');
          if (element) element.value = ''; // clear browser cache
          return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
			
			text = text.replace(/\n/g, "<br>");
			
            console.log( 'TRACE >>', text);	//CAF
            if (element) {
              element.innerHTML += text;
              element.scrollTop = element.scrollHeight; // focus on bottom
            }
          };
        })(),
        printErr: function(text) {
			console.log( 'ERROR >>', text );	//	CAF
        }(),
        setStatus: function(text) {
          if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
		  
		  $('#hb_footer_msg').html( text )
		  console.log( 'setStatus >>', text );	//	CAF
		  console.log( 'Module.setStatus.last',  Module.setStatus.last)	//	CAF
          if (text === Module.setStatus.last.text) return;
          var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
          var now = Date.now();
          if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
          Module.setStatus.last.time = now;
          Module.setStatus.last.text = text;
        },
        totalDependencies: 0,
        monitorRunDependencies: function(left) {
          this.totalDependencies = Math.max(this.totalDependencies, left);
		 console.log( 'this.totalDependencies', this.totalDependencies ) // CAF
          Module.setStatus(left ? 'Preparing >>... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
        }
      };
	  
	  console.log( 'Config Done!' )
	  
	  /*
      window.onerror = function(event) {
        // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
        Module.setStatus('Exception thrown, see JavaScript console');
        spinnerElement.style.display = 'none';
        Module.setStatus = function(text) {	
		console.log( 'onError >>', text )	// CAF
          if (text) Module.printErr('[post-exception status] ' + text);
        };
      };
	  */
	  
	  
	/*  
function Run() {
	
	console.log( 'MyRun...')	
	//exitRuntime()
    Module.setStatus('Downloading...>>');	//CAF
	Executa()

}	
*/