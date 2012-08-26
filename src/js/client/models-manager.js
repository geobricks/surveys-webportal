if (!window.ModelsManager) {
	
	window.ModelsManager = {
		
		initUI : function() {
			
			$(".model-manager-button").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			ModelsManager.findAllModels();
			
			$("#buttonDeleteSelectedModel").bind('click', function () {
            	
            	var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelName = rows[rowindex].title;
            	var modelID = rows[rowindex].id;
            	            	
            	ModelsWebPortal.openWindow("Info", "Are you sure you want to delete model '" + modelName + "'?", function() {
            		
            		$.ajax({
    					
						type: 'GET',
						url: 'http://localhost:3000/delete/model/' + modelID + '?callback=?',
						dataType: 'jsonp',
						jsonp: 'callback',
						
						success : function(response) {
							$("#window").dialog("close");
							ModelsWebPortal.openWindow("Info", "Model '" + modelName + "' has been deleted from the DB.", function() {
								$("#window").dialog("close");
							});
							ModelsManager.findAllModels();
						},
						
						error : function(err, b, c) {
							alert(err.status + ", " + b + ", " + c);
						}
					
	            	});
            		
            	});
            	
			});
            
            $("#buttonCreateNewModel").bind('click', function () {
            	document.getElementById('container').innerHTML = '';
				$("#container").load("models-model-wizard.html", function() {
					ModelsModelWizard.initUI();
				});
            });
            
            $("#buttonEditSelectedModel").bind('click', function () {
            	
            	var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelID = rows[rowindex].id;
            	
            	$("#container").load("questions-manager.html", function() {
					QuestionsManager.init(modelID, (1 + rowindex));
				});
            	
            });
            
            ModelsManager.initI18N();
		
		},
		
		initI18N : function() {
			BabelFish.translateButton('buttonCreateNewModel');
			BabelFish.translateButton('buttonEditSelectedModel');
			BabelFish.translateButton('buttonDeleteSelectedModel');
		},
		
		findAllModels : function() {
			
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
						row["defaultLanguage"] = response[i].defaultLanguage;
						row["dateLastUpdate"] = response[i].dateLastUpdate.substring(0, 10) + " (" + response[i].dateLastUpdate.substring(11, 19) + ")";
						row["creationDate"] = response[i].creationDate.substring(0, 10) + " (" + response[i].creationDate.substring(11, 19) + ")";
						row["description"] = response[i].description;
						data[i] = row;
					}
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#models-grid").jqxGrid({
		            	width: 768,
		                height: 250,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: true,
		                sortable: true,
		                enablehover: true,
		                columns: [
		                   {text: 'Model Name', datafield: 'title'},
		                   {text: 'Description', datafield: 'description', width: 300},
		                   {text: 'Language', datafield: 'defaultLanguage'},
		                   {text: 'Date Last Update', datafield: 'dateLastUpdate', cellsformat: 'Y-m-d'},
		                   {text: 'Creation Date', datafield: 'creationDate', cellsformat: 'Y-m-d'}
		                ],
		                theme: ModelsWebPortal.theme
		            });
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});

		}
	
	}
	
}