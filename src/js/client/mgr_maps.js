if (!window.Maps) {
	
	window.Maps = {
			
		map : null,
		
		icons : [],
		
		markers : null,
		
		/**
		 * This function calculate the center of the map
		 * just doing an average on the latitude and
		 * longitude of all the answers
		 */
		calculateMapCenter : function(answers) {
			
			var center_lat = 0;
			var center_lon = 0;
			
			for (var i = 0 ; i < answers.length ; i++) {
				center_lat += answers[i].meta.location[0];
				center_lon += answers[i].meta.location[1];
			}
			
			center_lat = center_lat / answers.length;
			center_lon = center_lon / answers.length;
			
			return new Array(center_lat, center_lon);
			
		},
		
		initMapUI : function(model, answers) {
			
			BabelFish.translateHTML('map_question_selector_label');
			
			var questions_data = new Array();
			var row = {};
			row['code'] = null;
			row['label'] = $.i18n.prop("type_please_select");
			questions_data[0] = row;
			
			for (var i = 0 ; i < model.model_questions.length ; i++) {
				var row = {};
				row['code'] = model.model_questions[i].question_number;
				row['label'] = model.model_questions[i][ModelsWebPortal.lang + '_text'];
				questions_data[1 + i] = row;
			}
			
			var questions_source = {
				localdata: questions_data,
				datatype: "json",
				datafields: [{name: 'code'}, {name: 'label'}],
				id: 'code'
			};
				
			var questions_data_adapter = new $.jqx.dataAdapter(questions_source);
			
			$("#map_question_selector").jqxDropDownList({ 
				source: questions_data_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '100%', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#map_question_selector").bind('change', function() {
				var item = ($("#map_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
				Maps.addMarkers(model, answers, item.code);
			});
			
			Maps.initIcons();
			
		},
		
		initIcons : function() {
			
			var redIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/red.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Maps.icons[0] = redIcon;
			
			var yellowIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/yellow.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Maps.icons[1] = yellowIcon;
			
			var greenIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/green.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Maps.icons[2] = greenIcon;
			
		},
		
		initMap : function(model, answers) {
			
			/**
			 * Initiate the interface to control the map
			 */
			// Maps.initMapUI(model, answers);
			
			/**
			 * Initiate the map
			 */
			if (Maps.map == null) {
				// Maps.map = L.map('map').setView(Maps.calculateMapCenter(answers), 12);
				Maps.map = L.map('map_container').setView([0, 0], 5);
			}
			
			/**
			 * Add full screen features
			 */
			var fullScreen = new L.Control.FullScreen();
			Maps.map.addControl(fullScreen);
			Maps.map.on('enterFullscreen', function(){
			if(window.console) window.console.log('enterFullscreen');
			
			});
			Maps.map.on('exitFullscreen', function(){
			if(window.console) window.console.log('exitFullscreen');
			
			});
			
			/**
			 * Initiate Open Street Map
			 */
			var osm = L.tileLayer('http://{s}.tile.cloudmade.com/17ad8466b1c24b86b173b2a1d5492115/997/256/{z}/{x}/{y}.png', {
				attribution: 'GeoBricks.org',
				maxZoom: 17
			});
			
			/**
			 * Initiate other providers
			 */
			var ggl = new L.Google();
			var bing = new L.BingLayer("Anqm0F_JjIZvT0P3abS6KONpaBaKuTnITRrnYuiJCE0WOhH6ZbE4DzeT6brvKVR5");
			Maps.map.addLayer(ggl);
			Maps.map.addLayer(bing);
			Maps.map.addLayer(osm);
			
			/**
			 * Add maps provider switch
			 */
			Maps.map.addControl(new L.Control.Layers( {'Google':ggl, 'Bing':bing, 'Open Street Map ':osm}, {}));
			
		},
		
		/**
		 * Show markers on the map according to user's selection
		 */
		addMarkers : function(model, answers, answerID) {
			
			/**
			 * Remove existing markers, if any
			 */
			if (Maps.map.markers != null) {
				Maps.map.removeLayer(Maps.map.markers);
			}
			
			/**
			 * Get the question label and type from the model
			 */
			var questionLabel = Products.getQuestionLabel(model, answerID);
			var answerType = Products.getAnswerType(model, answerID);
			
			/**
			 * Initiate the cluster
			 */
			Maps.map.markers = new L.MarkerClusterGroup({
				spiderfyOnMaxZoom: false, 
				showCoverageOnHover: true, 
				zoomToBoundsOnClick: true
			});

			Maps.map.markers.on('clusterclick', function (a) {
				a.layer.zoomToBounds();
			});
			
			for (var i = 0 ; i < answers.length ; i++) {
				
				/**
				 * Get the answer location
				 */
				var lat = answers[i].meta.location[0];
				var lon = answers[i].meta.location[1];
				
				/**
				 * Custom marker
				 */
				var m = null;
				if (answerType == 'multiple_choice') {
					
				} else {
					m = new L.Marker(new L.LatLng(lat, lon));
				}
				
				/**
				 * Popup text
				 */
				var s = '';
				for (var j = 0 ; j < answers[i].data.length ; j++) {
					
					/**
					 * If this is a multiple choices question we need to
					 * add custom markers to the map, otherwise we'll use
					 * the standard blue one
					 */
					if (answers[i].data[j].question_id == answerID) {
						
						/**
						 * Add the question to the pop-up
						 */
						s += '<b>' + questionLabel + ':</b><br>';
						
						if (answerType == 'multiple_choice') {
							
							/**
							 * Answer value is used to get the answer's label 
							 * and the marker
							 */
							var idx = answers[i].data[j]['answer'];
							s += model.model_questions[j].choices[idx][ModelsWebPortal.lang + '_choice_label'];
							m = new L.Marker(new L.LatLng(lat, lon), {icon: Maps.icons[idx]});
							
						} else {
							
							s += answers[i].data[j]['answer'];
							
						}
						
					}
					
				}
				
				/**
				 * Bind the pop-up to the marker and
				 * add the marker to the layer
				 */
				m.bindPopup(s);
				Maps.map.markers.addLayer(m);
			}
			
			Maps.map.addLayer(Maps.map.markers);
			
		}
			
	};
	
}