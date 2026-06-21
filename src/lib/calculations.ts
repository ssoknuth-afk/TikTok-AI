import { ApplicationState, VideoMetrics } from './types';

export const calculateOverviewMetrics = (state: ApplicationState) => {
  const totalViews = state.videos.reduce((sum, v) => sum + v.views, 0);
  
  // Follower growth over last 30 days
  const currentFollowers = state.followerHistory[state.followerHistory.length - 1].followers;
  const followers30dAgo = state.followerHistory[Math.max(0, state.followerHistory.length - 30)].followers;
  const followerGrowth = currentFollowers - followers30dAgo;
  const followerGrowthPercent = ((currentFollowers - followers30dAgo) / followers30dAgo) * 100;

  // Average Engagement Rate: (Likes + Comments + Shares + Saves) / Views
  const totalEngagements = state.videos.reduce((sum, v) => sum + v.actions.likes + v.actions.comments + v.actions.shares + v.actions.saves, 0);
  const avgEngagementRate = (totalEngagements / totalViews) * 100;

  // Average Watch Completion
  const avgWatchCompletion = state.videos.reduce((sum, v) => sum + v.completionRate, 0) / state.videos.length;

  // Estimated Revenue: (Total Views / 1000) * Average CPM based on audience
  const avgCpm = state.audience.countries.reduce((sum, c) => sum + (c.percentage / 100) * c.estimatedCpm, 0);
  const estimatedRevenue = (totalViews / 1000) * avgCpm;

  // FYP Distribution Score: average FYP traffic across videos
  const fypScore = state.videos.reduce((sum, v) => sum + v.trafficSources.fyp, 0) / state.videos.length;

  return {
    totalViews,
    followerGrowth,
    followerGrowthPercent,
    avgEngagementRate,
    avgWatchCompletion,
    estimatedRevenue,
    fypScore,
    avgCpm
  };
};

export const getVideoEngagementRate = (video: VideoMetrics) => {
  const engagements = video.actions.likes + video.actions.comments + video.actions.shares + video.actions.saves;
  return (engagements / video.views) * 100;
};

export const getAggregatedTrafficSources = (state: ApplicationState) => {
  const totalViews = state.videos.reduce((sum, v) => sum + v.views, 0);
  
  let fyp = 0, search = 0, followers = 0, other = 0;
  
  state.videos.forEach(v => {
    fyp += (v.trafficSources.fyp / 100) * v.views;
    search += (v.trafficSources.search / 100) * v.views;
    followers += (v.trafficSources.followers / 100) * v.views;
    other += (v.trafficSources.other / 100) * v.views;
  });

  return {
    fyp: (fyp / totalViews) * 100,
    search: (search / totalViews) * 100,
    followers: (followers / totalViews) * 100,
    other: (other / totalViews) * 100,
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(num);
};

export const formatPercent = (num: number) => {
  return `${num.toFixed(1)}%`;
};
