// Initialize Parse with your Parse application javascript keys
Parse.initialize("LUf5d6ElfqHV1CytAzJw1nVXpjcJSkN2HjHs4xzi",
		"taZEYryFsFE66m7Q4CBB3y02DXrqBSkCc3m5UFZJ");

// ログインしていなければ、ログインページに遷移する。
if (!Parse.User.current()) {
	window.location.href = "index.html";
}

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
	// ゲーム開始日時
	beginDateTime : "2000/1/1 00:00:00",
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

var GameRecordList = Parse.Collection.extend({

	// Reference to this collection's model.
	model : GameRecord,

});

function addRecord() {
	var gameRecord = new GameRecord();
	gameRecord.set("matching", matching.value);
	gameRecord.set("conclusion", conclusion.value);
	gameRecord.set("user", Parse.User.current());
	console.log("user =: " + gameRecord.get("user"));
	console.log("matching =: " + gameRecord.get("matching"));
	console.log("conclusion =: " + gameRecord.get("conclusion"));

	gameRecord.save(null, {
		success : function(gameRecord) {
			// Execute any logic that should take place after the object is
			// saved.
			console.log('New object created with objectId: ' + gameRecord.id);
		},
		error : function(gameRecord, error) {
			// Execute any logic that should take place if the save fails.
			// error is a Parse.Error with an error code and message.
			console.log('Failed to create new object, with error code: '
					+ error.message);
		}
	});
	updateTable();
}

function updateTable() {
	this.gameRecordList = new GameRecordList;

	// Setup the query for the collection to look for GameRecord from the
	// current
	// user
	this.gameRecordList.query = new Parse.Query(GameRecord);
	this.gameRecordList.query.equalTo("user", Parse.User.current());

	// Fetch all the todo items for this user
	this.gameRecordList.fetch();

	console.log("this.gameRecordList.length =: " + this.gameRecordList.length);
	console.log("conclusion =: "
			+ this.gameRecordList.models[0].get("conclusion"));
	console.log("matching =: " + this.gameRecordList.models[0].get("matching"));

}
