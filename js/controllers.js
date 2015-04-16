(function(){
    angular.module("calApp")
    .controller("calendarRender", function(Event) {
        var self = this;
        self.day = moment();
        self.consoleLogThis = Event.consoleLogThis;
        self.getEvents = Event.getEvents;
        self.currentDate = null;
        self.changeDate = function(day){
            if (self.currentDate == day){
                return false;
            }
            else{
                self.currentDate = day;
                return true;
            }

        }
    });
})();
