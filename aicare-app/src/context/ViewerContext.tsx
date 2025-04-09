import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

type ViewerContextType = {
  isViewer: boolean;
  setIsViewer: (v: boolean) => void;
};

const ViewerContext = createContext<ViewerContextType>({
  isViewer: false,
  setIsViewer: () => {}
});

export const ViewerProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [isViewer, setIsViewer] = useState(false);

  useEffect(() => {
    setIsViewer(false); // Default to non-viewer; updated per page logic if needed
  }, [session]);

  return (
    <ViewerContext.Provider value={{ isViewer, setIsViewer }}>{children}</ViewerContext.Provider>
  );
};

export const useViewerContext = () => useContext(ViewerContext);
