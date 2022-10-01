import { Card, Grid, Title } from "ui";
import SimpleCard from "ui/components/Cards/SimpleCard";
import Layout from "../components/Layout";

export default function Web() {
  
  return (
    <Layout>
      <Title order={3}>Welcome Abhishek bhatta</Title>
    <br />
    <Grid grow>
      {
        [1,2,3,4,5].map((card,index) => (
          <Grid.Col key={index} span={4}>
            <SimpleCard title="Total Users" sub="1200"/>
          </Grid.Col>
        ))
      }

    </Grid>
    </Layout>
  );
}

/*
 • Total Users
 • Total Blogs
 • Total Tags
 • Number of categories
 • Total Reports
 • Feedback
 • Total Newsletter Subscribers 
 */