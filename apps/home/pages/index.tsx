import Link from "next/link";
import { useRouter } from "next/router";
import { Divider,Shell,useMantineColorScheme, Stack, NavLink, Title, Group, Grid, Center, Text} from "ui";
import BlogCard from "ui/components/Cards/BlogCard";
import CustomChip from "ui/components/CustomChip";
import Hero from "ui/components/Hero";
import LowerMenu from "ui/components/LowerMenu";
import { DiscoverIcon,TrendingIcon } from "ui/Icons";
import blogData from "ui/lib/blogData";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation"
import { GetSession, GetTags } from "../api/user";

export default function Web() {
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  const router = useRouter()
  const {locale} = router;
  const {t} = useTranslation();
  const heroData = {
    title:[t('common:heroTitle'),t('common:heroTitle2')],
    subtitle:t('common:heroSub'),
    description:t('common:heroDes'),
    buttonText:[t('common:startReading'),t('common:startWriting')]
  }
  const data = {title:heroData.title[0],subtitle:heroData.subtitle,description:heroData.description,buttonText:heroData.buttonText[0]}
  const {session} = GetSession()
  const {tags,isLoading} = GetTags()
  return (
    <>
      <Layout isNavHidden={true}>
        {/* HERO SECTION */}
        <Hero {...data}/><br />
        
        <Divider/><br />

        {/* TRENDING SECTION */}
        <Link href={"/trending"}>
          <NavLink label={t('common:trending')} icon={<TrendingIcon/>} style={{fontWeight:"bold"}}/>
        </Link>
        <br />
        <Grid grow>
          {
            [...Array(6)].map((trend,index) => (
              <Grid.Col span={4} key={index}><BlogCard props={blogData[0]} session={session} isSmall={true}/></Grid.Col>
            ))
          }
        </Grid>

        <br/>
        <Divider/>
        <br />

        {/* DISCOVER SECTION */}
        <Link href={"/discover"}>
          <NavLink label={t("common:discover")} icon={<DiscoverIcon/>} style={{fontWeight:"bold"}}/>
        </Link>
        <br />
        <Grid grow>
          <Grid.Col span={4}>
            <Stack>
              {
                [...Array(10)].map((blog,index) => (
                  <BlogCard props={blogData[0]} session={session}/>
                ))
              }
            </Stack>
          </Grid.Col>

          {/* TAGS SECTION */}
          <Grid.Col span={2}>
            <div>
            <Title order={4}>{t("common:tagsYouLike")}</Title>
            <Group spacing={15} mt={"10px"}>
            {
              tags ? tags.map((tag,index:number) => (
                <CustomChip key={index} href={`/tag`} title={tag.name}/>
              ))
              : <CustomChip key={1} href={`/`} title={"Loading..."}/>
            }
            </Group>
          </div>
          </Grid.Col>
        </Grid>
        <br />
        <br />

        {/* FOOTER SECTION */}
        <Center>
          <LowerMenu/>
        </Center>
      </Layout>
    </>
  );
}