import React from 'react'
import { Divider, Title,Text } from 'ui'
import ShortcutLists from 'ui/components/ShortcutLists'
import Layout from '../../components/Layout'

type Props = {}

function Shortcuts() {
  return (
    <Layout>
      <Title>Shortcuts</Title>
      <Divider/>
      <br />
      <Text>
        Lekhakh lets you perform most tasks directly from the keyboard. This page lists out the keyboard shortcuts. You can use the shortcuts in the following ways:
      </Text>
      <br />
      <ShortcutLists/>
    </Layout>
  )
}

export default Shortcuts