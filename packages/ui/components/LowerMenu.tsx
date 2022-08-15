import { Menu, Text, Group, ActionIcon,useMantineColorScheme } from "@mantine/core";
import {
  IconWorld,
  IconChevronUp,
} from "@tabler/icons";
import {useRouter} from "next/router";
import { MoonIcon, SunIcon } from "../Icons";
import Href from "./Link";
export default function LowerMenu() {
  const router = useRouter()
  const { pathname, asPath, query } = router
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  return (
    <Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          {/* <Button leftIcon={<IconWorld/>} rightIcon={<IconChevronUp/>} variant={"light"} color={"gray"}>EN</Button> */}
          <Group spacing={5} color="red">
            <IconWorld size={"16px"} color="gray" />
            <Text color={"gray"}>{router.locale?.toUpperCase()}</Text>
            <IconChevronUp size={"16px"} color="gray" />
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
      <Href title="Home" link="/" />
      <Href title="FAQS" link="/" />
      <Href title="Login" link="/" />
    </Group>
  );
}
