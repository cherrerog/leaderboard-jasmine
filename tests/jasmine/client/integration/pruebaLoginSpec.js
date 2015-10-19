describe("Pruebas con login y logout", function(){
	beforeEach(function(done){
		Meteor.loginWithPassword("pepe@gmail.com", "mipassword", function(err){
		Tracker.afterFlush(done);
		});
	});

it("después de login muestra input para añadir players", function(){
	var div = document.createElement("form");
        var comp = UI.render(Template.addPlayerForm);
 
        UI.insert(comp, div);
 
        expect($(div).find("input:button")[0]).toBeDefined();
    });

	afterEach(function(done){
	Meteor.logout(function() {
		Tracker.afterFlush(done);
	});
	});

it("después de login no muestra input para añadir players", function(){
	var div = document.createElement("form");
        var comp = UI.render(Template.addPlayerForm);
 
        UI.insert(comp, div);
 
        expect($(div).find("input:button")[0]).not.toBeDefined();
    });


});
