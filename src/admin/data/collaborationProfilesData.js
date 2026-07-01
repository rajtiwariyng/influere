import consultancyData from './consultancyData';

const avatars = [
  consultancyData.legal.professionals[0].avatar,
  consultancyData.legal.professionals[1].avatar,
  consultancyData.legal.professionals[2].avatar,
];

// Base profile records used by Collaboration lists, Buy Profile and Shortlisted.
// Social stats (followers/following/posts, activity, askingRate) added for #18.
const baseProfiles = [
  {
    id: 'profile-1',
    name: 'Rajesh Kumar',
    country: 'India',
    followers: '869k',
    following: '512',
    posts: '1.2k',
    activity: { likes: '24k', views: '310k', comments: '1.8k', reposts: '4.2k' },
    askingRate: '$500',
  },
  {
    id: 'profile-2',
    name: 'Priya Sharma',
    country: 'United States',
    followers: '650k',
    following: '430',
    posts: '980',
    activity: { likes: '18k', views: '210k', comments: '1.1k', reposts: '2.9k' },
    askingRate: '$420',
  },
  {
    id: 'profile-3',
    name: 'Amit Patel',
    country: 'United Kingdom',
    followers: '480k',
    following: '388',
    posts: '760',
    activity: { likes: '12k', views: '160k', comments: '820', reposts: '1.7k' },
    askingRate: '$360',
  },
  {
    id: 'profile-4',
    name: 'Sarah Johnson',
    country: 'Canada',
    followers: '1.2M',
    following: '604',
    posts: '2.1k',
    activity: { likes: '52k', views: '720k', comments: '3.4k', reposts: '9.1k' },
    askingRate: '$1,200',
  },
  {
    id: 'profile-5',
    name: 'Meera Desai',
    country: 'India',
    followers: '650k',
    following: '470',
    posts: '1.4k',
    activity: { likes: '21k', views: '240k', comments: '1.3k', reposts: '3.2k' },
    askingRate: '$650',
  },
  {
    id: 'profile-6',
    name: 'David Chen',
    country: 'Singapore',
    followers: '950k',
    following: '521',
    posts: '1.7k',
    activity: { likes: '34k', views: '410k', comments: '2.2k', reposts: '5.6k' },
    askingRate: '$880',
  },
  {
    id: 'profile-7',
    name: 'Ananya Reddy',
    country: 'India',
    followers: '780k',
    following: '402',
    posts: '1.1k',
    activity: { likes: '27k', views: '300k', comments: '1.6k', reposts: '3.9k' },
    askingRate: '$540',
  },
  {
    id: 'profile-8',
    name: 'Michael Thompson',
    country: 'Australia',
    followers: '1.5M',
    following: '712',
    posts: '2.6k',
    activity: { likes: '68k', views: '910k', comments: '4.7k', reposts: '12k' },
    askingRate: '$1,500',
  },
  {
    id: 'profile-9',
    name: 'Kavya Nair',
    country: 'United Arab Emirates',
    followers: '1.8M',
    following: '640',
    posts: '3.0k',
    activity: { likes: '74k', views: '1.1M', comments: '5.2k', reposts: '14k' },
    askingRate: '$1,800',
  },
  {
    id: 'profile-10',
    name: 'James Wilson',
    country: 'United States',
    followers: '520k',
    following: '356',
    posts: '690',
    activity: { likes: '14k', views: '180k', comments: '910', reposts: '2.1k' },
    askingRate: '$300',
  },
];

export const collaborationProfiles = baseProfiles.map((profile, index) => ({
  ...profile,
  avatar: avatars[index % avatars.length],
  reach: profile.followers,
  rating: 4.5,
  ratingLabel: '4.5',
  // legacy fields kept for components not yet migrated
  askingRates: {
    post: profile.askingRate,
    repost: profile.askingRate,
    retweet: profile.askingRate,
  },
  summary:
    'Active content creator with a highly engaged audience and consistent posting history across the platform.',
}));
