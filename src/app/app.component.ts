import { Component, OnInit } from '@angular/core';
import { PowerbiService } from './services/powerbi.service';
import { Report } from './models/report.model';
import { Dashboard } from './models/dashboard.model';
import { Tile } from './models/tile.model';
import * as pbi from 'powerbi-client';
import { EmbedInfo } from './models/embed-info.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'power-bi-embedding-fe';
  myReports: Report[] = [];
  myDashboards: Dashboard[] = [];
  myTiles: Tile[] = [];
  private pbiContainerElement: HTMLElement;
  constructor(private powerbiService: PowerbiService) {}
  ngOnInit() {
    this.pbiContainerElement = <HTMLElement>(
      document.getElementById('reportContainer')
    );
    this.loadAllReports();
    this.loadAllDashboards();
    this.loadAllTiles();
  }

  loadAllReports() {
    this.powerbiService.getReports().subscribe(reports => {
      this.myReports = reports;
    });
  }

  loadAllDashboards() {
    this.powerbiService.getDashboards().subscribe(dashboards => {
      this.myDashboards = dashboards;
    });
  }

  loadAllTiles() {
    this.powerbiService.getTiles().subscribe(tiles => {
      this.myTiles = tiles;
    });
  }

  embedReport(reportId: string) {
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    this.powerbiService.getReportById(reportId).subscribe(
      data => {
        const embedConfig = this.buildEmbedConfigReport(data);
        powerbi.reset(this.pbiContainerElement);
        powerbi.embed(this.pbiContainerElement, embedConfig);
      });
  }

  private buildEmbedConfigReport(data: EmbedInfo) {
    return <pbi.IEmbedConfiguration>{
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      embedUrl: data.EmbedUrl,
      accessToken: data.EmbedToken.Token,
      id: data.Id,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };
  }

  embedDashboard(dashboardId: string) {
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    this.powerbiService.getDashboardById(dashboardId).subscribe(
      data => {
        const embedConfig = this.buildEmbedConfigDashboard(data);
        powerbi.reset(this.pbiContainerElement);
        powerbi.embed(this.pbiContainerElement, embedConfig);
      });
  }

  private buildEmbedConfigDashboard(data: EmbedInfo) {
    return <pbi.IEmbedConfiguration>{
      type: 'dashboard',
      tokenType: pbi.models.TokenType.Embed,
      embedUrl: data.EmbedUrl,
      accessToken: data.EmbedToken.Token,
      id: data.Id,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };
  }

  embedTile(tileId: string, dashboardId: string) {
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    this.powerbiService.getTileById(tileId, dashboardId).subscribe(
      data => {
        const embedConfig = this.buildEmbedConfigTile(data);
        powerbi.reset(this.pbiContainerElement);
        powerbi.embed(this.pbiContainerElement, embedConfig);
      });
  }

  private buildEmbedConfigTile(data: EmbedInfo) {
    return <pbi.IEmbedConfiguration>{
      type: 'tile',
      tokenType: pbi.models.TokenType.Embed,
      embedUrl: data.EmbedUrl,
      accessToken: data.EmbedToken.Token,
      id: data.Id,
      dashboardId: data.dashboardId, // tile is diferent here, the other ones does not need this
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };
  }

}
