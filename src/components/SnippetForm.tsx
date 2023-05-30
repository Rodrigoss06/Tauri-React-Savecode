import { desktopDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSnippetStore } from "../store/snippets_store";
function SnippetForm() {
  const addSnippetName = useSnippetStore(state=> state.addSnippetName)
  const snippetsNames = useSnippetStore(state=> state.snippetsNames)

  const [snippetName, setSnippetName] = useState("")
  return (
    <form
      onSubmit={async(e) => {
        e.preventDefault();
        // alert("form submit");
        const desktop = await desktopDir()
        await writeTextFile(`${desktop}/Snippets/${snippetName}.js`, "")
        addSnippetName(snippetName)
        console.log(snippetsNames)
        setSnippetName("")
        toast.success("Snippet created successfully", {
          duration: 2000,
          style: {
            background: "#202020",
            color: "#fff"
          },
          position: "bottom-right",
        })
      }}
    >
      <input type="text" placeholder="Write a Snippet" className=" bg-zinc-900 w-full border-none outline-none p-4"
      onChange={(e)=> setSnippetName(e.target.value)} 
      value={snippetName}/>
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
