import { useForm } from '@mantine/form';
import { TextInput, Button,PasswordInput, Alert,Stack, Text, NavLink, Title, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
import { RegisterProps } from './Register';
import Href from '../Link';

export default function LogIn({onSubmit,loading,stringData}:RegisterProps) {
  const form = useForm({
    initialValues: {username: '', password: '' },
    validate: {
      username: (value) => (value.length < 2 ? stringData.emailRequired : null),
      password: (value) => (value.length < 6 ? stringData.passwordRequired : null),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      showNotification({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    // showNotification({ message: 'Successfully registered', color: 'green' });
    onSubmit(values);
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)} style={{width:"400px"}}>
      <Stack align={"center"}>
        <Stack style={{width:"100%"}} spacing={0}>
          <Title>{stringData.title}</Title>
          <Text color={"dimmed"}>{stringData.subTitle}</Text>
          <TextInput mt={"lg"} label={stringData.email} placeholder={stringData.email} {...form.getInputProps('username')} size="md" variant="filled"/>
          <PasswordInput
              mt={"sm"} 
              label={stringData.password}
              placeholder={stringData.password}
              {...form.getInputProps('password')}
              size="md"
              variant="filled"
            />
            
          <Button type="submit" mt="sm" size='lg'>
            Login
          </Button>
        </Stack>
        <Group spacing={5}>
        <Text>{stringData.footer}</Text><Href link={"/register"} shallow={true} title={stringData.subFooter}/>
        </Group>
      </Stack>
    </form>
  );
}