import React from 'react'
import { Code, Table } from '@mantine/core';
import SHORTCUTS from "../lib/shortcuts.json"

function ShortcutLists() {

  const rows = SHORTCUTS.map((shortcut:{title:string,keyboard:string}) => (
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