import React from 'react'
import { Code, Table } from '@mantine/core';
type Props = {}

function ShortcutLists({}: Props) {

  const shortcuts = [
  { title:"Discover tab", keyboard: 'Ctrl/Cmd + k' },
  { title:"Discover tab", keyboard: 'Ctrl/Cmd + k' },
  { title:"Discover tab", keyboard: 'Ctrl/Cmd + k' },
  { title:"Discover tab", keyboard: 'Ctrl/Cmd + k' },
];

  const rows = shortcuts.map((shortcut) => (
    <tr key={shortcut.title}>
      <td>{shortcut.title}</td>
      <td><Code>{shortcut.keyboard}</Code></td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Shortcut key</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default ShortcutLists