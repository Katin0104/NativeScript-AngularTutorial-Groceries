"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var grocery_1 = require("./grocery");
var applicationSettings = require("application-settings");
var connectivity_service_1 = require("../../shared/connectivity.service");
var Subject_1 = require("rxjs/Subject");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var GroceryListService = /** @class */ (function () {
    function GroceryListService(http, connectivityService) {
        var _this = this;
        this.http = http;
        this.connectivityService = connectivityService;
        this.baseUrl = config_1.Config.apiUrl + "appdata/" + config_1.Config.appKey + "/Groceries";
        this.refreshList = new Subject_1.Subject();
        connectivityService.connectionChanged.subscribe(function (cType) {
            if (cType != connectivity_service_1.ConnectionType.NONE) {
                _this.syncGroceries();
            }
        });
    }
    GroceryListService.prototype.loadGroceriesFromDB = function () {
        var groceries = JSON.parse(applicationSettings.getString('groceries'));
        return groceries != null ? groceries : [];
    };
    GroceryListService.prototype.saveGroceriesToDB = function (groceries) {
        applicationSettings.setString('groceries', JSON.stringify(groceries));
    };
    GroceryListService.prototype.load = function () {
        if (this.connectivityService.connectionType === connectivity_service_1.ConnectionType.NONE) {
            return this.loadOffline();
        }
        else {
            return this.loadOnline();
        }
    };
    GroceryListService.prototype.syncGroceries = function () {
        var _this = this;
        // alle Groceries syncen, die noch nicht isSynced = true sind
        var groceries = this.loadGroceriesFromDB();
        var nonSyncedGroceries = groceries.filter(function (g) {
            return !g.isSynced;
        });
        nonSyncedGroceries.forEach(function (g) {
            _this.addOnline(g.name).subscribe(function (syncedG) {
                console.log('synced Grocery: ' + syncedG.name + ', ' + syncedG.id);
            });
        });
        this.refreshList.next('REFRESH');
    };
    GroceryListService.prototype.loadOnline = function () {
        var _this = this;
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
        var params = new http_1.URLSearchParams();
        params.append("sort", "{\"_kmd.lmt\": 1}");
        return this.http.get(this.baseUrl, {
            headers: this.getCommonHeaders(),
            params: params
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var groceryList = [];
            data.forEach(function (grocery) {
                groceryList.push(new grocery_1.Grocery(grocery._id, grocery.Name, true));
            });
            // in den Cache damit
            _this.saveGroceriesToDB(groceryList);
            return groceryList;
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.loadOffline = function () {
        var offlineGroceries = new BehaviorSubject_1.BehaviorSubject(this.loadGroceriesFromDB());
        return offlineGroceries;
    };
    GroceryListService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Kinvey " + config_1.Config.token);
        return headers;
    };
    GroceryListService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    GroceryListService.prototype.add = function (name) {
        if (this.connectivityService.connectionType === connectivity_service_1.ConnectionType.NONE) {
            return this.addOffline(name);
        }
        else {
            return this.addOnline(name);
        }
    };
    GroceryListService.prototype.addOnline = function (name) {
        return this.http.post(this.baseUrl, JSON.stringify({ Name: name }), { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            return new grocery_1.Grocery(data._id, name, true);
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.addOffline = function (name) {
        var newGrocery = new grocery_1.Grocery('', name, false);
        var grocerySubject = new BehaviorSubject_1.BehaviorSubject(newGrocery);
        var groceries = this.loadGroceriesFromDB();
        groceries.push(newGrocery);
        this.saveGroceriesToDB(groceries);
        return grocerySubject;
    };
    GroceryListService.prototype.delete = function (id) {
        return this.http.delete(this.baseUrl + "/" + id, { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    GroceryListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, connectivity_service_1.ConnectivityService])
    ], GroceryListService);
    return GroceryListService;
}());
exports.GroceryListService = GroceryListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUU7QUFDekUsOENBQTZDO0FBQzdDLG1DQUFpQztBQUNqQyxpQ0FBK0I7QUFFL0Isb0NBQW1DO0FBQ25DLHFDQUFvQztBQUVwQywwREFBNEQ7QUFDNUQsMEVBQXdGO0FBQ3hGLHdDQUF1QztBQUV2Qyx3REFBdUQ7QUFJdkQ7SUFJRSw0QkFBb0IsSUFBVSxFQUFVLG1CQUF3QztRQUFoRixpQkFNQztRQU5tQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUhoRixZQUFPLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFDN0QsZ0JBQVcsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUd6QyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFxQjtZQUNwRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUkscUNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdEQUFtQixHQUFuQjtRQUNFLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsU0FBcUI7UUFDckMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxLQUFLLHFDQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFRCwwQ0FBYSxHQUFiO1FBQUEsaUJBZ0JDO1FBZkcsNkRBQTZEO1FBQzdELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdDLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQVU7WUFDckQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQVU7WUFDbEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUM1QixVQUFDLE9BQWdCO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3RFLENBQUMsQ0FDSixDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUFBLGlCQXNCQztRQXJCQywwR0FBMEc7UUFDMUcsSUFBSSxNQUFNLEdBQUcsSUFBSSxzQkFBZSxFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2hDLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDdEIsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNQLElBQUksV0FBVyxHQUFtQixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQXFCO1lBQ3JCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVwQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFNLGdCQUFnQixHQUFHLElBQUksaUNBQWUsQ0FBYSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLEtBQWU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQ0FBRyxHQUFILFVBQUksSUFBWTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEtBQUsscUNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLElBQVk7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFDOUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDckM7YUFDQSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDUCxNQUFNLENBQUMsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxJQUFZO1FBQ3JCLElBQU0sVUFBVSxHQUFHLElBQUksaUJBQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQU0sY0FBYyxHQUFHLElBQUksaUNBQWUsQ0FBVSxVQUFVLENBQUMsQ0FBQztRQUVoRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sRUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUN2QixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUNyQzthQUNBLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDdEIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBL0hVLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQUtlLFdBQUksRUFBK0IsMENBQW1CO09BSnJFLGtCQUFrQixDQWdJOUI7SUFBRCx5QkFBQztDQUFBLEFBaElELElBZ0lDO0FBaElZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcblxyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IEdyb2NlcnkgfSBmcm9tIFwiLi9ncm9jZXJ5XCI7XHJcblxyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcclxuaW1wb3J0IHsgQ29ubmVjdGl2aXR5U2VydmljZSwgQ29ubmVjdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2Nvbm5lY3Rpdml0eS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XHJcbmltcG9ydCB7c3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gXCJyeGpzL0JlaGF2aW9yU3ViamVjdFwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2Nvbm5lY3Rpdml0eS9jb25uZWN0aXZpdHlcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyb2NlcnlMaXN0U2VydmljZSB7XHJcbiAgYmFzZVVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwcGRhdGEvXCIgKyBDb25maWcuYXBwS2V5ICsgXCIvR3JvY2VyaWVzXCI7XHJcbiAgcHVibGljIHJlZnJlc2hMaXN0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgY29ubmVjdGl2aXR5U2VydmljZTogQ29ubmVjdGl2aXR5U2VydmljZSkge1xyXG4gICAgY29ubmVjdGl2aXR5U2VydmljZS5jb25uZWN0aW9uQ2hhbmdlZC5zdWJzY3JpYmUoKGNUeXBlOiBDb25uZWN0aW9uVHlwZSkgPT4ge1xyXG4gICAgICBpZiAoY1R5cGUgIT0gQ29ubmVjdGlvblR5cGUuTk9ORSkge1xyXG4gICAgICAgIHRoaXMuc3luY0dyb2NlcmllcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxvYWRHcm9jZXJpZXNGcm9tREIoKSB7XHJcbiAgICBjb25zdCBncm9jZXJpZXMgPSBKU09OLnBhcnNlKGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdncm9jZXJpZXMnKSk7XHJcbiAgICByZXR1cm4gZ3JvY2VyaWVzICE9IG51bGwgPyBncm9jZXJpZXMgOiBbXTtcclxuICB9XHJcblxyXG4gIHNhdmVHcm9jZXJpZXNUb0RCKGdyb2NlcmllczogQXJyYXk8YW55Pikge1xyXG4gICAgYXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2dyb2NlcmllcycsIEpTT04uc3RyaW5naWZ5KGdyb2NlcmllcykpO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbm5lY3Rpdml0eVNlcnZpY2UuY29ubmVjdGlvblR5cGUgPT09IENvbm5lY3Rpb25UeXBlLk5PTkUpe1xyXG4gICAgICByZXR1cm4gdGhpcy5sb2FkT2ZmbGluZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZE9ubGluZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3luY0dyb2NlcmllcygpIHtcclxuICAgICAgLy8gYWxsZSBHcm9jZXJpZXMgc3luY2VuLCBkaWUgbm9jaCBuaWNodCBpc1N5bmNlZCA9IHRydWUgc2luZFxyXG4gICAgICBjb25zdCBncm9jZXJpZXMgPSB0aGlzLmxvYWRHcm9jZXJpZXNGcm9tREIoKTtcclxuICAgICAgY29uc3Qgbm9uU3luY2VkR3JvY2VyaWVzID0gZ3JvY2VyaWVzLmZpbHRlcigoZzogR3JvY2VyeSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhZy5pc1N5bmNlZDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBub25TeW5jZWRHcm9jZXJpZXMuZm9yRWFjaCgoZzogR3JvY2VyeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hZGRPbmxpbmUoZy5uYW1lKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgKHN5bmNlZEc6IEdyb2NlcnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N5bmNlZCBHcm9jZXJ5OiAnICsgc3luY2VkRy5uYW1lICsgJywgJyArIHN5bmNlZEcuaWQpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucmVmcmVzaExpc3QubmV4dCgnUkVGUkVTSCcpO1xyXG4gIH1cclxuXHJcbiAgbG9hZE9ubGluZSgpIHtcclxuICAgIC8vIEtpbnZleS1zcGVjaWZpYyBzeW50YXggdG8gc29ydCB0aGUgZ3JvY2VyaWVzIGJ5IGxhc3QgbW9kaWZpZWQgdGltZS4gRG9u4oCZdCB3b3JyeSBhYm91dCB0aGUgZGV0YWlscyBoZXJlLlxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgIHBhcmFtcy5hcHBlbmQoXCJzb3J0XCIsIFwie1xcXCJfa21kLmxtdFxcXCI6IDF9XCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSxcclxuICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgIH0pXHJcbiAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgLm1hcChkYXRhID0+IHtcclxuICAgICAgbGV0IGdyb2NlcnlMaXN0OiBBcnJheTxHcm9jZXJ5PiA9IFtdO1xyXG4gICAgICBkYXRhLmZvckVhY2goKGdyb2NlcnkpID0+IHtcclxuICAgICAgICBncm9jZXJ5TGlzdC5wdXNoKG5ldyBHcm9jZXJ5KGdyb2NlcnkuX2lkLCBncm9jZXJ5Lk5hbWUsIHRydWUpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBpbiBkZW4gQ2FjaGUgZGFtaXRcclxuICAgICAgdGhpcy5zYXZlR3JvY2VyaWVzVG9EQihncm9jZXJ5TGlzdCk7XHJcblxyXG4gICAgICByZXR1cm4gZ3JvY2VyeUxpc3Q7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIGxvYWRPZmZsaW5lKCkge1xyXG4gICAgY29uc3Qgb2ZmbGluZUdyb2NlcmllcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8YW55Pj4odGhpcy5sb2FkR3JvY2VyaWVzRnJvbURCKCkpO1xyXG4gICAgcmV0dXJuIG9mZmxpbmVHcm9jZXJpZXM7XHJcbiAgfVxyXG5cclxuICBnZXRDb21tb25IZWFkZXJzKCkge1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiS2ludmV5IFwiICsgQ29uZmlnLnRva2VuKTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgfVxyXG5cclxuICBhZGQobmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5jb25uZWN0aXZpdHlTZXJ2aWNlLmNvbm5lY3Rpb25UeXBlID09PSBDb25uZWN0aW9uVHlwZS5OT05FKXtcclxuICAgICAgcmV0dXJuIHRoaXMuYWRkT2ZmbGluZShuYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkZE9ubGluZShuYW1lKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZE9ubGluZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgdGhpcy5iYXNlVXJsLFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh7IE5hbWU6IG5hbWUgfSksXHJcbiAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxyXG4gICAgKVxyXG4gICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIC5tYXAoZGF0YSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgR3JvY2VyeShkYXRhLl9pZCwgbmFtZSwgdHJ1ZSk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIGFkZE9mZmxpbmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBuZXdHcm9jZXJ5ID0gbmV3IEdyb2NlcnkoJycsIG5hbWUsIGZhbHNlKTtcclxuICAgIGNvbnN0IGdyb2NlcnlTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxHcm9jZXJ5PihuZXdHcm9jZXJ5KTtcclxuXHJcbiAgICBjb25zdCBncm9jZXJpZXMgPSB0aGlzLmxvYWRHcm9jZXJpZXNGcm9tREIoKTtcclxuICAgIGdyb2Nlcmllcy5wdXNoKG5ld0dyb2NlcnkpO1xyXG4gICAgdGhpcy5zYXZlR3JvY2VyaWVzVG9EQihncm9jZXJpZXMpO1xyXG5cclxuICAgIHJldHVybiBncm9jZXJ5U3ViamVjdDtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShcclxuICAgICAgdGhpcy5iYXNlVXJsICsgXCIvXCIgKyBpZCxcclxuICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSB9XHJcbiAgICApXHJcbiAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICB9XHJcbn0iXX0=