import React,{useState,useMemo} from 'react'
import dynamic from 'next/dynamic';
import {Box, Button, Container, Group, Input, MultiSelect,NativeSelect, RichTextEditor,Text, Stack, createStyles} from "ui";
import { createBlogByUser, GetCategories, GetTags, SearchTag } from '../../api/user';
import useTranslation from 'next-translate/useTranslation';
import { ITag } from 'ui/lib/interfaces';
import { useRouter } from 'next/router';


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
  const [content, setContent] = useState("");
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [tags,setTags] = useState<string[]>([])
  const [tag,setTag] = useState("")
  const {classes } = useStyles();
  const categories = GetCategories()
  const searctags = GetTags(10)
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <div>
      <Stack style={{justifyContent:'space-between',padding:"20px 20px 20px 40px"}}>
        <Group style={{justifyContent:'space-between'}}>
        <Input placeholder='Enter the title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        variant='unstyled' size='xl' style={{fontWeight:"bold"}}/>
          <Group>
            <Button variant='white'>Cancel</Button>
            <Button onClick={
              async () => {
                const data = {title,category,content,tags}
                await createBlogByUser(data)
                router.push("/")
              }
            }>Publish</Button>
          </Group>
        </Group>
        <Group spacing={40} align="center">
        <NativeSelect
          data={categories.categories ? categories.categories.map((cat:any) => cat?.name):[]}
          placeholder="Pick one"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Text>TAgs: {title}</Text>
        <MultiSelect
          data={searctags.tags ? searctags.tags.map((tag:ITag) => tag.name):[]}
          label="Add Some Tags"
          placeholder="Pick all that you like"
          value={tags}
          onChange={(e) => setTags((arr) => [...e])}
          searchable
        />
        </Group>
        
        </Stack>
        <RichTextEditor
        value={content} 
        onChange={setContent}
        classNames={{
          toolbarControl:classes.toolbarControl,
          toolbarGroup:classes.toolbarGroup,
          toolbarInner:classes.toolbarInner,
          toolbar:classes.toolbar,
          root:classes.root
        }}
        placeholder={t("Enter your blog content")}
        />
  </div>
  );
}

export default CreateBlog