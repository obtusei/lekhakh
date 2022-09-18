import { useMantineTheme,Container,Center,Button,Loader } from "ui"
import { ReloadIcon } from "ui/Icons"
import { useRouter } from "next/router"
import useTranslation from "next-translate/useTranslation"

export const ErrorSection = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  const {t} = useTranslation();
  return(
    <Container>
      <Center>
        {t('common:error')}
        <br />
        <Button leftIcon={<ReloadIcon/>} variant={"white"} onClick={ () => router.reload()}>{t("common:retry")}</Button>
      </Center>
    </Container>
  )
}

export const LoadingSection = () => {
  const theme = useMantineTheme()
  
  return(
    <Container>
      <Center>
        <Loader color={theme.colorScheme == 'dark' ? theme.colors.lekhakh[0]:theme.colors.secondary[0]} size="md"/>
      </Center>
    </Container>
  )
}