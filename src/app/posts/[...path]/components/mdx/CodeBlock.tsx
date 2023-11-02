"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { shadesOfPurple } from "react-syntax-highlighter/dist/esm/styles/hljs";

// const CopyButton = ({ target }: { target: string }) => {
//   const handleCopy =  async () => {
//     try{
//       if (target) {
//         await navigator.clipboard.writeText(target);
//         alert("copy")
//       }
//     }catch(e){
//       alert(`copy failed ${e}`)
//     }
//   }
//   return <button
//     style={{
//       position: "absolute",
//     }}
//     onClick={handleCopy}
//     >copy
//     </button>
// }

export default function CodeBlock({
  title,
  language,
  children,
}: {
  title: string;
  language: string;
  children: string;
}) {
  return (
    <div className="relative">
      {/* <CopyButton target={children}/> */}
      {title && <div className="code-title">{title}</div>}
      <SyntaxHighlighter
        language={language}
        style={shadesOfPurple}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
