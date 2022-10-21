import dynamic from "next/dynamic";
export * from "@mantine/core";
export * from "@mantine/hooks"
export * from "@mantine/dates";
export * from "@mantine/spotlight"
export * from "@tabler/icons"
export {NotificationsProvider,showNotification} from "@mantine/notifications"
export const RichTextEditor =  dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});
export * from "./lib/blogData"


/* -------------------------------------------------------------------------- */
/*                               Custom Elememt                               */
/* -------------------------------------------------------------------------- */

export * from "./theme"
export * from "./components/Shell"
export * from "./lib/navdata"
export * from "./components/Shell";
export * from "./components/Sign"
export * from "./components/Sign/Register"
export * from "./components/Sign/Login"
export * from "./components/Cards/BlogCard";
export * from "./components/Cards/Carousel";
export * from "./components/Cards/CircleCard";
export * from "./components/Cards/WriterCard";
export * from "./components/Profile/ProfileCard";
export * from "./components/Cards/SimpleCard"
export * from "./components/Hero"
export * from "./components/ScrollSection"
export * from "./lib/spotlight"
export * from "./lib/navdata"
export * from "./components/BlogPost"
export * from "./components/StateButtons"
export * from "./components/CustomChip"
export * from "./components/ShortcutLists"
export * from "./components/TopAlert"