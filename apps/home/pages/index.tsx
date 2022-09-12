import Link from "next/link";
import { useRouter } from "next/router";
import { Divider,Shell,useMantineColorScheme, Stack, NavLink, Title, Group, Grid, Center, Text, Container, Loader, useMantineTheme, Button} from "ui";
import BlogCard from "ui/components/Cards/BlogCard";
import CustomChip from "ui/components/CustomChip";
import Hero from "ui/components/Hero";
import LowerMenu from "ui/components/LowerMenu";
import { DiscoverIcon,ReloadIcon,TickIcon,TrendingIcon } from "ui/Icons";
import blogData from "ui/lib/blogData";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation"
import { GetSession, GetTags } from "../api/user";
import { GetDiscoverBlogs, GetTopBlogs, GetTrendingBlogs } from "../api/blog";
import { ITag } from "ui/lib/interfaces";

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
  const {tags,isLoading:tagLoading} = GetTags()
  const {trendData,isLoading:trendLoading,isError:trendError} = GetTrendingBlogs();
  const {topData} = GetTopBlogs();
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
            trendData ? trendData.map((trend,index) => (
              <Grid.Col span={4} key={index}>
                <BlogCard props={trend} session={session} isSmall={true} index={index}/>,
                </Grid.Col>
            )):
            trendLoading ? <LoadingSection/>:
            trendError ? <ErrorSection/>:<></>
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
                topData?.map((blog,index) => (
                  <BlogCard props={blog} session={session}/>
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
              tags ? tags.map((tag:ITag,index:number) => (
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

const ErrorSection = () => {
  const theme = useMantineTheme()
  return(
    <Container>
      <Center>
        ERRORR... <br />
        <Button leftIcon={<ReloadIcon/>} variant={"white"}>Retry</Button>
      </Center>
    </Container>
  )
}

const LoadingSection = () => {
  const theme = useMantineTheme()
  
  return(
    <Container>
      <Center>
        <Loader color={theme.colorScheme == 'dark' ? theme.colors.lekhakh[0]:theme.colors.secondary[0]} size="md"/>
      </Center>
    </Container>
  )
}