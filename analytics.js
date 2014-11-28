(function(){
"use strict";
angular.module("uk.ac.soton.ecs.videogular.plugins.analytics", [])
	.directive(
		"vgAnalytics", ["VG_STATES", "$http", "$timeout",
			function(VG_STATES, $http, $timeout) {
				return {
					restrict: "E",
					require: "^videogular",
					scope: {
						servers: "=vgAnalyticsServers",
					},
					link: function($scope, elem, attr, API) {

						$scope.$parent.$on("analytics", function(event, name, details) {
							sendEvent(name, details);
						});

						function sendEvent(name, details) {
							var now = new Date();

							var content = {
								time: now.toISOString(),
								name: name,
								uuid: $scope.uuid,
							};

							if (typeof(details) !== "undefined") {
								content.details = details;
							}

							$scope.servers.forEach(function(server) {
								$http.post(server + 'log', content)
									.success(function(data, status, headers, config) {
									// this callback will be called asynchronously
									// when the response is available
								}).error(function(data, status, headers, config) {
									console.error("error reporting event to the server");
									// called asynchronously if an error occurs
									// or server returns response with an error status.
								});
							});
						}

						function reportMediaElementEvent(event) {
							sendEvent(event.type, { time: API.currentTime });
						}

						var eventsToReport = ['play', 'pause', 'stop'];

						for (var i in eventsToReport) {
							API.mediaElement[0].addEventListener(eventsToReport[i], reportMediaElementEvent);
						}

						//generateUUID function uses this stack overflow answer http://stackoverflow.com/a/8809472
						function generateUUID(){
							var d = new Date().getTime();
							var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
								var r = (d + Math.random()*16)%16 | 0;
								d = Math.floor(d/16);
								return (c=='x' ? r : (r&0x3|0x8)).toString(16);
							});
							return uuid;
						}

						$scope.uuid = generateUUID();

					},
				};
			}
		]
	);
})();
