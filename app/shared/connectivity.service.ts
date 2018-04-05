import { Injectable } from "@angular/core";
import * as connectivity from "connectivity";

export enum ConnectionType {
    NONE,
    WIFI,
    MOBILE
}

@Injectable()
export class ConnectivityService {

    public connectionType: ConnectionType;

    constructor(){

        connectivity.startMonitoring((newConnectionType: number) => {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    this.connectionType = ConnectionType.NONE;
                    console.log("Connection type changed to none.");
                    alert("Wir haben die Internetverbindung verlorgen! Weiter gehts im Offline Modus");
                    break;
                case connectivity.connectionType.wifi:
                    this.connectionType = ConnectionType.WIFI;
                    console.log("Connection type changed to WiFi.");
                    alert("Wir sind mit dem WiFi verbunden!");
                    break;
                case connectivity.connectionType.mobile:
                    this.connectionType = ConnectionType.MOBILE;
                    console.log("Connection type changed to mobile.");
                    alert("Mobiles Internet ist Aktiv!");
                    break;
                default:
                    break;
            }
        });
    }


}

