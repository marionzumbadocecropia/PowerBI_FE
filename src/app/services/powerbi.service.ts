import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmbedInfo} from '../models/embed-info.model';
import {Report} from '../models/report.model';
import {Tile} from '../models/tile.model';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {

  constructor(private http: HttpClient) { }
  getReports() {
    return this.http.get<Report[]>('http://localhost:64867/home/getreports');
  }
  getReportById(id: string) {
    console.log(`getreportbyid ${id}`);
    return this.http.get<EmbedInfo>(`http://localhost:64867/home/embedreport?reportId=${id}`);
  }
  getDashboards() {
    return this.http.get<Dashboard[]>('http://localhost:64867/home/getdashboards');
  }
  getDashboardById(id: string) {
    console.log(`getreportbyid ${id}`);
    return this.http.get<EmbedInfo>(`http://localhost:64867/home/embeddashboard?dashboardId=${id}`);
  }
  getTiles() {
    return this.http.get<Tile[]>('http://localhost:64867/home/gettiles');
  }
  getTileById(id: string, dashboardId: string) {
    console.log(`getreportbyid ${id}`);
    return this.http.get<EmbedInfo>(`http://localhost:64867/home/embedtile?dashboardId=${dashboardId}&tileId=${id}`);
  }
}

