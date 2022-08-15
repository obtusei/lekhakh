import { createStyles,Text } from "@mantine/core"
import Link from "next/link"
const useStyles = createStyles((theme) => ({
    chip:{
      border:"1px solid gray",
      padding:"5px 10px 5px 10px",
      color:"gray",
      cursor:"pointer",
      ":hover":{
        color:theme.colorScheme === "dark" ? "white":"black",
        border:theme.colorScheme === 'dark' ? "1px solid white":"1px solid black"
      }
    }
}))

const CustomChip = ({key,href,title}:{key:number,href:string,title:string}) => {
  const {classes} = useStyles()
  return(
    <Link href={href} passHref key={key}>
    <Text
      className={classes.chip}
    >
      {title}
    </Text>
    </Link>
  )
}

export default CustomChip;