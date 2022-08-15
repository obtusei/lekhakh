import { MantineThemeOverride} from "@mantine/core";
import { Button } from "./elements/Button";

const theme:MantineThemeOverride = {
  colors:{
    primary:["#000000","#656565","#808080","#999999","#CCCCCC","#E5E5E5","#ECECEC","#FFFFFF"],//0-7|black to white
    secondary:["#E02020","#E74D4D","#EC7979","#F2A6A6","#F9D2D2","#FCE9E9"], // 0-5
    lekhakh:["#FECC02","#F1C101","#E4B701","#CBA301","#B18E01","#977901"], // 0-5
  },
  components:{
      Button
  }       
}

export default theme;
