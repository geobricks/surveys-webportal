var Map = function(mapID) {
	
	var result = {
			
			map : "",
			
			mapID: mapID,
			
			/** cluster markers **/
			markers: "",
		
			initUI : function() {
				this.mapID = mapID;
			},
			
			createMap : function(lat, lon, zoom) {
				
				map = new L.Map(this.mapID, {crs:L.CRS.EPSG3857});

				map.setView(new L.LatLng(lat,lon), zoom);
				
				var ggl = new L.Google();
				map.addLayer(ggl);

				var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				var osm = new L.TileLayer(osmUrl);		
//				map.addLayer(osm);

				var mapquestUrl='http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
				var mapquest = new L.TileLayer(mapquestUrl);
//				map.addLayer(mapquest);

				var nasaUrl='http://tile21.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png';
				var nasa = new L.TileLayer(nasaUrl);

				var sketchMapUrl ='http://a.tiles.mapbox.com/v3/aj.sketchy/{z}/{x}/{y}.png';
				var sketchMap = new L.TileLayer(sketchMapUrl);

				var baseMaps = {
					"Google": ggl,
				    "MapQuest": mapquest,
					"Open Street Map": osm,
					"Aerial Nasa": nasa,
				};
				var layersControl = new L.Control.Layers(baseMaps);
				map.addControl(layersControl);
				
//				geojsonLayer = new L.GeoJSON();
//				
//				var _this = this;
//				map.on('moveend', function(e) {
//					_this.getPoints(_this.commoditycodes, _this.dates);
//				});
//				
//				// Markers clusters example
//				//markers = new L.MarkerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false});
//				//markers.on('clusterclick', function (a) {
//				//	a.layer.zoomToBounds();
//				//});
//				//this.populate();
//				//map.addLayer(markers);
			},
			
			addMarkers : function(match) {
//				var layergroup = L.layerGroup([marker1, marker2]).addMap();
//				for (var i = 0 ; i < match.events.length ; i++) {
//					var marker = L.marker([match.events[i].location[0], match.events[i].location[1]]).addTo(map);
//				}
			},

			getPoints : function(commoditycodes, dates) {

				// removing old points
				this.removePoints();
				// saving current codes
				this.commoditycodes = commoditycodes;
				this.dates = dates;
				
				
				// getting bbox
				var bounds = map.getBounds();
				var sw = bounds.getSouthWest();
				var ne = bounds.getNorthEast();
				var BBOX = sw.lng + "," + sw.lat +"," + ne.lng + ","+ ne.lat;

				var URL = 'http://'+ this.baseurl +'/rest/crowdprices/data/points/null/'+ commoditycodes +'/'+ dates+'/' + BBOX + '/' + this.language;

				//alert(URL);
				// getting points
				var _this = this;
				$.ajax({
						type : 'GET',
						url : URL,
						dataType : 'json',
						success : function(response) {
							geojsonLayer = L.geoJson(response, {
								onEachFeature : _this.onEachFeature
							});
							map.addLayer(geojsonLayer);
							//$("#summary").append("ok"));
						},
						error : function(err, b, c) {
							alert(err.status + ", " + b + ", " + c);
						}
					});
				},

				
				removePoints: function() {
					geojsonLayer.clearLayers();
				},
				populate:  function() {
					for (var i = 0; i < 100000; i++) {
						var m = new L.Marker(this.getRandomLatLng(map));
						markers.addLayer(m);
					}
					return false;
				},
				getRandomLatLng: function(map) {
					var bounds = map.getBounds(),
						southWest = bounds.getSouthWest(),
						northEast = bounds.getNorthEast(),
						lngSpan = northEast.lng - southWest.lng,
						latSpan = northEast.lat - southWest.lat;

					return new L.LatLng(
							southWest.lat + latSpan * Math.random(),
							southWest.lng + lngSpan * Math.random());
				}
				
		};
	return result;
}