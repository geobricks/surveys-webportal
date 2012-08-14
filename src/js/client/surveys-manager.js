if (!window.SurveysManager) {
	
	window.SurveysManager = {
		
		initUI : function() {
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/model/*?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					var data = new Array();
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						row["id"] = response[i]._id;
						row["title"] = response[i].title;
						row["date"] = response[i].date.substring(0, 10);
						row["description"] = response[i].description;
						data[i] = row;
					}
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#surveys-grid").jqxGrid({
		            	width: 780,
		                height: 250,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: true,
		                sortable: true,
		                enablehover: true,
		                columns: [
		                   {text: 'Survey Name', datafield: 'title'},
		                   {text: 'Description', datafield: 'description', width: 400},
		                   {text: 'Date Last Update', datafield: 'date', cellsformat: 'Y-m-d'}
		                ],
		                theme: SurveysWebPortal.theme
		            });
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
            
            $("#buttonDeleteSelectedSurvey").bind('click', function () {
            	var rowindex = $('#surveys-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#surveys-grid').jqxGrid('getrows');
            	var surveyName = rows[rowindex].label;
            	var c = confirm("Are you sure you want to delete survey '" + surveyName + "'?")
            	if (c == true) {
					var value = $('#surveys-grid').jqxGrid('deleterow', rowindex);
					alert("Survey '" + surveyName + "' has been deleted.");
            	}
			});
            
            $("#buttonCreateNewSurvey").bind('click', function () {
            	document.getElementById('container').innerHTML = '';
				$("#container").load("surveys-survey-wizard.html", function() {
					SurveysSurveyWizard.initUI();
				});
            });
		
		}
	
	}
	
}