import React from 'react'
import { Center, Text } from 'ui'
import useTranslation from 'next-translate/useTranslation'
type Props = {
  label?:string
}

const EmptyContent = (props: Props) => {
  const {t} = useTranslation("common")
  return (
    <Center
      style={
        {
          width:"100%"
        }
      }
    >
      <Text color={"dimmed"}>
        {
          props.label ? props.label:t("nothingToShow")
        }
      </Text>
    </Center>
  )
}

export default EmptyContent