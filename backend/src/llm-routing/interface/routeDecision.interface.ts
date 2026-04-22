export interface RouteDecision {
  action: "GREETING" | "SEARCH";
  directResponse?: string;
}
