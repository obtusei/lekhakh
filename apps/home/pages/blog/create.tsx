import React,{useState,useMemo} from 'react'
import dynamic from 'next/dynamic';
import {Box, Button, Container, Group, Input, MultiSelect,NativeSelect, RichTextEditor,Text, Stack, createStyles} from "ui";

const people = [
  { id: 1, value: 'Bill Horsefighter' },
  { id: 2, value: 'Amanda Hijacker' },
  { id: 3, value: 'Leo Summerhalter' },
  { id: 4, value: 'Jane Sinkspitter' },
];

const tags = [
  { id: 1, value: 'JavaScript' },
  { id: 2, value: 'TypeScript' },
  { id: 3, value: 'Ruby' },
  { id: 3, value: 'Python' },
];

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
];

const initialValue =
  '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';

const useStyles = createStyles((theme) => ({
          root:{
                    border:"none",
          },
          toolbarControl:{
                    border:"none",
                    backgroundColor:"rgba(0,0,0,0.05)",
                    color:"black",
                    // fontWeight:"bold"
                    
          },
          toolbarGroup:{
                    border:"none",
          },
          toolbarInner:{
                    border:"none",
                    
          },
          toolbar:{
                    border:"none",
          }
}))
function CreateBlog() {
          const [value, onChange] = useState(initialValue);
          const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm:string, renderList:any, mentionChar:string) => {
        const list = mentionChar === '@' ? people : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  )
  const {classes } = useStyles();
  return (
          <div>
                   <Stack style={{justifyContent:'space-between',padding:"20px 20px 20px 40px"}}>
                    <Group style={{justifyContent:'space-between'}}>
                    <Input placeholder='Enter the title' variant='unstyled' size='xl' style={{fontWeight:"bold"}}/>
                     <Group>
                              <Button variant='white'>Cancel</Button>
                              <Button variant='outline'>Save to draft</Button>
                              <Button>Publish</Button>
                     </Group>
                   </Group>
                   <Group spacing={40} align="center">
                    <NativeSelect
                              data={['Poem', 'Lov and adad', 'Angular', 'Svelte']}
                              placeholder="Pick one"
                              label="Category"
                    />

                    <MultiSelect
                              data={data}
                              label="Add Some Tags"
                              placeholder="Pick all that you like"
                    />
                   </Group>
                    
                   </Stack>
                    <RichTextEditor
                    value={value} 
                    onChange={onChange} mentions={mentions} 
                    classNames={{
                              toolbarControl:classes.toolbarControl,
                              toolbarGroup:classes.toolbarGroup,
                              toolbarInner:classes.toolbarInner,
                              toolbar:classes.toolbar,
                              root:classes.root
                              }}
                    placeholder="Enter your blog content"
                    />
          </div>
  );
}

export default CreateBlog