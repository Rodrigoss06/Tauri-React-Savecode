import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import { useSnippetStore } from "../store/snippets_store";
import SnippetItem from "./SnippetItem";
function SnippetList() {
  const snippetsNames = useSnippetStore((state) => state.snippetsNames);
  const setSnippetsNames = useSnippetStore((state) => state.setSnippetsNames);

  useEffect(() => {
    async function loadFiles() {
      const desktop = await desktopDir();
      const res = await readDir(`${desktop}/Snippets`);
      const fileNames = res.map((e) => e.name!.slice(0,-3));
      setSnippetsNames(fileNames);
      
    }
    loadFiles()
  }, []);

  return (
    <div>
      {snippetsNames.map((e) => (
        <SnippetItem snippetName={e}/>
      ))}
    </div>
  );
}

export default SnippetList;
