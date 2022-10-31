import { Card, Divider, Grid, Title } from "ui";
import SimpleCard, { SimpleCardButton } from "ui/components/Cards/SimpleCard";
import { GetTotals } from "../components/API";
import Layout from "../components/Layout";

export default function Web() {
  
  const {totals} = GetTotals()
  const data = [
    {
      title:"Total Users",
      sub:totals ? totals.users:0
    },
    {
      title:"Total Blogs",
      sub:totals ? totals.blogs:0
    },
    {
      title:"Total Categories",
      sub:totals ? totals.categories:0
    },
    {
      title:"Total Tags",
      sub:totals ? totals.tags:0
    },
    {
      title:"Total Newsletters",
      sub:totals ? totals.newsletters:0
    },
  ]
  return (
    <Layout>
      <Title order={3}>Welcome Abhishek bhatta</Title>
    <br />
    <Divider/>
    <br />
    <Grid grow>
      {
        data.map((card,index) => (
          <Grid.Col key={index} span={4}>
            <SimpleCardButton title={card.title} sub={card.sub}/>
          </Grid.Col>
        ))
      }

    </Grid>
    </Layout>
  );
}