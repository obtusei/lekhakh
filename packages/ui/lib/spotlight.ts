import { DiscoverIcon, FollowingIcon, TrendingIcon, WriterIcon } from "../Icons";
import { SpotlightAction } from "@mantine/spotlight";
import { IconFile } from "@tabler/icons";

const onTrigger = () => {};

const spotlightActions: SpotlightAction[] = [
  {
    title: 'Discover',
    group: 'Home',
    icon: DiscoverIcon,
    onTrigger
  },
  { 
    title: 'Trending', 
    group: 'Home',
    icon:TrendingIcon ,
    onTrigger
  },
  { 
    title: 'Following',
    group: 'Home', 
    icon:FollowingIcon,
    onTrigger
  },
  { 
    title: 'Writers',
    group: 'Home', 
    icon:WriterIcon,
    onTrigger
  },
  {
    title:'Blogs', 
    group: 'search',
    icon:IconFile, 
    onTrigger
  },
  {
    title:'All categories', 
    group: 'search',
    icon:IconFile, 
    onTrigger
  },
  {
    title:'All writers', 
    group: 'search',
    icon:IconFile, 
    onTrigger
  },
];


export default spotlightActions