import Layout from '../../components/Layout'
import { Divider, Group, Title,Text, Stack, Table } from 'ui';
import { GetAllUsers } from '../../components/API';
import SimpleCard from 'ui/components/Cards/SimpleCard';

function Users() {
   const { users, isLoading, isError } = GetAllUsers()
   const emailVerifiedUsers= users ? users?.data.filter((u:any) => {return u.emailVerified === true}).length:0
   const verifiedUser = users ? users?.data.filter((u:any) => {return u.isVerifiedUser === true}).length:0
  // if (isError) return <div>Fail to load</div>
  const time = (tim:string) => new Date(tim);
  return (
    <Layout>
      <Title>Users</Title>
      <br />
      <Group>
        <SimpleCard title='Total Users' sub={`${users ? users.data.length:0}`}/>
        <SimpleCard title='Total Email Verified Users' sub={`${emailVerifiedUsers}`}/>
        <SimpleCard title='Total Verified Users' sub={`${verifiedUser}`}/>
      </Group>
      <br />
      <Divider/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Email Verified</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {
            users ? users.data.map((feedback:any,index:number) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <Stack spacing={0}>
                    <Title order={6}>{feedback.name}</Title>
                    
                  </Stack>
                </td>
                <td>
                    <Text>{feedback.email}</Text>
                </td>
                <td>
                    <Text>{feedback.username}</Text>
                </td>
                <td>
                    <Text>{feedback.emailVerified ? "Yes":"No"}</Text>
                </td>
                <td>
                    <Text>{feedback.isVerifiedUser ? "Yes":"No"}</Text>
                </td>
              </tr>
            )):
            isLoading ? <></>:<></>
          }
        </tbody>
      </Table>
    </Layout>
  )
}

export default Users