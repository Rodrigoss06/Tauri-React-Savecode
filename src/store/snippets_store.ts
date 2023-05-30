import { createStore, create } from "zustand";

interface Snippet {
    name: string
    code: string|null
}
interface SnippetState {
    snippetsNames: string[];
    selectedSnippet: Snippet|null;
    addSnippetName: (snippetName: string) => void;
    setSnippetsNames: (names: string[])=> void;
    setSelectedSnippet: (snippet: Snippet|null)=> void;
    removeSnippetName: (snippetName: string)=> void;
}
export const useSnippetStore =create<SnippetState>((set)=>({
    snippetsNames: [],
    selectedSnippet: null,
    addSnippetName: (snippetName)=> 
    set((state) =>({
        snippetsNames: [...state.snippetsNames, snippetName]
    })),
    setSnippetsNames: (names)=> set({
        snippetsNames: names
    }),
    setSelectedSnippet: (snippet)=> set({
        selectedSnippet: snippet
    }),
    removeSnippetName: (snippetName)=>set((state)=>({
        snippetsNames: state.snippetsNames.filter(n=>n !== snippetName),
        selectedSnippet: null
    })),
    

    }))
