import { ApplicationState } from './types';
import { subDays, format } from 'date-fns';

const generateFollowers = () => {
  const data = [];
  let currentFollowers = 280500;
  // Generate 90 days of history
  for (let i = 90; i >= 0; i--) {
    const date = subDays(new Date(), i);
    // Simulate spikes on certain days
    let gained = Math.floor(Math.random() * 500) + 100;
    if (i === 70 || i === 45 || i === 15) {
      gained += Math.floor(Math.random() * 5000) + 3000;
    }
    currentFollowers += gained;
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      followers: currentFollowers,
      gained,
    });
  }
  return data;
};

export const MOCK_DATA: ApplicationState = {
  account: {
    id: "acc_123",
    username: "@codecraft_alex",
    displayName: "CodeCraft Alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
    totalFollowers: 312450,
    niche: "Tech & Software Engineering",
  },
  lastUpdated: new Date().toISOString(),
  followerHistory: generateFollowers(),
  audience: {
    ageRange: {
      "13-17": 12,
      "18-24": 45,
      "25-34": 30,
      "35-44": 10,
      "45+": 3,
    },
    gender: {
      "Male": 72,
      "Female": 25,
      "Other": 3,
    },
    countries: [
      { country: "United States", code: "US", percentage: 45, estimatedCpm: 1.20 },
      { country: "United Kingdom", code: "GB", percentage: 15, estimatedCpm: 0.95 },
      { country: "Canada", code: "CA", percentage: 8, estimatedCpm: 0.85 },
      { country: "Germany", code: "DE", percentage: 7, estimatedCpm: 0.70 },
      { country: "India", code: "IN", percentage: 12, estimatedCpm: 0.15 },
      { country: "Australia", code: "AU", percentage: 5, estimatedCpm: 0.90 },
      { country: "Other", code: "OTHER", percentage: 8, estimatedCpm: 0.20 },
    ],
  },
  liveSessions: [
    { id: "live_1", date: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm'), durationMinutes: 120, peakViewers: 1450, totalViewers: 8500, newFollowers: 320, estimatedDiamonds: 4500 },
    { id: "live_2", date: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm'), durationMinutes: 90, peakViewers: 890, totalViewers: 5200, newFollowers: 150, estimatedDiamonds: 2100 },
    { id: "live_3", date: format(subDays(new Date(), 12), 'yyyy-MM-dd HH:mm'), durationMinutes: 150, peakViewers: 2100, totalViewers: 12400, newFollowers: 780, estimatedDiamonds: 8900 },
    { id: "live_4", date: format(subDays(new Date(), 20), 'yyyy-MM-dd HH:mm'), durationMinutes: 60, peakViewers: 650, totalViewers: 3400, newFollowers: 95, estimatedDiamonds: 1200 },
  ],
  videos: [
    {
      id: "v_1",
      title: "Why you should stop using console.log() #coding #webdev",
      thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm'),
      views: 125400,
      watchTimeSeconds: 24.5,
      completionRate: 68.2,
      actions: { likes: 14200, comments: 840, shares: 3200, saves: 5100 },
      trafficSources: { fyp: 82, search: 5, followers: 12, other: 1 }
    },
    {
      id: "v_2",
      title: "My custom NeoVim setup for 2026 \u26a1\ufe0f #neovim #developer",
      thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm'),
      views: 89000,
      watchTimeSeconds: 45.2,
      completionRate: 52.1,
      actions: { likes: 9800, comments: 420, shares: 890, saves: 4200 },
      trafficSources: { fyp: 65, search: 15, followers: 18, other: 2 }
    },
    {
      id: "v_3",
      title: "React vs Vue in 60 seconds \u23f1\ufe0f #reactjs #vuejs",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 7), 'yyyy-MM-dd HH:mm'),
      views: 450200,
      watchTimeSeconds: 58.9,
      completionRate: 85.4,
      actions: { likes: 65000, comments: 3200, shares: 12400, saves: 18000 },
      trafficSources: { fyp: 92, search: 3, followers: 4, other: 1 }
    },
    {
      id: "v_4",
      title: "How I fix merge conflicts without crying \ud83d\ude2d #git #github",
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm'),
      views: 210000,
      watchTimeSeconds: 32.1,
      completionRate: 61.5,
      actions: { likes: 24000, comments: 1200, shares: 5400, saves: 8900 },
      trafficSources: { fyp: 75, search: 12, followers: 11, other: 2 }
    },
    {
      id: "v_5",
      title: "CSS Grid is actually easy. Watch this. #css #frontend",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 14), 'yyyy-MM-dd HH:mm'),
      views: 890000,
      watchTimeSeconds: 41.0,
      completionRate: 72.8,
      actions: { likes: 112000, comments: 4500, shares: 25000, saves: 45000 },
      trafficSources: { fyp: 88, search: 8, followers: 3, other: 1 }
    },
    {
      id: "v_6",
      title: "Day in the life of a remote software engineer \ud83d\udcbb #dayinthelife",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 18), 'yyyy-MM-dd HH:mm'),
      views: 56000,
      watchTimeSeconds: 65.0,
      completionRate: 45.2,
      actions: { likes: 5200, comments: 210, shares: 450, saves: 800 },
      trafficSources: { fyp: 45, search: 2, followers: 50, other: 3 }
    },
    {
      id: "v_7",
      title: "Stop making this API design mistake \u26a0\ufe0f #backend",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 22), 'yyyy-MM-dd HH:mm'),
      views: 175000,
      watchTimeSeconds: 28.5,
      completionRate: 58.1,
      actions: { likes: 18500, comments: 950, shares: 3100, saves: 6200 },
      trafficSources: { fyp: 78, search: 10, followers: 11, other: 1 }
    },
    {
      id: "v_8",
      title: "My favorite VS Code extensions 2026 #vscode",
      thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd93b850a88?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 25), 'yyyy-MM-dd HH:mm'),
      views: 320000,
      watchTimeSeconds: 48.0,
      completionRate: 64.5,
      actions: { likes: 38000, comments: 1400, shares: 8500, saves: 15000 },
      trafficSources: { fyp: 85, search: 5, followers: 9, other: 1 }
    },
    {
      id: "v_9",
      title: "Understanding Docker in 3 minutes \ud83d\udc33 #docker #devops",
      thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 30), 'yyyy-MM-dd HH:mm'),
      views: 650000,
      watchTimeSeconds: 150.0,
      completionRate: 48.2,
      actions: { likes: 75000, comments: 2800, shares: 19000, saves: 28000 },
      trafficSources: { fyp: 81, search: 12, followers: 6, other: 1 }
    },
    {
      id: "v_10",
      title: "TypeScript Utility Types you MUST know #typescript",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=400&fit=crop",
      uploadDate: format(subDays(new Date(), 35), 'yyyy-MM-dd HH:mm'),
      views: 285000,
      watchTimeSeconds: 52.4,
      completionRate: 59.8,
      actions: { likes: 31000, comments: 890, shares: 6200, saves: 12500 },
      trafficSources: { fyp: 72, search: 18, followers: 9, other: 1 }
    }
  ]
};
