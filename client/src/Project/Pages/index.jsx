import React, { useEffect } from 'react'
import { BlockNoteView, getDefaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import "@blocknote/core/dist/style.css";
import { RiImage2Fill } from 'react-icons/ri';

const uploadImageItem = (editor) => {
    const imageDiv = document.createElement('input')
    console.log(imageDiv);
    imageDiv.setAttribute('type', 'file'); 
    imageDiv.setAttribute('accept', 'image/*')
    imageDiv.click();

    imageDiv.onchange = async () => {  
      const file = imageDiv.files[0];  
      const formData = new FormData();  
  
      formData.append('image', file);  
      const currentBlock = editor.getTextCursorPosition().block;
      console.log(URL.createObjectURL(file));
      editor.insertBlocks([{
        type: 'image',
        props: { url: URL.createObjectURL(file) }
      }], currentBlock, "after");
    }; 
}

const imageEditorItem = {
  name: 'Insert Image',
  execute: uploadImageItem,
  icon: <RiImage2Fill />,
  hint: 'upload images',
}

const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems().filter(menu => menu.name !== "Image"),
  imageEditorItem,
];

function Pages() {
  const editor = useBlockNote({
    initialContent: [
      {
          "id": "60031954-e8ef-4945-a1d2-ef98ef5f327a",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [
              {
                  "type": "text",
                  "text": "vinaykumar ",
                  "styles": {}
              }
          ],
          "children": []
      },
      {
          "id": "bc437535-1742-41df-9af8-596e7d16aeba",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [],
          "children": []
      }
  ],
    slashMenuItems: customSlashMenuItemList
  });

  // Executes a callback whenever the editor contents change.
  editor.onEditorContentChange(() => {
    // Get and log all top-level, i.e. non-nested blocks in the editor.
    const blocks = editor.topLevelBlocks;
    console.log("Content was changed:", blocks);
  });
  
  return <BlockNoteView editor={editor} theme="light" />
}

export default Pages