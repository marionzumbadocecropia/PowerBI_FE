import { Dashboard } from './dashboard.model';
export interface EmbedInfo { // to embed the report, dashboard or title
    EmbedToken: {Expiration: string; Token: string; TokenId: string};
    EmbedUrl: string;
    Id: string;
    dashboardId: string; // this is used just for tile
}
