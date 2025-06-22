import Link from "next/link";
import {
  Divider,
  Stack,
  NavLink,
  Title,
  Group,
  Grid,
  Center,
  Text,
  Input,
  Button,
  Paper,
  IconMail,
  showNotification,
} from "ui";
import CustomChip from "ui/components/CustomChip";
import Hero from "ui/components/Hero";
import LowerMenu from "ui/components/LowerMenu";
import { DiscoverIcon, TrendingIcon } from "ui/Icons";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation";
import { GetSession, GetTags } from "../api/user";
import { GetTopBlogs, GetTrendingBlogs } from "../api/blog";
import { ITag } from "ui/lib/interfaces";
import { ErrorSection, LoadingSection } from "../components/ErrorAndLoading";
import Card from "../components/Card";
import axios from "axios";
import { useState } from "react";

export async function getServerSideProps() {
  const res = await axios.get("/auth/info", { withCredentials: true });

  const session = await res.data;
  const headers = res.headers;
  return {
    props: {
      user: session,
      headers: headers,
    },
  };
}

export default function Web({ user }: any) {
  const { t } = useTranslation();
  const heroData = {
    title: [t("common:heroTitle"), t("common:heroTitle2")],
    subtitle: t("common:heroSub"),
    description: t("common:heroDes"),
    buttonText: [t("common:startReading"), t("common:startWriting")],
  };

  const data = {
    title: heroData.title[0],
    subtitle: heroData.subtitle,
    description: heroData.description,
    buttonText: heroData.buttonText[0],
  };
  const { session } = GetSession();
  const { trendData, isLoading: trendLoading } = GetTrendingBlogs();
  const { topData, isLoading: topLoading } = GetTopBlogs();
  const { tags, isLoading: tagLoading } = GetTags(5);
  const [ets, setEts] = useState("");
  return (
    <>
      <Layout isNavHidden={true}>
        {/* HERO SECTION */}
        <Hero {...data} />
        <br />
        <Divider />
        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* TRENDING SECTION */}
          <div style={{ maxWidth: "1440px", width: "100%" }}>
            <Link href={"/trending"}>
              <NavLink
                label={t("common:trending")}
                icon={<TrendingIcon />}
                style={{ fontWeight: "bold" }}
              />
            </Link>
          </div>
          <br />
          <Grid style={{ maxWidth: "1440px" }} grow>
            {trendData ? (
              trendData.map((trend, index) => (
                <Grid.Col span={4} key={index}>
                  {/* <BlogCard props={trend} session={session} isSmall={true} index={index}/>, */}

                  <Card blog={trend} isSmall={true} index={index + 1} />
                </Grid.Col>
              ))
            ) : trendLoading ? (
              <LoadingSection />
            ) : (
              <ErrorSection />
            )}
          </Grid>
          <br />
          <Divider />
          <br />

          {/* DISCOVER SECTION */}
          <div style={{ maxWidth: "1440px", width: "100%" }}>
            <Link href={"/discover"}>
              <NavLink
                label={t("common:discover")}
                icon={<DiscoverIcon />}
                style={{ fontWeight: "bold" }}
              />
            </Link>
          </div>
          <br />
          <Grid style={{ maxWidth: "1440px" }} grow>
            <Grid.Col span={4}>
              <Stack>
                {topData ? (
                  topData.map((blog, index) => (
                    // <BlogCard props={blog} session={session}/>
                    <Card blog={blog} />
                  ))
                ) : topLoading ? (
                  <LoadingSection />
                ) : (
                  <ErrorSection />
                )}
              </Stack>
            </Grid.Col>

            {/* TAGS SECTION */}
            <Grid.Col span={2}>
              <div>
                <Title order={4}>{t("common:tagsYouLike")}</Title>
                <Group spacing={15} mt={"10px"}>
                  {tags ? (
                    tags.map((tag: ITag, index: number) => (
                      <CustomChip
                        key={index}
                        href={`/tag/${tag.name.toLocaleLowerCase()}`}
                        title={tag.name}
                      />
                    ))
                  ) : tagLoading ? (
                    <LoadingSection />
                  ) : (
                    <ErrorSection />
                  )}
                </Group>
              </div>
            </Grid.Col>
          </Grid>
          <br />
          <br />
        </div>

        {/* FOOTER SECTION */}
        <Center>
          <Paper shadow={"lg"} style={{ padding: "20px" }} withBorder>
            <Stack>
              <Stack spacing={0}>
                <Group spacing={3}>
                  <IconMail />
                  <Title order={4}>{t("common:newsletter")}</Title>
                </Group>
                <Text color={"dimmed"}>{t("common:newsletterSub")}</Text>
              </Stack>
              <Group style={{ width: "100%" }}>
                <Input
                  placeholder="example@example.com"
                  type={"email"}
                  value={ets}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEts(e.target.value)
                  }
                  style={{ width: "70%" }}
                />
                <Button
                  onClick={() => {
                    axios
                      .post(
                        "/newsletter",
                        { email: ets },
                        { withCredentials: true }
                      )
                      .then((res) => {
                        showNotification({
                          title: t("common:newsletterSuccess"),
                          message: t("common:newsletterSuccessSub"),
                        });
                      })
                      .catch((err) => {
                        showNotification({
                          title: t("common:newsletterFail"),
                          message: t("common:newsletterFailSub"),
                        });
                      });
                  }}
                >
                  {t("common:subscribe")}
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Center>
        <br />
        <Center>
          <LowerMenu />
        </Center>
      </Layout>
    </>
  );
}
