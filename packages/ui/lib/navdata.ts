import { CategoryIcon, FollowingIcon, HashtagIcon, TrendingIcon, WriterIcon } from '../Icons';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIcon,
  IconCompass,
  IconBrandSafari,
  IconFiretruck,
  IconFileShredder,
  IconUser,
  IconHash,
  IconFlame,
  IconLayout2,
  IconUsers,
  IconWriting,
  IconSignature,
  IconSmartHome,
  IconArchive,
  IconGridDots,
  IconAffiliate,
  IconCode,
  IconBug,
  IconMessage2,
} from '@tabler/icons';
import { DiscoverIcon } from '../Icons';
import { SideBarProps } from './interfaces';


export const NAVDATA:SideBarProps[] = [
  { label: 'Discover', icon: DiscoverIcon,href:"/discover"},
  { label: 'Trending', icon: TrendingIcon,href:"/trending" },
  { label: 'Following', icon: FollowingIcon,href:"/following" },
  { label: 'Writers', icon: WriterIcon,href:"/writers" },
  {
    label: 'Category',
    icon: CategoryIcon,
    intiallyOpen: true,
    links: [
      { label: 'Overview', link: '/ove' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Tags',
    icon: HashtagIcon,
    intiallyOpen: true,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  
];

export const ADMIN_NAVDATA:SideBarProps[] = [
  { label: 'Dashboard', icon: HashtagIcon,href:"/"},
  { label: 'Users', icon: HashtagIcon,href:"/users"},
  { label: 'Blogs', icon: HashtagIcon,href:"/blogs"},
  { label: 'Categories', icon: HashtagIcon,href:"/categories"},
  { label: 'Tags', icon: HashtagIcon,href:"/tags"},
  { label: 'Roles', icon: HashtagIcon,href:"/roles"},
  { label: 'View Code', icon: HashtagIcon,href:"https://github.com/obtusei/lekhakh"},
  { label: 'Feedbacks', icon: HashtagIcon,href:"/feedbacks"},
  { label: 'Reports', icon: HashtagIcon,href:"/reports"},
]