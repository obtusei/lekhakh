import Link from "next/link"
import {createStyles} from "@mantine/core"
interface LinkProps{
  link:string
  title:string
  shallow?:boolean
}

const useStyles = createStyles((theme,params) => ({
          root:{
                    color:"gray",
                    cursor:"pointer",
                    "&:hover":{
                              color:"black"
                    }
          }
}))

const Href = ({link,title,shallow = false}:LinkProps) => {
          const {classes} = useStyles()
          return(
          <Link href={`${link}`} shallow={shallow}>
                    <div className={classes.root}>
                              {`${title}`}
                    </div>
          </Link>
          )
}

export default Href