import { Modal, Text } from '@mantine/core'
import React, { useState } from 'react'

type Props = {
  opened:boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}




function LoginModal({opened,onClose}: Props) {
  return (
    <Modal
      opened={opened}
      onClose={() => onClose(true)}
    >
      <Text>Hello</Text>
    </Modal>
  )
}

export default LoginModal