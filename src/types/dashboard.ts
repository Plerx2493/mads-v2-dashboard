export type DashboardStats = {
  totalServers: number;
  activeServers: number;
  totalMembers: number;
  totalCommands: number;
  commandsToday: number;
  uptime: string;
  mostActiveServer: {
    name: string;
    memberCount: number;
    commandsToday: number;
  };
  recentActivity: ActivityItem[];
  serverGrowth: GrowthData[];
  commandUsage: CommandUsageData[];
};

export type ActivityItem = {
  id: string;
  type: 'server_join' | 'command_used' | 'bot_added' | 'error';
  serverName: string;
  description: string;
  timestamp: string;
  icon?: string;
};

export type GrowthData = {
  date: string;
  servers: number;
  members: number;
};

export type CommandUsageData = {
  command: string;
  usage: number;
  change: number; // percentage change from previous period
};