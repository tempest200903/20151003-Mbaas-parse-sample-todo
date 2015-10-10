// Initialize Parse with your Parse application javascript keys
Parse.initialize("LUf5d6ElfqHV1CytAzJw1nVXpjcJSkN2HjHs4xzi",
    "taZEYryFsFE66m7Q4CBB3y02DXrqBSkCc3m5UFZJ");

// ログインしていなければ、ログインページに遷移する。
if (!Parse.User.current()) {
  window.location.href = "index.html";
}

var gameHistory1003 = angular.module('gameHistory1003', []);
gameHistory1003.controller('gameRecordListController', [ '$scope', function($scope) {
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
  };
} ]);
