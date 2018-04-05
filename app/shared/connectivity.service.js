"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity = require("connectivity");
var ConnectionType;
(function (ConnectionType) {
    ConnectionType[ConnectionType["NONE"] = 0] = "NONE";
    ConnectionType[ConnectionType["WIFI"] = 1] = "WIFI";
    ConnectionType[ConnectionType["MOBILE"] = 2] = "MOBILE";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var ConnectivityService = /** @class */ (function () {
    function ConnectivityService() {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    _this.connectionType = ConnectionType.NONE;
                    console.log("Connection type changed to none.");
                    alert("Wir haben die Internetverbindung verlorgen! Weiter gehts im Offline Modus");
                    break;
                case connectivity.connectionType.wifi:
                    _this.connectionType = ConnectionType.WIFI;
                    console.log("Connection type changed to WiFi.");
                    alert("Wir sind mit dem WiFi verbunden!");
                    break;
                case connectivity.connectionType.mobile:
                    _this.connectionType = ConnectionType.MOBILE;
                    console.log("Connection type changed to mobile.");
                    alert("Mobiles Internet ist Aktiv!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGl2aXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQywyQ0FBNkM7QUFFN0MsSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3RCLG1EQUFJLENBQUE7SUFDSixtREFBSSxDQUFBO0lBQ0osdURBQU0sQ0FBQTtBQUNWLENBQUMsRUFKVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUl6QjtBQUdEO0lBSUk7UUFBQSxpQkF1QkM7UUFyQkcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFDLGlCQUF5QjtZQUNuRCxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUNqQyxLQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztvQkFDaEQsS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7b0JBQ25GLEtBQUssQ0FBQztnQkFDVixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTtvQkFDakMsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7b0JBQ2hELEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO29CQUMxQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU07b0JBQ25DLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztvQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO29CQUNsRCxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztvQkFDckMsS0FBSyxDQUFDO2dCQUNWO29CQUNJLEtBQUssQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEzQlEsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7O09BQ0EsbUJBQW1CLENBOEIvQjtJQUFELDBCQUFDO0NBQUEsQUE5QkQsSUE4QkM7QUE5Qlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcblxyXG5leHBvcnQgZW51bSBDb25uZWN0aW9uVHlwZSB7XHJcbiAgICBOT05FLFxyXG4gICAgV0lGSSxcclxuICAgIE1PQklMRVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0aXZpdHlTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdGlvblR5cGU6IENvbm5lY3Rpb25UeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgICAgIGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gQ29ubmVjdGlvblR5cGUuTk9ORTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG5vbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lyIGhhYmVuIGRpZSBJbnRlcm5ldHZlcmJpbmR1bmcgdmVybG9yZ2VuISBXZWl0ZXIgZ2VodHMgaW0gT2ZmbGluZSBNb2R1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IENvbm5lY3Rpb25UeXBlLldJRkk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBXaUZpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpciBzaW5kIG1pdCBkZW0gV2lGaSB2ZXJidW5kZW4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBDb25uZWN0aW9uVHlwZS5NT0JJTEU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBtb2JpbGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiTW9iaWxlcyBJbnRlcm5ldCBpc3QgQWt0aXYhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==