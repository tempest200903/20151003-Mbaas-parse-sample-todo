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
  $scope.gameRecordList = [];
  $scope.gameRecordDeleteList = [];
  $scope.gameRecordPOList = [];
  $scope.save = function() {
    console.log('save');
    function showSaveMessage(message) {
      console.log(message);
      $scope.$apply(function() {
        $scope.saveMessage = message;
      });
    }
    function saveCallbackError(gameRecord, error) {
      showSaveMessage('Failed to create new object, with error code: ' + error.message);
    }
    $.each($scope.gameRecordList, function(index, element) {
      console.log(element);
      var filtered = $.grep($scope.gameRecordPOList, function(po, index) {
        console.log('element.id =: ' + element.id);
        return po.id == element.id;
      });
      console.log('filtered.length =: ' + filtered.length);
      var gameRecordPO = filtered.length > 0 ? filtered[0] : new GameRecordPO();
      gameRecordPO.set('matching', element.matching);
      gameRecordPO.set('conclusion', element.conclusion);
      gameRecordPO.set('endDateTime', element.endDateTime);
      function saveCallbackSuccess(savedGameRecordPO) {
        showSaveMessage('New object created with objectId: ' + savedGameRecordPO.id);
        element.id = savedGameRecordPO.id;
        console.log('element.id =: ' + element.id);
      }
      gameRecordPO.save(null, {
        success : saveCallbackSuccess,
        error : saveCallbackError
      });
    });
    $.each($scope.gameRecordDeleteList, function(index, id) {
      console.log('id =: ' + id);
    });
  };
  $scope.load = function() {
    console.log('load');
    function showLoadMessage(message) {
      console.log(message);
      $scope.$apply(function() {
        $scope.loadMessage = message;
      });
    }
    var query = new Parse.Query(GameRecordPO);
    query.find({
      success : function(results) {
        showLoadMessage('success. length =: ' + results.length);
        updateGameRecordList(results);
      },
      error : function(error) {
        showLoadMessage("Error: " + error.code + " " + error.message);
      }
    })
    function updateGameRecordList(results) {
      console.log('updateGameRecordList, results =: ' + results);
      $scope.gameRecordPOList = results;
      $scope.$apply(function() {
        $scope.gameRecordList.length = 0;
        $.each(results, function(index, gameRecordPO) {
          var element = {}
          element.id = gameRecordPO.id;
          element.matching = gameRecordPO.get('matching');
          element.conclusion = gameRecordPO.get('conclusion');
          element.endDateTime = gameRecordPO.get('endDateTime');
          $scope.gameRecordList.push(element);
        });
      });
    }
  };
  $scope.addRecord = function() {
    console.log('addRecord');
    var r = {
      matching : $scope.new_matching,
      conclusion : $scope.new_conclusion,
      endDateTime : new Date()
    };
    $scope.gameRecordList.push(r);
  };
  $scope.deleteRecord = function(index) {
    console.log('deleteRecord index =: ' + index);
    var id = $scope.gameRecordList[index].id;
    console.log('id =: ' + id);
    $scope.gameRecordList.splice(index, 1);
    $scope.gameRecordDeleteList.push(id);
  };
} ]);
