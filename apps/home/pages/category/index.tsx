
import { Shell,Card,Breadcrumbs,Anchor,Title } from 'ui';
import Layout from '../../components/Layout';

const items = [
  { title: 'Home', href: '/discover' },
  { title: 'Category', href: '/category' },
  { title: 'Item', href: '/category' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function Category() {
  return (
    <Layout>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
      <Card shadow="sm" p="md" radius="md" withBorder >
          <Title></Title>
      </Card>
    </Layout>
  );
}