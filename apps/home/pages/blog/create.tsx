import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Container,
  Group,
  Input,
  MultiSelect,
  NativeSelect,
  RichTextEditor,
  Text,
  Stack,
  createStyles,
} from "ui";
import {
  createBlogByUser,
  GetCategories,
  GetTags,
  SearchTag,
} from "../../api/user";
import useTranslation from "next-translate/useTranslation";
import { ITag } from "ui/lib/interfaces";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  root: {
    border: "none",
  },
  toolbarControl: {
    border: "none",
    backgroundColor: "rgba(0,0,0,0.05)",
    color: "black",
    // fontWeight:"bold"
  },
  toolbarGroup: {
    border: "none",
  },
  toolbarInner: {
    border: "none",
  },
  toolbar: {
    border: "none",
  },
}));
function CreateBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { classes } = useStyles();
  const categories = GetCategories();
  const searctags = GetTags(10);
  const { t } = useTranslation();
  const router = useRouter();
  const [data, setData] = useState(["React", "Angular", "Svelte", "Vue"]);
  return (
    <div>
      <Stack
        style={{
          justifyContent: "space-between",
          padding: "20px 20px 20px 40px",
        }}
      >
        <Group style={{ justifyContent: "space-between" }}>
          <Input
            placeholder={t("other:enterTheTitle")}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            variant="unstyled"
            size="xl"
            className="text-2xl"
            style={{ fontWeight: "bold" }}
          />
          <Group>
            <Button variant="white">{t("common:cancel")}</Button>
            <Button
              onClick={async () => {
                const data = { title, category, content, tags };
                console.log(data);
                await createBlogByUser(data);
                router.push("/account");
              }}
              disabled={
                !title ||
                !category ||
                !content ||
                !categories.categories?.length
              }
            >
              {t("other:publish")}
            </Button>
          </Group>
        </Group>
        <Group spacing={40} align="center">
          <NativeSelect
            data={
              categories.categories
                ? categories.categories.map((cat: any) => cat?.name)
                : []
            }
            placeholder={t("other:pickOne")}
            label={t("common:category")}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <MultiSelect
            data={
              searctags.tags ? searctags.tags.map((tag: ITag) => tag.name) : []
            }
            label={t("other:addSomeTags")}
            placeholder="#blog"
            onChange={(e) => setTags((arr) => [...e])}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create "${query}"`}
            onCreate={(query) => {
              // Add the new tag to the existing tags list

              const newTag = query;
              setTags((current) => [...current, newTag]);
              return newTag;
            }}
          />
        </Group>
      </Stack>

      <RichTextEditor
        value={content}
        onChange={setContent}
        classNames={{
          toolbarControl: classes.toolbarControl,
          toolbarGroup: classes.toolbarGroup,
          toolbarInner: classes.toolbarInner,
          toolbar: classes.toolbar,
          root: classes.root,
        }}
        placeholder={t("other:blogPlaceholder")}
      />
    </div>
  );
}

export default CreateBlog;
