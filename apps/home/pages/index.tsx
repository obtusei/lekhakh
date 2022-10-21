import Link from "next/link";
import { Divider, Stack, NavLink, Title, Group, Grid, Center, Text} from "ui";
import BlogCard from "ui/components/Cards/BlogCard";
import CustomChip from "ui/components/CustomChip";
import Hero from "ui/components/Hero";
import LowerMenu from "ui/components/LowerMenu";
import { DiscoverIcon,TrendingIcon } from "ui/Icons";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation"
import { GetSession, GetTags } from "../api/user";
import { GetTopBlogs, GetTrendingBlogs } from "../api/blog";
import { ITag } from "ui/lib/interfaces";
import { ErrorSection,LoadingSection } from "../components/ErrorAndLoading";
import Card from "../components/Card";
import axios from "axios";
import safeJsonStringify from "safe-json-stringify";

export async function getServerSideProps () {
  // `getStaticProps` is executed on the server side.
  axios.defaults.withCredentials = true
  const res = await axios.get('/auth/info',{withCredentials:true})
  const session = await res.data
  const headers = res.headers
  return {
    props: {
      user:session,
      headers:headers
    }
  }
}

export default function Web({user,headers}) {
  const {t} = useTranslation();
  const heroData = {
    title:[t('common:heroTitle'),t('common:heroTitle2')],
    subtitle:t('common:heroSub'),
    description:t('common:heroDes'),
    buttonText:[t('common:startReading'),t('common:startWriting')]
  }

  const data = {title:heroData.title[0],subtitle:heroData.subtitle,description:heroData.description,buttonText:heroData.buttonText[0]}
  const {session} = GetSession()
  const {trendData,isLoading:trendLoading} = GetTrendingBlogs();
  const {topData,isLoading:topLoading} = GetTopBlogs();
  const {tags,isLoading:tagLoading} = GetTags()
  
  return (
    <>
      <Layout isNavHidden={true}>
        
        {/* HERO SECTION */}
        <Hero {...data}/><br />
        <Text>JSON:{JSON.stringify(user)}</Text>
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
                {/* <BlogCard props={trend} session={session} isSmall={true} index={index}/>, */}
                <Card blog={trend} isSmall={true} index={index}/>
              </Grid.Col>
            )):
            trendLoading ? <LoadingSection/>:<ErrorSection/>
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
                topData ? topData.map((blog,index) => (
                  // <BlogCard props={blog} session={session}/>
                  <Card blog={blog}/>
                )):
                topLoading ? <LoadingSection/>:<ErrorSection/>
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
              : tagLoading ? <LoadingSection/>:<ErrorSection/>
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

