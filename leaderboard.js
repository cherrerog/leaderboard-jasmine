
PlayersList = new Mongo.Collection('players');

PlayersService = {
  getPlayerList: function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  },
  getPlayer: function (playerId) {
    return Players.findOne(playerId);
  },
  rewardPlayer: function (playerId) {
    Players.update(playerId, {$inc: {score: 5}});
  },
  playersExist: function () {
    return Players.find().count() > 0;
  },
  generateRandomPlayers: function () {
    var names = ["Ada Lovelace",
                 "Grace Hopper",
                 "Marie Curie",
                 "Carl Friedrich Gauss",
                 "Nikola Tesla",
                 "Claude Shannon"];
    for (var i = 0; i < names.length; i++) {
      Players.insert({name: names[i], score: this._randomScore()});
    }
  },
  _randomScore: function () {
    return Math.floor(Random.fraction() * 10) * 5
  },
   restarPuntos: function() {
    Players.update(playerId, {$inc: {score: -5}});
   },
   eliminarJugador: function(){
    PlayersList.remove(playerId);
   }
};

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function(){
        var currentUserId = Meteor.UserId();
        return PlayersList.find({createdBy:currentUserId},{sort:{score: -1,name:1}});

    },
    'selectedClass': function(){
   	 	var playerId = this._id;
   	 	var selectedPlayer = Session.get('selectedPlayer');
   	 	if(playerId == selectedPlayer){
       		return "selected"
    	}
   	 	
	},
	'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)
	}

  
});
  Template.leaderboard.events({
    'click .player': function(){
    	var playerId = this._id;
    	Session.set('selectedPlayer', playerId);
        //var selectedPlayer = Session.get('selectedPlayer');
        //console.log(selectedPlayer);

    },
	'click .increment': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	PlayersList.update(selectedPlayer, {$inc: {score: 5}});

	},
	'click .decrement': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	PlayersList.update(selectedPlayer, {$inc: {score: -5}});

	},
	'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.remove(selectedPlayer);
	}

});
  Template.addPlayerForm.events({
    'submit form': function(event){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    var currentUserId = Meter.UserId();
    PlayersList.insert({
        name: playerNameVar,
        score: 0
    });
}

});



  
}

if (Meteor.isServer) {
  
}
