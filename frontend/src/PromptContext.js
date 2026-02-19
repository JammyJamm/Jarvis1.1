import { createContext, useState } from "react";

export const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [promptResp, setPromptResp] = useState("");
  return (
    <PromptContext.Provider
      value={{ prompt, setPrompt, promptResp, setPromptResp }}
    >
      {children}
    </PromptContext.Provider>
  );
}
