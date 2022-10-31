import { useRouter } from "next/router";
import { Button, Center, Stack, Text, Title } from "ui";

export default function NotAdmin() {
  const router = useRouter()
  return (
    <Center style={{height:"100vh"}}>
      <Stack>
        <Title>Not an Admin</Title>
        <Text>This site is for Lekhakh Admins only</Text>
        <Button onClick={() => router.push("/logout")}>Logout</Button>
        <Button variant="light" onClick={() => router.push("http://localhost:3000")}>Go Back to Lekhakh</Button>
      </Stack>
    </Center>
  )
}

