// Mock getServers function for dashboard overview
export type Server = {
  id: string;
  name: string;
  iconUrl: string | null;
  approximateMemberCount: number | null;
  isBotInGuild: boolean;
};
