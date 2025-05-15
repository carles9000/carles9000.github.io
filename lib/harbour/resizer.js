function Init_Resizer() {
	const container = document.getElementById('hb_container');
	const codePanel = document.getElementById('hb_code');
	const resizer = document.getElementById('hb_resizer');
	const consolePanel = document.getElementById('hb_console');
	
	// Initial position
	let x = 0;
	let codeWidth = 0;
	
	// Handle mouse down event on the resizer
	const mouseDownHandler = function(e) {
		// Get the current mouse position
		x = e.clientX;
		
		// Get the current width of the code panel
		codeWidth = codePanel.getBoundingClientRect().width;
		
		// Add the active class to resizer
		resizer.classList.add('active');
		
		// Attach the listeners to document
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
		
		// Prevent text selection during drag
		e.preventDefault();
	};
	
	// Handle mouse move event
	const mouseMoveHandler = function(e) {
		// Calculate the new width of the code panel
		const dx = e.clientX - x;
		const containerWidth = container.getBoundingClientRect().width;
		
		// Set the new width with bounds checking (min 100px, max 80% of container)
		const newCodeWidth = Math.max(100, Math.min(codeWidth + dx, containerWidth * 0.8));
		
		// Apply the new width to the code panel
		codePanel.style.width = `${newCodeWidth}px`;
	};
	
	// Handle mouse up event
	const mouseUpHandler = function() {
		// Remove the active class from resizer
		resizer.classList.remove('active');
		
		// Remove the handlers of mousemove and mouseup
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
	
	// Attach the handler to mousedown event
	resizer.addEventListener('mousedown', mouseDownHandler);	
}		