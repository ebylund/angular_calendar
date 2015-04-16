(function(){
    angular.module("calApp")

    .directive("cal", function(Event) {
        return {
            restrict: "E",
            templateUrl: "templates/calendar.html",
            scope: {
                selected: "="
            },
            link: function(scope, element, attrs) {
                scope.getEvents = Event.getEvents;

                scope.getByDay = Event.getByDay;
                scope.consoleLogThis = Event.consoleLogThis;
                scope.selected = _removeTime(scope.selected || moment());
                scope.month = scope.selected.clone();

                var start = scope.selected.clone();
                start.date(1);
                _removeTime(start.day(0));

                _buildMonth(scope, start, scope.month);

                scope.select = function(day) {
                    scope.selected = day.date;  
                };

                scope.addEvent = function (day){
                    var text = prompt("Event Name", "");
                    if (text){
                        Event.addToEventList(day, text);
                    }
                };
                scope.editEvent = function(event){
                    var text = prompt("event name", event.text);
                    if (text){
                        event.text = text;
                    }
                    else{
                        Event.removeEvent(event);
                    }
                }

                scope.next = function() {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month()+1).date(1));
                    scope.month.month(scope.month.month()+1);
                    _buildMonth(scope, next, scope.month);
                };

                scope.previous = function() {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month()-1).date(1));
                    scope.month.month(scope.month.month()-1);
                    _buildMonth(scope, previous, scope.month);
                };
            }
        };

        function _removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }
    });
})();