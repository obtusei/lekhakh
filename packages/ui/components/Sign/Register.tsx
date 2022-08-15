import { useForm } from '@mantine/form';
import { TextInput, Button,PasswordInput, Alert,Stack, Text, NavLink, Title, Group, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
import Href from '../Link';

export interface RegisterProps {
  onSubmit: (values: any) => void;
  loading: boolean;
  stringData:RegisterStringProps
}

export interface RegisterStringProps {
    title:string,
    subTitle:String,
    name?:string,
    username?:string,
    email:string,
    password:string,
    confirmPassword?:string,
    button:string,
    footer:string,
    subFooter:string,
    nameRequired?:string,
    usernameRequired?:string,
    emailRequired?:string,
    passwordRequired?:string,
    confirmPasswordRequired?:string
  }


export default function Register({ onSubmit,loading,stringData}: RegisterProps) {
  const form = useForm({
    initialValues: { name: '', email: '',username: '', password: '',confirmPassword: '' },
    validate: {
      name: (value) => (value.length < 2 ? stringData.nameRequired : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : stringData.emailRequired),
      username: (value) => (value.length < 2 ? stringData.usernameRequired : null),
      password: (value) => (value.length < 6 ? stringData.passwordRequired : null),
      confirmPassword: (value,values) => (value !== values.password ? stringData.confirmPasswordRequired : null),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      showNotification({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    }else if (errors.username) {
      showNotification({ message: 'Please fill username field', color: 'red' });
    }else if (errors.password) {
      showNotification({ message: 'Please fill password field', color: 'red' });
    }
    else if (errors.confirmPassword){
      showNotification({ message: 'Passwords must match', color: 'red' });
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values);
  };


  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)} style={{width:"400px"}}>
      <Stack align={"center"}>
        <Stack style={{width:"100%"}} spacing={0}>
          <Title>{stringData.title}</Title>
          <Text color={"dimmed"}>{stringData.subTitle}</Text>
          <TextInput mt={"lg"}  label={stringData.name} placeholder="Name" {...form.getInputProps('name')} size="md" variant="filled"/>
          <TextInput mt={"sm"} label={stringData.username} placeholder="Username" {...form.getInputProps('username')} size="md" variant="filled"/>
          <TextInput mt={"sm"}  label={stringData.email} placeholder="Email" {...form.getInputProps('email')} size="md" variant="filled"/>
          <PasswordInput
              mt={"sm"} 
              label={stringData.password}
              placeholder="Password"
              {...form.getInputProps('password')}
              size="md"
              variant="filled"
            />

            <PasswordInput
              mt={"sm"} 
              label={stringData.confirmPassword}
              placeholder="Confirm password"
              {...form.getInputProps('confirmPassword')}
              size="md"
              variant="filled"
            />
            
          <Button type="submit" mt="sm" size='lg'>
            { loading ? <Loader size={'sm'} color="white" /> : stringData.button}
          </Button>
        </Stack>
        <Group spacing={5}>
          <Text>{stringData.footer}</Text><Href title={stringData.subFooter}link={"/login"} shallow={true}/>
        </Group>
      </Stack>
    </form>
  );
}