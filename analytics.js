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

						function onUpdateState(newState, videoTime) {
							switch (newState) {
								case VG_STATES.PLAY:
									sendEvent("play", {
										time: videoTime
									});
									break;
								case VG_STATES.STOP:
									sendEvent("stop", {
										time: videoTime
									});
									break;
								case VG_STATES.PAUSE:
									sendEvent("pause", {
										time: videoTime
									});
									break;
							}
						}

						function sendEvent(name, details) {
							var now = new Date();
							
							var content = {
								time: now.toISOString(),
								name: name
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

						$scope.$watch(
							function () {
								return API.currentState;
							},
							function (newVal, oldVal) {
								if (newVal != oldVal) {
									onUpdateState(newVal, API.currentTime);
								}
							}
						);
					},
				};
			}
		]
	)
})();
