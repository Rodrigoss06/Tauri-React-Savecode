import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippets_store";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { TfiPencil } from "react-icons/tfi";
function SnippetEditor() {
  const [text, setText] = useState<string | undefined>("");
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
 
  useEffect(() => {
    if (!selectedSnippet) return;
    const saveText = setTimeout(async () => {
      const desktop = await desktopDir();

      await writeTextFile(
        `${desktop}/Snippets/${selectedSnippet.name}.js`,
        text ?? ""
      );
      

    }, 500);
    return () => {
      clearTimeout(saveText);
    };
  }, [text]);
  return selectedSnippet ? (
    <Editor
      value={selectedSnippet.code ?? ""}
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{ fontSize: 15 }}
      onChange={(e) => setText(e)}
    />
  ) : (
    <TfiPencil className="text-9xl text-neutral-700"/>
  );
}

export default SnippetEditor;
