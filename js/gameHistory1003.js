//==== Parse login ====

// Initialize Parse with your Parse application javascript keys
Parse.initialize("LUf5d6ElfqHV1CytAzJw1nVXpjcJSkN2HjHs4xzi",
    "taZEYryFsFE66m7Q4CBB3y02DXrqBSkCc3m5UFZJ");

// ログインしていなければ、ログインページに遷移する。
if (!Parse.User.current()) {
  window.location.href = "index.html";
}

// ==== Parse Model Object ====

var GameRecordPO = Parse.Object.extend({
  className : "GameRecord",
  // user
  user : null,
  // 1. 試合前の情報
  // カジュアル or ランク
  matching : null,
  // 自分のスキル階層
  selfSkillTier : null,
  // 2. 試合後の情報
  // ゲーム終了日時
  endDateTime : null,
  // 勝敗
  conclusion : null,
  // 獲得 glory
  glory : null,
  // 試合時間(m)
  duration : null,
  // 味方 AFK 人数
  allyAfk : null,
  // 相手 AFK 人数
  opponentAfk : null,
});

// ==== angular UI ====

var gameHistory1003 = angular.module('gameHistory1003', []);
gameHistory1003.controller('gameRecordListController', [ '$scope', function($scope) {
  $scope.saveMessage = '----';
  $scope.loadMessage = '----';
  $scope.gameRecordList = [ {
    matching : 'dummy-m1',
    conclusion : 'dummy-c1',
    endDateTime : 'dummy-e1'
  }, {
    matching : 'dummy-m2',
    conclusion : 'dummy-c2',
    endDateTime : 'dummy-e2'
  } ];
  $scope.save = function() {
    console.log('save');
    function showSaveMessage(message) {
      console.log(message);
      $scope.$apply(function() {
        $scope.saveMessage = message;
      });
    }
    function saveCallbackSuccess(gameRecord) {
      showSaveMessage('New object created with objectId: ' + gameRecord.id);
    }
    function saveCallbackError(gameRecord, error) {
      showSaveMessage('Failed to create new object, with error code: ' + error.message);
    }
    $.each($scope.gameRecordList, function(index, element) {
      console.log(element);
      var gameRecordPO = new GameRecordPO();
      gameRecordPO.set('matching', element.matching);
      gameRecordPO.save(null, {
        success : saveCallbackSuccess,
        error : saveCallbackError
      });
    });
  };
  $scope.load = function() {
    console.log('load');
  };

} ]);
