export type ServerModule = {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
  enabled: boolean;
  badge?: number; // For notifications/counts
  permissions?: string[]; // Required permissions
};

export type ServerModuleData = {
  overview: OverviewData;
  moderation: ModerationData;
  tags: TagsData;
  logging: LoggingData;
  roles: RolesData;
  channels: ChannelsData;
  automod: AutoModData;
  settings: SettingsData;
};

export type OverviewData = {
  stats: {
    totalMembers: number;
    onlineMembers: number;
    totalChannels: number;
    totalRoles: number;
    messagesLast24h: number;
    commandsUsed: number;
  };
  recentActions: RecentAction[];
  quickActions: QuickAction[];
};

export type ModerationData = {
  activeBans: Ban[];
  recentWarnings: Warning[];
  moderationStats: {
    totalBans: number;
    totalKicks: number;
    totalWarnings: number;
    autoModActions: number;
  };
  autoModRules: AutoModRule[];
};

export type TagsData = {
  tags: Tag[];
  categories: TagCategory[];
  usage: TagUsage[];
};

export type LoggingData = {
  auditLogs: AuditLog[];
  messageLogs: MessageLog[];
  filters: LogFilter[];
  channels: LogChannel[];
};

export type RolesData = {
  roles: Role[];
  hierarchy: RoleHierarchy[];
  permissions: Permission[];
};

export type ChannelsData = {
  categories: ChannelCategory[];
  channels: Channel[];
  permissions: ChannelPermission[];
};

export type AutoModData = {
  rules: AutoModRule[];
  triggers: AutoModTrigger[];
  actions: AutoModAction[];
  statistics: AutoModStats;
};

export type SettingsData = {
  general: GeneralSettings;
  features: FeatureSettings;
  integrations: Integration[];
  backups: Backup[];
};

// Supporting types
export type RecentAction = {
  id: string;
  type: 'ban' | 'kick' | 'warn' | 'mute' | 'channel_update' | 'role_update';
  user: string;
  moderator: string;
  reason?: string;
  timestamp: string;
  details?: string;
};

export type QuickAction = {
  id: string;
  name: string;
  icon: string;
  action: string;
  dangerous?: boolean;
};

export type Ban = {
  id: string;
  userId: string;
  username: string;
  moderator: string;
  reason: string;
  timestamp: string;
  expiresAt?: string;
  active: boolean;
};

export type Warning = {
  id: string;
  userId: string;
  username: string;
  moderator: string;
  reason: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
};

export type AutoModRule = {
  id: string;
  name: string;
  type: 'spam' | 'toxicity' | 'links' | 'caps' | 'mentions';
  enabled: boolean;
  severity: 'warn' | 'mute' | 'kick' | 'ban';
  threshold?: number;
  channels?: string[];
};

export type Tag = {
  id: string;
  name: string;
  content: string;
  category: string;
  creator: string;
  usageCount: number;
  createdAt: string;
  lastUsed?: string;
};

export type TagCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
  tagCount: number;
};

export type TagUsage = {
  tagId: string;
  tagName: string;
  uses: number;
  trend: number; // percentage change
};

export type AuditLog = {
  id: string;
  action: string;
  user: string;
  target?: string;
  details: string;
  timestamp: string;
  category: 'moderation' | 'server' | 'roles' | 'channels';
};

export type MessageLog = {
  id: string;
  userId: string;
  username: string;
  channelId: string;
  channelName: string;
  content: string;
  timestamp: string;
  type: 'message' | 'edit' | 'delete';
};

export type LogFilter = {
  category: string;
  enabled: boolean;
  channels?: string[];
};

export type LogChannel = {
  id: string;
  name: string;
  type: 'audit' | 'moderation' | 'messages';
  enabled: boolean;
};

export type Role = {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: string[];
  memberCount: number;
  mentionable: boolean;
  hoisted: boolean;
};

export type RoleHierarchy = {
  roleId: string;
  position: number;
  canManage: string[]; // role IDs this role can manage
};

export type Permission = {
  id: string;
  name: string;
  description: string;
  category: string;
  dangerous?: boolean;
};

export type ChannelCategory = {
  id: string;
  name: string;
  position: number;
  channels: string[];
};

export type Channel = {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'category' | 'thread';
  categoryId?: string;
  position: number;
  topic?: string;
  nsfw: boolean;
  locked: boolean;
};

export type ChannelPermission = {
  channelId: string;
  roleId?: string;
  userId?: string;
  allow: string[];
  deny: string[];
};

export type AutoModTrigger = {
  id: string;
  name: string;
  type: string;
  conditions: Record<string, any>;
  enabled: boolean;
};

export type AutoModAction = {
  id: string;
  name: string;
  type: 'delete' | 'warn' | 'mute' | 'kick' | 'ban';
  duration?: number;
  reason?: string;
};

export type AutoModStats = {
  actionsLast24h: number;
  actionsLast7d: number;
  actionsLast30d: number;
  topTriggers: { name: string; count: number }[];
};

export type GeneralSettings = {
  name: string;
  description: string;
  icon?: string;
  banner?: string;
  verificationLevel: number;
  defaultNotifications: boolean;
  explicitContentFilter: number;
};

export type FeatureSettings = {
  welcomeMessages: boolean;
  autoRole: boolean;
  levelingSystem: boolean;
  economySystem: boolean;
  customCommands: boolean;
  autoModeration: boolean;
};

export type Integration = {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  configured: boolean;
  settings: Record<string, any>;
};

export type Backup = {
  id: string;
  name: string;
  type: 'manual' | 'automatic';
  size: number;
  createdAt: string;
  status: 'completed' | 'failed' | 'in_progress';
};