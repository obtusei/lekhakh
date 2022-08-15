import { createStyles, Paper, Text, Title, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface ShortBlogProps {
  image: string;
  title: string;
  category: string;
  readMore: () => void;
}

export default function CarouselCard({ image, title, category,readMore }: ShortBlogProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="0"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      
    >
      <Paper p={'xl'} style={{backgroundColor:"rgba(0,0,0,0.25)",width:"100%",height:"100%"}} className={classes.card}>
        <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button onClick={() => readMore()}>
        Read article
      </Button>
      </Paper>
    </Paper>
  );
}