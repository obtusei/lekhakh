import { Stack, Title,Text, Button, SimpleGrid,useMantineTheme, Center, Box } from '@mantine/core'
import { HeroProps } from '../lib/interfaces';

export default function Hero(props:HeroProps) {
  const theme = useMantineTheme();
  return (
    <div  style={{padding:"20px"}}>
      <SimpleGrid cols={2}>
          <Center>
                    <Stack>
                      <Stack spacing={0}>
                              <Text color={theme.colorScheme === 'dark' ? theme.colors.lekhakh[0]:theme.colors.secondary[0]}>{props.subtitle}</Text><br />
                              <Title style={{fontFamily:"Cormorant Garamond",fontWeight:"700",fontSize:"48px"}}>{props.title}</Title><br />
                              <Text color={"dimmed"}>{props.description}</Text>
                    </Stack>
                    <Box>
                      <Button mt={'lg'}>{props.buttonText}</Button>
                    </Box>
                    </Stack>
          </Center>

          <div>
                   {/* <Lottie options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData,
                        
                    }} 
                    width={"100%"} /> */}
          </div>
          
    </SimpleGrid>
    </div>
  )
}