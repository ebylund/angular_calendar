(function(){
	angular.module('calApp')
	.factory("Event", function(){
		var events = [
			// {text: "wash the dished", past: false, day: 234321}
		];
		return {
			getEvents: function(){
				return events;
			},

			consoleLogThis: function(day){
				console.log(day);
			},

			addToEventList: function(day, text){
				events.push({text: text || 'default text', past: false, day: day});
				events.sort(function(a, b){
					if(a.day.number > b.day.number){
						return 1;
					}
					if(a.day < b.day){
						return -1;
					}
					return 0;
				})
				// _.sortBy(events, day);
			},

			getByDay: function(day){
				var dayEvents= [], i;
				for(i = 0; i < events.length; i++){
					if (events[i].day == day){
						dayEvents.push(events[i]);
					} 
				}
				return dayEvents;
			},
			removeEvent: function(event){
				var idx = events.indexOf(event);
				if (idx >= 0){
					events.splice(idx, 1);
				}
			}
		}
	});
})();