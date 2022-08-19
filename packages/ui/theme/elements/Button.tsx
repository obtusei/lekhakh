import { ButtonStylesParams,MantineTheme, ButtonProps, MantineColor, LoaderProps } from "@mantine/core";

export const col = (theme:MantineTheme,dark:MantineColor,light:MantineColor) => (theme.colorScheme == 'dark' ? dark:light)

export const Button:ButtonProps = {
  
  styles:(theme:MantineTheme,params:ButtonStylesParams) => ({
        root:{
          backgroundColor:
          params.variant === "filled" ? col(theme,theme.colors.primary[7],theme.colors.primary[0]) : 
          params.variant === "light" ? (theme.colorScheme == 'dark' ? "transparent":"white"):
          params.variant === "outline" ? "transparent":
          params.variant === "white" ? "transparent":
          params.variant === "subtle" ? col(theme,theme.colors.lekhakh[5],theme.colors.secondary[5]):
          col(theme,theme.colors.lekhakh[0],theme.colors.primary[0]),

          borderRadius:"0px",
          border:params.variant === "outline" ? col(theme,"1px solid #FECC02","1px solid #E02020"):"none",
          
          color:
              params.variant === "filled" ? col(theme,"black","white") :
              params.variant === "white" ? col(theme,"white","black"):
              params.variant === "light" ? col(theme,"white","black"):
              params.variant === "outline" ? col(theme,"white","black"):
              params.variant === "subtle" ? col(theme,theme.colors.lekhakh[0],theme.colors.secondary[0]):
              "black",
          ":hover":{
            backgroundColor:
            params.variant === "filled" ? col(theme,theme.colors.lekhakh[0],theme.colors.secondary[0]):
            params.variant === "outline" ? col(theme,theme.colors.lekhakh[0],theme.colors.secondary[0]):
            params.variant === "light" ? col(theme,theme.colors.lekhakh[5],theme.colors.secondary[5]):
            params.variant === "white" ? "transparent":theme.colors.secondary[0],
            color:params.variant === "filled" ? col(theme,theme.colors.primary[0],theme.colors.primary[7]):
            params.variant === "white" ? col(theme,theme.colors.lekhakh[0],theme.colors.secondary[0]):
            params.variant === "light" ? col(theme,theme.colors.lekhakh[0],theme.colors.secondary[0]):
            "white" 
          },
        },

  })
}

export const Loader:LoaderProps = {
  color:"red"
}