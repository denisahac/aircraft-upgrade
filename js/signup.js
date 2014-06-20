$(function() {
	
	$('#signUpButton').click(function() {
		var isValid = $('#signUpForm').parsley({successClass: 'has-success',
											errorClass: 'has-error',
							               
										    classHandler: function(el) {
										        	//console.log($(el).parent('.form-control'));
										        	//console.log(el.toJSON());
										        	console.log(el);
										          return el.$element.closest('.form-group');
										       
										    },
										     errorsContainer: function(el) {

										     },
							                errorsWrapper: '<span class="help-block"></span>',
							                errorTempate: '<span></span>'
								            
											});

	});
});