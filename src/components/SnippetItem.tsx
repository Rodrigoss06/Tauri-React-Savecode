import { useSnippetStore } from "../store/snippets_store";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FiTrash2, FiX } from "react-icons/fi";
interface Prop {
  snippetName: string;
}

function SnippetItem({ snippetName }: Prop) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const removeSnippetName = useSnippetStore((state) => state.removeSnippetName);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const handleDelete = async () => {
    const accept = await window.confirm("Are you sure you want to delete");
    if (!accept) return;

    const desktop = await desktopDir();
    const filePath = await join(desktop, "Snippets", `${snippetName}.js`);
    await removeFile(filePath);
    removeSnippetName(snippetName);
    toast.success("Snippet deleted", {
      duration: 2000,
      style: {
        background: "#202020",
        color: "#fff",
      },
      position: "bottom-right",
    });
  };
  return (
    <div
      className={
        selectedSnippet?.name == snippetName
          ? " flex  bg-slate-500 py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer"
          : "flex  py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer"
      }
      onClick={async () => {
        const desktop = await desktopDir();
        const filePath = await join(desktop, "Snippets", `${snippetName}.js`);

        const snippet = await readTextFile(filePath);
        console.log(snippetName);
        console.log(snippet);
        setSelectedSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h1 className="w-3/4">{snippetName}</h1>
      {selectedSnippet?.name == snippetName ? (
        <div className="flex gap-2 items-center">
          <FiTrash2
          className="text-neutral-700"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
          <FiX
          className="text-neutral-700"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSnippet(null);
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SnippetItem;
