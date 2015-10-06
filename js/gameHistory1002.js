// Initialize Parse with your Parse application javascript keys
Parse.initialize("LUf5d6ElfqHV1CytAzJw1nVXpjcJSkN2HjHs4xzi",
		"taZEYryFsFE66m7Q4CBB3y02DXrqBSkCc3m5UFZJ");

// ログインしていなければ、ログインページに遷移する。
if (!Parse.User.current()) {
	window.location.href = "index.html";
}

// ==== Parse Model Object ====

var GameRecord = Parse.Object.extend({
	className : "GameRecord",
	// user
	user : null,
	// 1. 試合前の情報
	// カジュアル or ランク
	matching : "casual or rank",
	// 自分のスキル階層
	selfSkillTier : "4b",
	// 2. 試合後の情報
	// ゲーム終了日時
	endDateTime : "2000/1/1 00:00:00",
	// 勝敗
	conclusion : "win",
	// 獲得 glory
	glory : 20,
	// 試合時間(m)
	duration : 20,
	// 味方 AFK 人数
	allyAfk : 0,
	// 相手 AFK 人数
	opponentAfk : 0,
});

function queryInit() {
	var list = [];
	var query = new Parse.Query(GameRecord);
	query.find({
		success : function(results) {
			console.log("Successfully retrieved " + results.length
					+ " records.");
			for (var i = 0; i < results.length; i++) {
				list.push(results[i]);
			}
			console.log('list[1] =: ' + list[1]);
		},
		error : function(error) {
			console.log("Error: " + error.code + " " + error.message);
		}
	})
	return list;
}
var gameRecordList = queryInit();

// ==== Angular UI ====

gameHistory1002 = angular.module('gameHistory1002', []);
gameHistory1002.controller('gameRecordListController', [ '$scope',
		function($scope) {
			$scope.form = {};
			$scope.gameRecordList = gameRecordList;
			$scope.gameRecordList.push({
				matching : 'matching1',
				conclusion : 'conclusion1',
				endDateTime : 'endDateTime1',
			});
			$scope.addRecordByForm = function() {
				console.log('addRecordByForm');
				var gameRecord = new GameRecord();
				$scope.addRecord(gameRecord);
			}
			$scope.addRecord = function(gameRecord) {
				console.log('addRecord');
				gameRecord.matching = $scope.form.matching;
				gameRecord.conclusion = $scope.form.conclusion;
				gameRecord.set("user", Parse.User.current());
				gameRecord.set("matching", $scope.form.matching);
				gameRecord.set("conclusion", $scope.form.conclusion);
				gameRecord.set("endDateTime", new Date());
				console.log("user =: " + gameRecord.get("user"));
				console.log("matching =: " + gameRecord.get("matching"));
				console.log("conclusion =: " + gameRecord.get("conclusion"));
				console.log("endDateTime =: " + gameRecord.get("endDateTime"));
				$scope.gameRecordList.push(gameRecord);
				gameRecord.save(null, {
					success : fs,
					error : fe
				});

			}
		} ]);

function fs(gameRecord) {
	// Execute any logic that should take place after the object is saved.
	console.log('New object created with objectId: ' + gameRecord.id);
}
function fe(gameRecord, error) {
	// Execute any logic that should take place if the save fails. error is a
	// Parse.Error with an error code and message.
	console.log('Failed to create new object, with error code: '
			+ error.message);
}
