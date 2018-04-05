import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Grocery } from "./grocery";

import * as applicationSettings from 'application-settings';
import { ConnectivityService, ConnectionType } from "../../shared/connectivity.service";
import { Subject } from "rxjs/Subject";
import {startWith} from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { connectionType } from "tns-core-modules/connectivity/connectivity";

@Injectable()
export class GroceryListService {
  baseUrl = Config.apiUrl + "appdata/" + Config.appKey + "/Groceries";
  public refreshList = new Subject<string>();

  constructor(private http: Http, private connectivityService: ConnectivityService) {
    connectivityService.connectionChanged.subscribe((cType: ConnectionType) => {
      if (cType != ConnectionType.NONE) {
        this.syncGroceries();
      }
    });
  }

  loadGroceriesFromDB() {
    const groceries = JSON.parse(applicationSettings.getString('groceries'));
    return groceries != null ? groceries : [];
  }

  saveGroceriesToDB(groceries: Array<any>) {
    applicationSettings.setString('groceries', JSON.stringify(groceries));
  }

  load() {
    if (this.connectivityService.connectionType === ConnectionType.NONE){
      return this.loadOffline();
    } else {
      return this.loadOnline();
    }
  }

  syncGroceries() {
      // alle Groceries syncen, die noch nicht isSynced = true sind
      const groceries = this.loadGroceriesFromDB();
      const nonSyncedGroceries = groceries.filter((g: Grocery) => {
        return !g.isSynced;
      });

      nonSyncedGroceries.forEach((g: Grocery) => {
          this.addOnline(g.name).subscribe(
              (syncedG: Grocery) => {
                  console.log('synced Grocery: ' + syncedG.name + ', ' + syncedG.id)
              }
          )
      });

      this.refreshList.next('REFRESH');
  }

  loadOnline() {
    // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
    let params = new URLSearchParams();
    params.append("sort", "{\"_kmd.lmt\": 1}");

    return this.http.get(this.baseUrl, {
      headers: this.getCommonHeaders(),
      params: params
    })
    .map(res => res.json())
    .map(data => {
      let groceryList: Array<Grocery> = [];
      data.forEach((grocery) => {
        groceryList.push(new Grocery(grocery._id, grocery.Name, true));
      });

      // in den Cache damit
      this.saveGroceriesToDB(groceryList);

      return groceryList;
    })
    .catch(this.handleErrors);
  }

  loadOffline() {
    const offlineGroceries = new BehaviorSubject<Array<any>>(this.loadGroceriesFromDB());
    return offlineGroceries;
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Kinvey " + Config.token);
    return headers;
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  add(name: string) {
    if (this.connectivityService.connectionType === ConnectionType.NONE){
      return this.addOffline(name);
    } else {
      return this.addOnline(name);
    }
  }

  addOnline(name: string) {
    return this.http.post(
      this.baseUrl,
      JSON.stringify({ Name: name }),
      { headers: this.getCommonHeaders() }
    )
    .map(res => res.json())
    .map(data => {
      return new Grocery(data._id, name, true);
    })
    .catch(this.handleErrors);
  }

  addOffline(name: string) {
    const newGrocery = new Grocery('', name, false);
    const grocerySubject = new BehaviorSubject<Grocery>(newGrocery);

    const groceries = this.loadGroceriesFromDB();
    groceries.push(newGrocery);
    this.saveGroceriesToDB(groceries);

    return grocerySubject;
  }

  delete(id: string) {
    return this.http.delete(
      this.baseUrl + "/" + id,
      { headers: this.getCommonHeaders() }
    )
    .map(res => res.json())
    .catch(this.handleErrors);
  }
}