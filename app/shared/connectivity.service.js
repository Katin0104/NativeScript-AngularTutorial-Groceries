"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity = require("connectivity");
var Subject_1 = require("rxjs/Subject");
var ConnectionType;
(function (ConnectionType) {
    ConnectionType[ConnectionType["NONE"] = 0] = "NONE";
    ConnectionType[ConnectionType["WIFI"] = 1] = "WIFI";
    ConnectionType[ConnectionType["MOBILE"] = 2] = "MOBILE";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var ConnectivityService = /** @class */ (function () {
    function ConnectivityService() {
        var _this = this;
        this.connectionChanged = new Subject_1.Subject();
        connectivity.startMonitoring(function (newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    _this.connectionType = ConnectionType.NONE;
                    console.log("Connection type changed to none.");
                    alert("Wir haben die Internetverbindung verlorgen! Weiter gehts im Offline Modus");
                    _this.connectionChanged.next(ConnectionType.NONE);
                    break;
                case connectivity.connectionType.wifi:
                    _this.connectionType = ConnectionType.WIFI;
                    console.log("Connection type changed to WiFi.");
                    alert("Wir sind mit dem WiFi verbunden!");
                    _this.connectionChanged.next(ConnectionType.WIFI);
                    break;
                case connectivity.connectionType.mobile:
                    _this.connectionType = ConnectionType.MOBILE;
                    console.log("Connection type changed to mobile.");
                    alert("Mobiles Internet ist Aktiv!");
                    _this.connectionChanged.next(ConnectionType.MOBILE);
                    break;
                default:
                    break;
            }
        });
    }
    ConnectivityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConnectivityService);
    return ConnectivityService;
}());
exports.ConnectivityService = ConnectivityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGl2aXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQywyQ0FBNkM7QUFHN0Msd0NBQXVDO0FBRXZDLElBQVksY0FBb0M7QUFBaEQsV0FBWSxjQUFjO0lBQUUsbURBQUksQ0FBQTtJQUFFLG1EQUFJLENBQUE7SUFBRSx1REFBTSxDQUFBO0FBQUMsQ0FBQyxFQUFwQyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUFzQjtBQUdoRDtJQUlJO1FBQUEsaUJBeUJDO1FBM0JNLHNCQUFpQixHQUFHLElBQUksaUJBQU8sRUFBa0IsQ0FBQztRQUdyRCxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQUMsaUJBQXlCO1lBQ25ELE1BQU0sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2pDLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO29CQUNoRCxLQUFLLENBQUMsMkVBQTJFLENBQUMsQ0FBQztvQkFDbkYsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pELEtBQUssQ0FBQztnQkFDVixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTtvQkFDakMsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7b0JBQ2hELEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO29CQUMxQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsS0FBSyxDQUFDO2dCQUNWLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNO29CQUNuQyxLQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7b0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztvQkFDbEQsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7b0JBQ3JDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuRCxLQUFLLENBQUM7Z0JBQ1Y7b0JBQ0ksS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTdCUSxtQkFBbUI7UUFEL0IsaUJBQVUsRUFBRTs7T0FDQSxtQkFBbUIsQ0ErQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQS9CRCxJQStCQztBQS9CWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgR3JvY2VyeUxpc3RTZXJ2aWNlIH0gZnJvbSBcIi4vZ3JvY2VyeS9ncm9jZXJ5LWxpc3Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHcm9jZXJ5IH0gZnJvbSBcIi4vZ3JvY2VyeS9ncm9jZXJ5XCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XHJcblxyXG5leHBvcnQgZW51bSBDb25uZWN0aW9uVHlwZSB7Tk9ORSwgV0lGSSwgTU9CSUxFIH1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpdml0eVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGNvbm5lY3Rpb25UeXBlOiBDb25uZWN0aW9uVHlwZTtcclxuICAgIHB1YmxpYyBjb25uZWN0aW9uQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PENvbm5lY3Rpb25UeXBlPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gQ29ubmVjdGlvblR5cGUuTk9ORTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG5vbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lyIGhhYmVuIGRpZSBJbnRlcm5ldHZlcmJpbmR1bmcgdmVybG9yZ2VuISBXZWl0ZXIgZ2VodHMgaW0gT2ZmbGluZSBNb2R1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25DaGFuZ2VkLm5leHQoQ29ubmVjdGlvblR5cGUuTk9ORSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBDb25uZWN0aW9uVHlwZS5XSUZJO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gV2lGaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaXIgc2luZCBtaXQgZGVtIFdpRmkgdmVyYnVuZGVuIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25DaGFuZ2VkLm5leHQoQ29ubmVjdGlvblR5cGUuV0lGSSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IENvbm5lY3Rpb25UeXBlLk1PQklMRTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG1vYmlsZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJNb2JpbGVzIEludGVybmV0IGlzdCBBa3RpdiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uQ2hhbmdlZC5uZXh0KENvbm5lY3Rpb25UeXBlLk1PQklMRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=