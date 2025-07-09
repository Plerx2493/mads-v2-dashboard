import type { DashboardStats } from '../types/dashboard';

// Mock data - replace this with actual API call
export async function fetchDashboardStats(): Promise<DashboardStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalServers: 24,
    activeServers: 21,
    totalMembers: 15420,
    totalCommands: 892456,
    commandsToday: 1247,
    uptime: "99.8%",
    mostActiveServer: {
      name: "Gaming Community",
      memberCount: 3421,
      commandsToday: 284
    },
    recentActivity: [
      {
        id: "1",
        type: "command_used",
        serverName: "Gaming Community",
        description: "User ran /help command",
        timestamp: "2 minutes ago"
      },
      {
        id: "2",
        type: "server_join",
        serverName: "Developer Hub",
        description: "New member joined",
        timestamp: "5 minutes ago"
      },
      {
        id: "3",
        type: "bot_added",
        serverName: "Art Studio",
        description: "Bot added to server",
        timestamp: "12 minutes ago"
      },
      {
        id: "4",
        type: "command_used",
        serverName: "Music Lounge",
        description: "User ran /play command",
        timestamp: "18 minutes ago"
      },
      {
        id: "5",
        type: "error",
        serverName: "Tech Support",
        description: "Command failed: insufficient permissions",
        timestamp: "22 minutes ago"
      }
    ],
    serverGrowth: [
      { date: "2024-01-01", servers: 18, members: 12450 },
      { date: "2024-01-02", servers: 19, members: 13120 },
      { date: "2024-01-03", servers: 20, members: 13890 },
      { date: "2024-01-04", servers: 22, members: 14560 },
      { date: "2024-01-05", servers: 23, members: 15100 },
      { date: "2024-01-06", servers: 24, members: 15420 }
    ],
    commandUsage: [
      { command: "/help", usage: 1205, change: 8.5 },
      { command: "/play", usage: 892, change: -3.2 },
      { command: "/ban", usage: 456, change: 12.1 },
      { command: "/kick", usage: 324, change: -1.8 },
      { command: "/info", usage: 289, change: 15.6 }
    ]
  };
}

// TODO: Replace with actual API endpoint
// export async function fetchDashboardStats(): Promise<DashboardStats> {
//   const response = await fetch('/api/dashboard/stats');
//   if (!response.ok) {
//     throw new Error('Failed to fetch dashboard statistics');
//   }
//   return response.json();
// }