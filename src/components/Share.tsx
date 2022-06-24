import { useEffect, useState } from "react"

interface ShareProps {
  isOpenHanlder: (open: boolean) => void;
  inputHandler: (text: string) => void;
}

export const Share = ({isOpenHanlder}: ShareProps) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  useEffect(() => {
    isOpenHanlder(showModal)
}, [showModal])
  return (<>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>)
}