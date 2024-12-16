import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ISidebar {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ sidebar, setSidebar }: ISidebar) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("no-scroll");
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("no-scroll");
    };
  }, [sidebar, setSidebar]);

  return (
    <>
      {sidebar && (
        <div onClick={() => setSidebar(false)} className="fixed inset-0 bg-black/75 z-40" />
      )}

      <aside ref={sidebarRef} className={`${sidebar ? "w-3/4 p-5" : "w-0"} absolute top-0 right-0 h-screen z-50 shadow bg-white duration-500`}>
        {sidebar && (
          <div>
            sidebar
            <X onClick={() => setSidebar(false)} />
          </div>
        )}
      </aside>
    </>
  );
}
