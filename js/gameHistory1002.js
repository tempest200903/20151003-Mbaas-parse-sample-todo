gameHistory1002 = angular.module('gameHistory1002', []);

gameHistory1002.controller('gameRecordListController', [ '$scope',
		function($scope) {
			$scope.gameRecordList = [];
			$scope.gameRecordList.push({
				matching : 'matching1',
				conclusion : 'conclusion1',
				endDateTime : 'endDateTime1',
			});
			$scope.gameRecordList.push({
				matching : 'matching2',
				conclusion : 'conclusion2',
				endDateTime : 'endDateTime2',
			});
			$scope.gameRecordList.push({
				matching : 'matching3',
				conclusion : 'conclusion3',
				endDateTime : 'endDateTime3',
			});
		} ]);
