import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Button, Center, IconArrowLeft, Stack, Text, Title } from 'ui'

function ErrorPage() {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <Center style={{height:"100vh"}}>
      <Stack>
        <Title>{t("other:404")}</Title>
        <Text color={"dimmed"}>{t("other:notFound")}</Text>
        <Button leftIcon={<IconArrowLeft size={"20px"}/>} onClick={() => router.back()}>{t("other:goBack")}</Button>
      </Stack>
    </Center>
  )
}

export default ErrorPage