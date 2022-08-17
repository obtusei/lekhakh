import { Menu, Text, Group, ActionIcon,useMantineColorScheme } from "@mantine/core";
import {
  IconWorld,
  IconChevronUp,
  IconChevronDown
} from "@tabler/icons";
import {useRouter} from "next/router";
import { useState } from "react";
import { MoonIcon, SunIcon } from "../Icons";
import Href from "./Link";

export const ColorModeAndLocale = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  const [chevron,setChevron] = useState(false)
  return(
    <Group>
      <Menu shadow="md" width={200} onOpen={() => setChevron(true)} onClose={() => setChevron(false)}>
        <Menu.Target>
          {/* <Button leftIcon={<IconWorld/>} rightIcon={<IconChevronUp/>} variant={"light"} color={"gray"}>EN</Button> */}
          <Group spacing={5} color="red">
            <IconWorld size={"16px"} color="gray" />
            <Text color={"dimmed"}>{router.locale?.toUpperCase()}</Text>
            {
              !chevron ? <IconChevronDown size={"16px"} color="gray" />:<IconChevronUp size={"16px"} color="gray" />
            }
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          {
            router.locales?.map((locale,index) => (
              <Menu.Item key={index} onClick={
                () => {
                  router.push({ pathname, query }, asPath, { locale: locale })
                }
              }>{locale.toUpperCase()}</Menu.Item>
            ))
          }
        </Menu.Dropdown>
      </Menu>
      <ActionIcon onClick={
        () => {
          toggleColorScheme();
        }
      }>
        {
          colorScheme === 'dark' ? <SunIcon color="gray" opacity={0.8}/>:<MoonIcon color="gray" opacity={0.8} />
        }
      </ActionIcon>
    </Group>
  )
}
export default function LowerMenu() {
  const router = useRouter()
  return (
    <Group>
      <ColorModeAndLocale/>
      <Href title="Home" link="/" />
      <Href title="FAQS" link="/" />
      <Href title="Login" link="/" />
    </Group>
  );
}
