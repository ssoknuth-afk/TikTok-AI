export interface TrafficSource {
  fyp: number;
  search: number;
  followers: number;
  other: number;
}

export interface VideoAction {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface VideoMetrics {
  id: string;
  title: string;
  thumbnail: string;
  uploadDate: string;
  views: number;
  watchTimeSeconds: number;
  completionRate: number; // percentage
  actions: VideoAction;
  trafficSources: TrafficSource;
}

export interface AudienceDemographics {
  ageRange: Record<string, number>; // e.g. "18-24": 45
  gender: Record<string, number>; // "Male", "Female", "Other"
  countries: {
    country: string;
    code: string;
    percentage: number;
    estimatedCpm: number; // in USD
  }[];
}

export interface FollowerDataPoint {
  date: string;
  followers: number;
  gained: number;
}

export interface LiveSession {
  id: string;
  date: string;
  durationMinutes: number;
  peakViewers: number;
  totalViewers: number;
  newFollowers: number;
  estimatedDiamonds: number;
}

export interface CreatorAccount {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  totalFollowers: number;
  niche: string;
}

export interface ApplicationState {
  account: CreatorAccount;
  videos: VideoMetrics[];
  followerHistory: FollowerDataPoint[];
  audience: AudienceDemographics;
  liveSessions: LiveSession[];
  lastUpdated: string;
}
