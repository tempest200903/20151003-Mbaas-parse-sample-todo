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
  // ---- save ----
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
    $.each($scope.gameRecordList, function(index, gameRecord) {
      console.log(gameRecord);
      function findGameRecordPO(aGameRecord) {
        if (aGameRecord.id == null) {
          return new GameRecordPO();
        }
        var grep = $.grep($scope.gameRecordPOList, function(po, index) {
          return po.id == aGameRecord.id;
        });
        return grep[0];
      }
      var gameRecordPO = findGameRecordPO(gameRecord);
      function saveCallbackSuccess(savedGameRecordPO) {
        $scope.gameRecordPOList.push(savedGameRecordPO);
        gameRecord.id = savedGameRecordPO.id;
        showSaveMessage('New object created with objectId: ' + savedGameRecordPO.id);
        console.log('gameRecord.id =: ' + gameRecord.id);
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
  // ---- load ----
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
          var gameRecord = {}
          gameRecord.id = gameRecordPO.id;
          gameRecord.matching = gameRecordPO.get('matching');
          gameRecord.conclusion = gameRecordPO.get('conclusion');
          gameRecord.endDateTime = gameRecordPO.get('endDateTime');
          $scope.gameRecordList.push(gameRecord);
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
