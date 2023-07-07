/********************************************

UTM LOGGER

NOTES:
	-	JS session closes when tab/browser is closed.
	-	JS localstorage can be used for semi premanent storage

code example:
	
	var searchParams = new URLSearchParams(window.location.search); //store as var
	searchParams.has('sent'); //true/false

UTM Parameter example:

	https://website.com?utm_source=test&utm_medium=test&utm_campaign=test&utm_term=test&utm_content=test

UTM parameters supported:
	utm_source
	utm_medium
	utm_campaign
	utm_term
	utm_content
	
********************************************/
$(document).ready(function(){

	/* =============================== */
	/* ===== Grab URL Parameters  ===== */
	/* =============================== */
		var searchParams = new URLSearchParams(window.location.search); 

	console.log("===== UTM tracking initialized =====");

	/***** Functions *****/

		function utm_logger(param) {
			var searchParams = new URLSearchParams(window.location.search); 
			var paramValue = "";
			var utm_state = "";

			if(searchParams.has(param)) {
				//if UTM parameters are present in URL
				//console.log("===== UTM values detected - in URL =====");
				utm_state = "url";
				paramValue = searchParams.get(param);
				sessionStorage.setItem(param, paramValue);
				localStorage.setItem(param, paramValue);

			}else if(sessionStorage.getItem(param)){
				//if UTM parameters are not present in URL, but are in SessionStorage
				//console.log("===== UTM values detected - in short-term session =====");
				utm_state = "sessionStorage";
				paramValue = sessionStorage.getItem(param);

			}else if(localStorage.getItem(param)){
				//if UTM parameters are not present in URL or SessionStorage, but are in LocalStorage
				//console.log("===== UTM values detected - in long-term session =====");
				utm_state = "localStorage";
				paramValue = localStorage.getItem(param);

			}
			console.log("UTM detected: "+param+": "+paramValue+", utm_state: "+utm_state);
			//return paramValue;
			return {paramValue, utm_state};

		};

	/***** Run Functions *****/
		var utm_source = utm_logger("utm_source");
		var utm_medium = utm_logger("utm_medium");
		var utm_campaign = utm_logger("utm_campaign");
		var utm_term = utm_logger("utm_term");
		var utm_content = utm_logger("utm_content");
		var utm_state = utm_source.utm_state;


		if($(".UTMTesterTool").length){
			console.log("===== UTM testing tool present =====");
			$(".UTMTesterTool [data-utm='utm_source']").text(utm_source.paramValue);
			$(".UTMTesterTool [data-utm='utm_medium']").text(utm_medium.paramValue);
			$(".UTMTesterTool [data-utm='utm_campaign']").text(utm_campaign.paramValue);
			$(".UTMTesterTool [data-utm='utm_term']").text(utm_term.paramValue);
			$(".UTMTesterTool [data-utm='utm_content']").text(utm_content.paramValue);
			$(".UTMTesterTool [data-utm='utm_state']").text(utm_state);
		}


	/***** Add UTM inputs to forms *****/
		var utm_input_code='\
		<div class="utm_input_group">\
			<input type="hidden" name="utm_source" />\
			<input type="hidden" name="utm_medium" />\
			<input type="hidden" name="utm_campaign" />\
			<input type="hidden" name="utm_term" />\
			<input type="hidden" name="utm_content" />\
		</div>\
		'

		function utm_form_add() {
			$('form').each(function(){
				$(this).prepend(utm_input_code);
				console.log("UTM form input group added");
			});
		};

	/***** Fill in UTM values in form *****/
		function utm_form_fill() {
			console.log("form fill run");
			//Long term cookie storage
			$('input[name="utm_source"]').val(utm_source.paramValue);
			$('input[name="utm_medium"]').val(utm_medium.paramValue);
			$('input[name="utm_campaign"]').val(utm_campaign.paramValue);
			$('input[name="utm_term"]').val(utm_term.paramValue);
			$('input[name="utm_content"]').val(utm_content.paramValue);
			$('input[name="utm_state"]').val(utm_campaign.utm_state);
			console.log("UTM form inputs filled");
		};

	/***** Run Functions *****/
		//utm_form_add();

		//setTimeout(utm_form_fill(), 5000);

		setTimeout(() => {
			utm_form_fill()
		  	console.log("Delayed for 1000ms.");
		}, 1000);

		//utm_form_fill();
});

