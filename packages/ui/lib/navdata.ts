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

// export const ADMIN_NAVDATA:SideBarProps<TablerIcon>[] = [
//   { label: 'Dashboard', icon: IconSmartHome,href:"/"},
//   { label: 'Users', icon: IconUsers,href:"/users"},
//   { label: 'Blogs', icon: IconArchive,href:"/blogs"},
//   { label: 'Categories', icon: IconGridDots,href:"/categories"},
//   { label: 'Tags', icon: IconHash,href:"/tags"},
//   { label: 'Roles', icon: IconAffiliate,href:"/roles"},
//   { label: 'View Code', icon: IconCode,href:"/code"},
//   { label: 'Feedbacks', icon: IconMessage2,href:"/feedback"},
//   { label: 'Reports', icon: IconBug,href:"/reports"},
// ]